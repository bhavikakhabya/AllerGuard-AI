import os
import copy
import torch
import torch.nn as nn
import torch.optim as optim

from torchvision import datasets, models, transforms
from torch.utils.data import DataLoader


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TRAIN_DIR = os.path.join(
    BASE_DIR,
    "datasets",
    "food_images",
    "train"
)

VALIDATION_DIR = os.path.join(
    BASE_DIR,
    "datasets",
    "food_images",
    "validation"
)

MODEL_DIR = os.path.join(BASE_DIR, "models")

os.makedirs(MODEL_DIR, exist_ok=True)

 
if torch.backends.mps.is_available():
    device = torch.device("mps")
else:
    device = torch.device("cpu")

print("Using device:", device)


train_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ToTensor(),
    transforms.Normalize(
        [0.485, 0.456, 0.406],
        [0.229, 0.224, 0.225]
    )
])


validation_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        [0.485, 0.456, 0.406],
        [0.229, 0.224, 0.225]
    )
])


train_dataset = datasets.ImageFolder(
    TRAIN_DIR,
    transform=train_transform
)

validation_dataset = datasets.ImageFolder(
    VALIDATION_DIR,
    transform=validation_transform
)

train_loader = DataLoader(
    train_dataset,
    batch_size=4,
    shuffle=True,
    num_workers=0
)

validation_loader = DataLoader(
    validation_dataset,
    batch_size=4,
    shuffle=False,
    num_workers=0
)


print("\nClasses:")
print(train_dataset.classes)

print("\nTraining images:", len(train_dataset))
print("Validation images:", len(validation_dataset))


print("\nLoading pretrained ResNet18...")

model = models.resnet18(
    weights=models.ResNet18_Weights.DEFAULT
)


for parameter in model.parameters():
    parameter.requires_grad = False


number_of_features = model.fc.in_features

number_of_classes = len(train_dataset.classes)

model.fc = nn.Linear(
    number_of_features,
    number_of_classes
)

model = model.to(device)
 

criterion = nn.CrossEntropyLoss()

optimizer = optim.Adam(
    model.fc.parameters(),
    lr=0.001
)


EPOCHS = 10

best_accuracy = 0.0

best_model_weights = copy.deepcopy(model.state_dict())


print("\nStarting training...\n")


for epoch in range(EPOCHS):

    print(
        f"Epoch {epoch + 1}/{EPOCHS}"
    )

    print("-" * 30)


    model.train()

    correct = 0
    total = 0
    training_loss = 0.0


    for images, labels in train_loader:

        images = images.to(device)
        labels = labels.to(device)


        optimizer.zero_grad()


        outputs = model(images)

        loss = criterion(
            outputs,
            labels
        )


        loss.backward()

        optimizer.step()


        training_loss += (
            loss.item() * images.size(0)
        )


        _, predictions = torch.max(
            outputs,
            1
        )


        total += labels.size(0)

        correct += (
            predictions == labels
        ).sum().item()


    train_accuracy = (
        correct / total
    )


    train_loss = (
        training_loss / total
    )

    model.eval()

    validation_correct = 0
    validation_total = 0
    validation_loss = 0.0


    with torch.no_grad():

        for images, labels in validation_loader:

            images = images.to(device)
            labels = labels.to(device)


            outputs = model(images)

            loss = criterion(
                outputs,
                labels
            )


            validation_loss += (
                loss.item() * images.size(0)
            )


            _, predictions = torch.max(
                outputs,
                1
            )


            validation_total += (
                labels.size(0)
            )

            validation_correct += (
                predictions == labels
            ).sum().item()


    validation_accuracy = (
        validation_correct /
        validation_total
    )


    validation_loss = (
        validation_loss /
        validation_total
    )


    print(
        f"Train Loss: {train_loss:.4f}"
    )

    print(
        f"Train Accuracy: "
        f"{train_accuracy * 100:.2f}%"
    )

    print(
        f"Validation Loss: "
        f"{validation_loss:.4f}"
    )

    print(
        f"Validation Accuracy: "
        f"{validation_accuracy * 100:.2f}%"
    )

    if validation_accuracy > best_accuracy:

        best_accuracy = validation_accuracy

        best_model_weights = copy.deepcopy(
            model.state_dict()
        )

        print("⭐ New best model!")


    print()


model.load_state_dict(
    best_model_weights
)


model_path = os.path.join(
    MODEL_DIR,
    "food_model.pth"
)


torch.save(
    {
        "model_state_dict": model.state_dict(),
        "classes": train_dataset.classes
    },
    model_path
)


print("=" * 50)

print("TRAINING COMPLETE! 🎉")

print(
    f"Best Validation Accuracy: "
    f"{best_accuracy * 100:.2f}%"
)

print(
    "Model saved at:"
)

print(model_path)

print("=" * 50)