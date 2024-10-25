from ultralytics import YOLO
from collections import Counter

def detectar_objetos(img, modelo='yolov5su.pt'):
    """Detectar objetos en una imagen ya procesada como numpy.ndarray."""
    model = YOLO(modelo)

    results = model.predict(source=img, save=False, conf=0.3)

    if results[0].boxes:
        objetos_detectados = []
        for box in results[0].boxes:
            class_id = int(box.cls[0])
            nombre_objeto = model.names[class_id]
            objetos_detectados.append(nombre_objeto)

        conteo_objetos = Counter(objetos_detectados)
        resultado = [{"elemento": objeto, "cantidad": cantidad} 
                     for objeto, cantidad in conteo_objetos.items()]
        return resultado
    else:
        return [{"error": "No se detectaron objetos"}]