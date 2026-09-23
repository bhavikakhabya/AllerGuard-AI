import os
import sys
import torch
import torch.nn as nn

from PIL import Image
from torchvision import models, transforms


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "food_model.pth"
)

if torch.backends.mps.is_available():
    device = torch.device("mps")
else:
    device = torch.device("cpu")

print("Using device:", device)


checkpoint = torch.load(
    MODEL_PATH,
    map_location=device,
    weights_only=False
)

classes = checkpoint["classes"]

print("Classes:", classes)


model = models.resnet18(weights=None)

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

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        [0.485, 0.456, 0.406],
        [0.229, 0.224, 0.225]
    )
])

def predict_food(image_path):

    image = Image.open(image_path).convert("RGB")

    image_tensor = transform(image)

    image_tensor = image_tensor.unsqueeze(0)

    image_tensor = image_tensor.to(device)


    with torch.no_grad():

        output = model(image_tensor)

        probabilities = torch.softmax(
            output,
            dim=1
        )

        confidence, predicted_index = torch.max(
            probabilities,
            1
        )


    predicted_food = classes[
        predicted_index.item()
    ]

    confidence_percentage = (
        confidence.item() * 100
    )


    return predicted_food, confidence_percentage

if __name__ == "__main__":

    if len(sys.argv) < 2:

        print(
            "\n❌ Please provide an image path."
        )

        print(
            "Example:"
        )

        print(
            "python inference/predict.py "
            "datasets/food_images/validation/"
            "biryani/biryani4.jpg"
        )

        sys.exit(1)


    image_path = sys.argv[1]


    if not os.path.exists(image_path):

        print(
            f"\n❌ Image not found: {image_path}"
        )

        sys.exit(1)


    food, confidence = predict_food(
        image_path
    )


    print("\n==============================")

    print("🤖 ALLERGUARD AI PREDICTION")

    print("==============================")

    print(
        f"Food: {food}"
    )

    print(
        f"Confidence: {confidence:.2f}%"
    )

    print("==============================\n")