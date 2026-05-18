# DigitBoard ✏️

A full-stack web application that lets you draw a digit on a canvas and get real-time AI-powered predictions.
The frontend captures your drawing, sends it to a Python backend, and a trained neural network returns the predicted digit.



🗂️ Project Structure

```
DigitBoard/
├── backend/         # Python ML server (model training & inference API)
├── frontend/        # TypeScript web app (drawing canvas & UI)
└── .gitignore
```


🚀 Features

- **Interactive Drawing Canvas** — Draw any digit (0–9) directly in your browser
- **Real-time Prediction** — The backend classifies your drawing instantly
- **ML-Powered Backend** — Trained on the MNIST dataset using a neural network (CNN)
- **REST API** — Clean separation between frontend and backend via HTTP
- **Jupyter Notebooks** — Includes model training and experimentation notebooks

---

🛠️ Tech Stack

| Layer     | Technology                                  |
|-----------|---------------------------------------------|
| Frontend  | TypeScript, CSS                             |
| Backend   | Python, Jupyter Notebook                    |
| ML Model  | MNIST-trained CNN (TensorFlow/Keras likely) |
| API       | Python HTTP server (Flask/FastAPI)          |

---

⚙️ Getting Started

Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn



Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python main.py
```

The backend API will be available at `http://localhost:5000` (or whichever port is configured).



Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser at `http://localhost:3000` (or the port shown in the terminal).

---

🧠 Model Training

The `backend/` folder contains Jupyter Notebooks used to train and evaluate the digit recognition model. To explore or retrain:

```bash
cd backend
jupyter notebook
```

Open the relevant `.ipynb` notebook and run the cells. The trained model weights are saved and loaded by the API server automatically.



📡 API Reference

`POST /predict`

Accepts a base64-encoded image of a drawn digit and returns the predicted class.

**Request body:**
```json
{
  "image": "<base64-encoded PNG>"
}
```

**Response:**
```json
{
  "prediction": 7,
  "confidence": 0.98
}
```



🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

📄 License

This project is open source. See the repository for details.

---

👩‍💻 Author

**Anushree Kale** — [@Anushree-kale](https://github.com/Anushree-kale)
