import cv2
import easyocr
import re

def preprocess_image(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    filtered = cv2.bilateralFilter(gray, 9, 75, 75)
    _, binarized = cv2.threshold(filtered, 150, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    scale = 1.5
    w = int(binarized.shape[1] * scale)
    h = int(binarized.shape[0] * scale)
    resized_img = cv2.resize(binarized, (w, h), interpolation=cv2.INTER_LINEAR)

    return resized_img

def clean_product_name(product):
    product = re.sub(r'^\W*\b\w?\b\s*', '', product)
    return product.strip()

def extract_text(img):
    reader = easyocr.Reader(['en', 'es'])

    preprocessed_img = preprocess_image(img)

    result = reader.readtext(preprocessed_img, detail=0)

    filtered_text = [line for line in result if not any(word in line.lower() for word in ['ticket', 'compra', 'abarrotes'])]
    text = ' '.join(filtered_text)

    pattern = r'([A-Za-záéíóúñÑ\s]+)\s(\d+)'
    matches = re.findall(pattern, text)

    products = [{"element": clean_product_name(product), "quantity": int(quantity)} for product, quantity in matches]

    return products