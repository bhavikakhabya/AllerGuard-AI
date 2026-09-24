from fastapi import FastAPI, UploadFile, File
from PIL import Image

import io
import os
import torch
import torch.nn as nn

from torchvision import models, transforms


# ============================================
# APP
# ============================================

app = FastAPI(
    title="AllerGuard AI ML Service",
    description="AI food recognition service",
    version="1.0.0"
)


# ============================================
# PATHS
# ============================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "food_model.pth"
)


# ============================================
# DEVICE
# ============================================

if torch.backends.mps.is_available():
    device = torch.device("mps")
else:
    device = torch.device("cpu")


# ============================================
# LOAD MODEL
# ============================================

checkpoint = torch.load(
    MODEL_PATH,
    map_location=device,
    weights_only=False
)

classes = checkpoint["classes"]


model = models.resnet18(
    weights=None
)


number_of_features = model.fc.in_features


model.fc = nn.Linear(
    number_of_features,
    len(classes)
)


model.load_state_dict(
    checkpoint["model_state_dict"]
)


model = model.to(device)

model.eval()


# ============================================
# IMAGE TRANSFORM
# ============================================

transform = transforms.Compose([
    transforms.Resize((224, 224)),

    transforms.ToTensor(),

    transforms.Normalize(
        [0.485, 0.456, 0.406],
        [0.229, 0.224, 0.225]
    )
])


# ============================================
# ROOT
# ============================================

@app.get("/")
def root():

    return {
        "success": True,
        "message": "AllerGuard AI ML Service is running 🧠",
        "model": "ResNet18",
        "classes": classes
    }


# ============================================
# HEALTH
# ============================================

@app.get("/health")
def health():

    return {
        "status": "OK",
        "service": "ML Service",
        "model_loaded": True
    }


# ============================================
# PREDICT FOOD
# ============================================

@app.post("/predict")
async def predict_food(
    file: UploadFile = File(...)
):

    # Read uploaded image
    image_data = await file.read()


    # Open image
    try:

        image = Image.open(
            io.BytesIO(image_data)
        ).convert("RGB")

    except Exception:

        return {
            "success": False,
            "message": "Uploaded file is not a valid image"
        }


    # Preprocess
    image_tensor = transform(
        image
    )


    image_tensor = image_tensor.unsqueeze(0)

    image_tensor = image_tensor.to(device)


    # Prediction
    with torch.no_grad():

        output = model(
            image_tensor
        )


        probabilities = torch.softmax(
            output,
            dim=1
        )


        confidence, predicted_index = torch.max(
            probabilities,
            1
        )


    # Get result
    predicted_food = classes[
        predicted_index.item()
    ]


    confidence_percentage = (
        confidence.item() * 100
    )


    return {

        "success": True,

        "food": predicted_food,

        "confidence": round(
            confidence_percentage,
            2
        ),

        "filename": file.filename,

        "model": "ResNet18"

    }