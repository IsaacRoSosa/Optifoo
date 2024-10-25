import cv2
import easyocr
import re

def preprocesar_imagen(img):
    """Aplica preprocesamiento para mejorar la lectura del OCR."""
    gris = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    filtrada = cv2.bilateralFilter(gris, 9, 75, 75)
    _, binarizada = cv2.threshold(filtrada, 150, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    escala = 1.5
    ancho = int(binarizada.shape[1] * escala)
    alto = int(binarizada.shape[0] * escala)
    img_redimensionada = cv2.resize(binarizada, (ancho, alto), interpolation=cv2.INTER_LINEAR)

    return img_redimensionada

def limpiar_producto(producto):
    """Limpia caracteres inesperados al inicio del nombre del producto."""
    producto = re.sub(r'^\W*\b\w?\b\s*', '', producto)
    return producto.strip()

def extraer_texto(img):
    """Extrae el nombre del artículo y su cantidad, y retorna un JSON con los resultados."""
    reader = easyocr.Reader(['en', 'es'])

    img_preprocesada = preprocesar_imagen(img)

    resultado = reader.readtext(img_preprocesada, detail=0)

    texto_filtrado = [linea for linea in resultado if not any(palabra in linea.lower() for palabra in ['ticket', 'compra', 'abarrotes'])]
    texto = ' '.join(texto_filtrado)

    patron = r'([A-Za-záéíóúñÑ\s]+)\s(\d+)'
    coincidencias = re.findall(patron, texto)

    productos = [{"elemento": limpiar_producto(producto), "cantidad": int(cantidad)} for producto, cantidad in coincidencias]

    return productos
