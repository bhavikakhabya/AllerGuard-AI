<p align="center">
  <img src="https://img.shields.io/badge/AllerGuard-AI-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTEyIDJhMTAgMTAgMCAxIDAgMTAgMTBBMTAgMTAgMCAwIDAgMTIgMloiLz48cGF0aCBkPSJNMTIgOHY0Ii8+PHBhdGggZD0iTTEyIDE2aC4wMSIvPjwvc3ZnPg==&logoColor=white" alt="AllerGuard AI" height="40"/>
</p>

<h1 align="center">🛡️ AllerGuard AI</h1>

<p align="center">
  <strong>AI-Powered Food Allergen Detection System</strong>
</p>

<p align="center">
  <em>Scan food items or ingredient labels to instantly detect allergen risks personalized to your allergy profile.</em>
</p>

<p align="center">
  <a href="https://aller-guard-ai.vercel.app">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-aller--guard--ai.vercel.app-6366f1?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-Express_5-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Python-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/PyTorch-ResNet18-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" alt="PyTorch"/>
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Tesseract-OCR-2496ED?style=flat-square&logo=google&logoColor=white" alt="Tesseract"/>
  <img src="https://img.shields.io/badge/Deployed-Vercel_+_Render-000000?style=flat-square&logo=vercel&logoColor=white" alt="Deployment"/>
</p>

---

## 📋 Table of Contents

- [About](#-about)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [ML Model Details](#-ml-model-details)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🧠 About

**AllerGuard AI** is a full-stack intelligent food allergen detection platform that helps individuals with food allergies make safer dining choices. It combines **deep learning-based food recognition**, **OCR-powered label scanning**, and a **personalized allergen risk engine** to provide real-time allergen risk assessments.

Users can:
- 📸 **Photograph a prepared food item** — the AI identifies the food and cross-references its ingredients against the user's allergy profile.
- 🏷️ **Scan a packaged food label** — OCR extracts ingredients and the risk engine flags any allergens.
- 🃏 **Generate a shareable Allergy Card** — with QR code, for restaurants and caregivers.

> ⚠️ **Disclaimer:** AllerGuard AI is an assistive tool. Results may be uncertain and do not guarantee that a food is allergen-free. Always verify with the food provider.

---

## 🧪 Testing & Development Phase

> [!IMPORTANT]
> This project is currently in the **active development phase**. The AI food recognition model is trained on a limited dataset of **5 Indian food categories**.

### Supported Food Classes

| # | Food Class | Sample Images Path |
|---|-----------|-------------------|
| 1 | 🍚 **Biryani** | `ml-service/datasets/food_images/validation/biryani/` |
| 2 | 🫓 **Dosa** | `ml-service/datasets/food_images/validation/dosa/` |
| 3 | 🍛 **Paneer Butter Masala** | `ml-service/datasets/food_images/validation/paneer_butter_masala/` |
| 4 | 🥟 **Samosa** | `ml-service/datasets/food_images/validation/samosa/` |
| 5 | 🍔 **Vada Pav** | `ml-service/datasets/food_images/validation/vada_pav/` |

### How to Test

For testing the **Scan Food** feature, use the sample images provided in the `ml-service/datasets/food_images/` directory:

```bash
# Example: Test with a biryani image
ml-service/datasets/food_images/validation/biryani/biryani4.jpg

# Example: Test with a samosa image
ml-service/datasets/food_images/validation/samosa/samosa3.jpg
```

You can also run a quick CLI prediction test:

```bash
cd ml-service
python inference/predict.py datasets/food_images/validation/biryani/biryani4.jpg
```

> [!NOTE]
> More food categories will be added as the model is expanded. For the **Label Scanner (OCR)** feature, you can use any real packaged food label photo — no sample images are needed.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **User Authentication** | Secure JWT-based registration & login with bcrypt password hashing |
| 👤 **Allergy Profile Management** | Add, edit, and delete allergens with severity levels (Mild / Moderate / Severe) |
| 📸 **AI Food Recognition** | Upload a photo of prepared food — ResNet18 CNN identifies the food item with confidence scoring |
| 🏷️ **OCR Label Scanner** | Upload a packaged food label — Tesseract.js extracts text and detects allergen keywords |
| ⚠️ **Personalized Risk Engine** | Cross-references detected allergens with user profile; calculates risk level (NO_RISK → VERIFY → POSSIBLE_RISK → HIGH_RISK) |
| 📊 **Scan History & Analytics** | Complete log of all food and label scans with risk levels, timestamps, and detailed match breakdowns |
| 🃏 **Allergy Card with QR Code** | Generates a shareable digital allergy card with a QR code encoding allergy details — printable for restaurants |
| 🎨 **Modern Responsive UI** | Clean lavender/purple themed interface with floating food animations, glassmorphism effects, and mobile-first design |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│                    React 19 + Vite + React Router                │
│                     Deployed on Vercel                           │
└──────────────────────┬───────────────────────────────────────────┘
                       │ HTTPS (REST API)
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                     BACKEND (Node.js Server)                     │
│                Express 5 + JWT Auth + Multer                     │
│                  Deployed on Render                              │
│                                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────┐ │
│  │ Auth Module  │  │ Scan Module  │  │   OCR Module            │ │
│  │ (Register,   │  │ (Food Scan,  │  │ (Tesseract.js,          │ │
│  │  Login, JWT) │  │  Risk Engine)│  │  Allergen Detection,    │ │
│  └─────────────┘  └──────┬───────┘  │  OCR Risk Engine)       │ │
│                          │          └─────────────────────────┘ │
│  ┌─────────────┐         │          ┌────────────────────────┐  │
│  │Profile Module│         │          │  History Module        │  │
│  │(Allergies    │         │          │  (Scan Logs, OCR Logs) │  │
│  │ CRUD)        │         │          └────────────────────────┘  │
│  └─────────────┘         │                                      │
└──────────────────────────┼──────────────────────────────────────┘
                           │ HTTP (Multipart Image Upload)
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                  ML SERVICE (Python FastAPI)                      │
│              PyTorch ResNet18 Food Classifier                    │
│                  Deployed on Render                              │
│                                                                  │
│  ┌────────────────┐  ┌───────────────┐  ┌─────────────────────┐ │
│  │ Image Preproc  │  │ Model Infer   │  │  Class Prediction   │ │
│  │ (Resize, Norm) │  │ (ResNet18)    │  │  + Confidence Score │ │
│  └────────────────┘  └───────────────┘  └─────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                      DATABASE (MongoDB Atlas)                    │
│                                                                  │
│  Collections: Users, Foods, ScanHistories, OCRScanHistories      │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library with functional components & hooks |
| **Vite 8** | Next-gen build tool for blazing fast HMR |
| **React Router v7** | Client-side routing & protected routes |
| **Axios** | HTTP client for API communication |
| **Recharts** | Data visualization for analytics |
| **Lucide React** | Modern icon library |
| **QRCode.react** | QR code generation for allergy cards |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js + Express 5** | RESTful API server |
| **MongoDB + Mongoose 9** | NoSQL database with ODM |
| **JWT (jsonwebtoken)** | Stateless authentication |
| **bcryptjs** | Password hashing |
| **Multer** | Multipart file upload handling |
| **Tesseract.js 7** | OCR engine for text extraction from images |
| **Axios** | Internal HTTP calls to ML service |

### ML Service
| Technology | Purpose |
|-----------|---------|
| **Python + FastAPI** | High-performance ML API server |
| **PyTorch 2.8** | Deep learning framework |
| **TorchVision** | Pre-trained models & image transforms |
| **ResNet18** | CNN architecture (transfer learning) |
| **Pillow** | Image processing |
| **Uvicorn** | ASGI server |

### Infrastructure
| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend hosting & CDN |
| **Render** | Backend API & ML service hosting |
| **MongoDB Atlas** | Cloud-managed database |

---

## 📁 Project Structure

```
AllerGuard_AI/
│
├── frontend/                          # React Frontend (Vite)
│   ├── public/                        # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── FoodDecor.jsx          # Animated floating food icons
│   │   │   └── ProtectedRoute.jsx     # Auth guard for protected pages
│   │   ├── pages/
│   │   │   ├── Login.jsx              # User login page
│   │   │   ├── Register.jsx           # User registration page
│   │   │   ├── Dashboard.jsx          # Main dashboard with scan options
│   │   │   ├── ScanFood.jsx           # AI food recognition scanner
│   │   │   ├── LabelScanner.jsx       # OCR-based label scanner
│   │   │   ├── AllergyProfile.jsx     # Allergy profile management
│   │   │   ├── AllergyCard.jsx        # Shareable allergy card + QR code
│   │   │   └── History.jsx            # Scan history & analytics
│   │   ├── services/
│   │   │   └── api.js                 # Axios API client configuration
│   │   ├── App.jsx                    # Root component with routing
│   │   ├── App.css                    # Global styles & animations
│   │   ├── index.css                  # Base CSS reset
│   │   └── main.jsx                   # React DOM entry point
│   ├── index.html                     # HTML template
│   ├── vite.config.js                 # Vite configuration
│   ├── package.json                   # Frontend dependencies
│   └── .env                           # Frontend env (VITE_API_URL)
│
├── backend/                           # Node.js Backend (Express)
│   ├── config/
│   │   └── db.js                      # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js          # Register & login logic
│   │   ├── profileController.js       # Allergy profile CRUD
│   │   ├── foodController.js          # Food data management
│   │   ├── scanController.js          # AI food scan orchestration
│   │   ├── analysisController.js      # Risk analysis logic
│   │   ├── ocrController.js           # OCR scan orchestration
│   │   ├── historyController.js       # Food scan history
│   │   └── ocrHistoryController.js    # OCR scan history
│   ├── middleware/
│   │   ├── authMiddleware.js          # JWT verification middleware
│   │   └── uploadMiddleware.js        # Multer file upload config
│   ├── models/
│   │   ├── User.js                    # User schema (name, email, allergies)
│   │   ├── Food.js                    # Food schema (ingredients, allergens)
│   │   ├── ScanHistory.js             # AI scan results history
│   │   ├── OCRScanHistory.js          # OCR scan results history
│   │   ├── Allergy.js                 # Allergy data model
│   │   ├── Analysis.js                # Analysis data model
│   │   └── Ingredient.js              # Ingredient data model
│   ├── routes/
│   │   ├── authRoutes.js              # POST /api/auth/register, /login
│   │   ├── profileRoutes.js           # GET/PUT /api/profile
│   │   ├── foodRoutes.js              # GET/POST /api/foods
│   │   ├── scanRoutes.js              # POST /api/scan
│   │   ├── analysisRoutes.js          # POST /api/analysis
│   │   ├── ocrRoutes.js               # POST /api/ocr/scan
│   │   ├── historyRoutes.js           # GET /api/history
│   │   └── ocrHistoryRoutes.js        # GET /api/ocr/history
│   ├── services/
│   │   ├── aiService.js               # ML service API client
│   │   ├── ocrService.js              # Tesseract.js OCR wrapper
│   │   ├── riskEngine.js              # Food-based risk calculator
│   │   ├── ocrRiskEngine.js           # OCR-based risk calculator
│   │   └── ingredientService.js       # Ingredient data service
│   ├── server.js                      # Express app entry point
│   ├── package.json                   # Backend dependencies
│   ├── eng.traineddata               # Tesseract English language data
│   └── .env                           # Backend env variables
│
├── ml-service/                        # Python ML Service (FastAPI)
│   ├── datasets/
│   │   └── food_images/               # Training & validation datasets
│   │       ├── train/                  # Training images (by class folder)
│   │       └── validation/             # Validation images (by class folder)
│   ├── models/
│   │   └── food_model.pth             # Trained PyTorch model (~45MB)
│   ├── training/
│   │   └── train_model.py             # Model training script (ResNet18)
│   ├── inference/
│   │   └── predict.py                 # CLI prediction script
│   ├── preprocessing/                 # Data preprocessing utilities
│   ├── app.py                         # FastAPI server entry point
│   ├── requirements.txt               # Python dependencies
│   └── .gitignore                     # ML service gitignore
│
└── README.md                          # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **Python** ≥ 3.10
- **MongoDB** (local or Atlas connection string)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/bhavikakhabya/AllerGuard-AI.git
cd AllerGuard-AI
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ML_SERVICE_URL=http://localhost:8000
```

Start the backend server:

```bash
npm start
# Server runs on http://localhost:5001
```

### 3. Setup ML Service

```bash
cd ml-service
python -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows

pip install -r requirements.txt
```

Start the ML service:

```bash
uvicorn app:app --host 0.0.0.0 --port 8000
# ML Service runs on http://localhost:8000
```

### 4. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5001
```

Start the development server:

```bash
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/AllerGuardAI` |
| `JWT_SECRET` | Secret key for JWT token signing | `your_super_secret_key` |
| `ML_SERVICE_URL` | URL of the Python ML service | `http://localhost:8000` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5001` |

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login & receive JWT token | ❌ |

### Allergy Profile

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/profile` | Get user's allergy profile | ✅ |
| `PUT` | `/api/profile/allergies` | Update allergy list | ✅ |

### Food Scanning

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/scan` | Upload food image → AI recognition + risk analysis | ✅ |
| `POST` | `/api/analysis` | Run allergen risk analysis on a food item | ✅ |
| `GET` | `/api/foods` | Get all food items in database | ✅ |

### OCR Label Scanning

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/ocr/scan` | Upload label image → OCR text extraction + allergen detection | ✅ |
| `GET` | `/api/ocr/history` | Get OCR scan history | ✅ |

### History

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/history` | Get food scan history | ✅ |

### ML Service (Internal)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Service info & loaded classes |
| `GET` | `/health` | Health check |
| `POST` | `/predict` | Predict food from uploaded image |

---

## 🤖 ML Model Details

### Architecture
- **Base Model:** ResNet18 (pre-trained on ImageNet)
- **Training Strategy:** Transfer Learning — frozen convolutional layers, retrained fully connected layer
- **Input Size:** 224 × 224 RGB images
- **Normalization:** ImageNet mean `[0.485, 0.456, 0.406]`, std `[0.229, 0.224, 0.225]`

### Training Pipeline
```
Raw Food Images → Data Augmentation → ResNet18 (Transfer Learning) → Best Model Checkpoint
                  (Resize, Flip,       (Frozen conv layers,          (Saved as .pth with
                   Rotation)            Trainable FC layer)           class names)
```

### Data Augmentation
- Random Horizontal Flip
- Random Rotation (±10°)
- Resize to 224×224
- ImageNet Normalization

### Risk Scoring Engine

The risk engine computes a personalized risk score by cross-referencing detected allergens with the user's allergy profile:

```
Risk Score = Severity Score + Certainty Bonus

Severity:    mild=1, moderate=2, severe=3
Certainty:   possible=+0, likely=+1, confirmed=+2

Risk Level:
  Score ≥ 4  →  🔴 HIGH_RISK
  Score ≥ 2  →  🟡 POSSIBLE_RISK
  Score ≥ 1  →  🟠 VERIFY
  Score = 0  →  🟢 NO_KNOWN_MATCH
```

---

## 🌐 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| **Frontend** | Vercel | [aller-guard-ai.vercel.app](https://aller-guard-ai.vercel.app) |
| **Backend API** | Render | `allerguard-ai-1.onrender.com` |
| **ML Service** | Render | `allerguard-ai.onrender.com` |
| **Database** | MongoDB Atlas | Cloud-managed cluster |

### Deploy Frontend to Vercel

```bash
cd frontend
npm run build
# Deploy the dist/ folder to Vercel
```

### Deploy Backend to Render

- Set environment variables in Render dashboard
- Build command: `npm install`
- Start command: `npm start`

### Deploy ML Service to Render

- Set build command: `pip install -r requirements.txt`
- Start command: `uvicorn app:app --host 0.0.0.0 --port $PORT`

---

## 📸 Screenshots

| Page | Description |
|------|-------------|
| **Login / Register** | Clean auth pages with floating food animation and purple-themed design |
| **Dashboard** | Central hub showing allergy profile summary, scan options, and recent activity |
| **Scan Food** | Upload a food photo for AI-powered recognition and allergen risk analysis |
| **Label Scanner** | Upload a packaged food label for OCR text extraction and allergen detection |
| **Allergy Profile** | Manage allergens with severity levels (Mild, Moderate, Severe) |
| **Allergy Card** | Shareable digital card with QR code — printable for restaurants |
| **History** | Complete log of all scans with risk breakdowns and analytics |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

---


## 👩‍💻 Author

**Bhavika Khabya**

- GitHub: [@bhavikakhabya](https://github.com/bhavikakhabya)

---

<p align="center">
  Made with ❤️
</p>

<p align="center">
  <a href="https://aller-guard-ai.vercel.app">
    <img src="https://img.shields.io/badge/Try_AllerGuard_AI-Live_Demo-6366f1?style=for-the-badge" alt="Try Live Demo"/>
  </a>
</p>
