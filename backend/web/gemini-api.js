export async function* streamResponseChunks(response) {
    let buffer = '';

    const CHUNK_SEPARATOR = '\n\n';

    let processBuffer = async function* (streamDone = false) {
        while (true) {
            let flush = false;
            let chunkSeparatorIndex = buffer.indexOf(CHUNK_SEPARATOR);
            if (streamDone && chunkSeparatorIndex < 0) {
                flush = true;
                chunkSeparatorIndex = buffer.length;
            }
            if (chunkSeparatorIndex < 0) {
                break;
            }

            let chunk = buffer.substring(0, chunkSeparatorIndex);
            buffer = buffer.substring(chunkSeparatorIndex + CHUNK_SEPARATOR.length);
            chunk = chunk.replace(/^data:\s*/, '').trim();
            if (!chunk) {
                if (flush) break;
                continue;
            }

            let parsedChunk = JSON.parse(chunk);
            let { error, text } = parsedChunk;

            if (error) {
                console.error(error);
                throw new Error(error?.message || JSON.stringify(error));
            }

            yield text;

            if (flush) break;
        }
    };

    const reader = response.body.getReader();
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += new TextDecoder().decode(value);
            yield* processBuffer();
        }
    } finally {
        reader.releaseLock();
    }

    yield* processBuffer(true);
}
