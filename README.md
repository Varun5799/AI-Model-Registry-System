The AI Model Registry System is a web-based platform developed to manage and interact with multiple AI models through a single unified interface.

This system allows users to register, view, update, and delete AI model configurations such as model name, inference API URL, and authentication keys. It acts as a central registry where different AI services like HuggingFace models and OpenRouter APIs can be connected and used dynamically.

The backend is built using Node.js and Express.js, which handles
model storage, API routing, and inference requests.
All model details are stored in a local JSON file instead of a database for simplicity.

The frontend provides an easy-to-use UI where users can select a model, send prompts, and receive AI-generated responses in real-time. The backend dynamically forwards the request to the selected model’s API and returns the output to the user.

This project demonstrates real-world implementation of:

Microservices-inspired architecture

REST API development

Environment variable management using .env

Deployment readiness using Docker

Secure handling of API keys
....................................................................................................................................

# 🚀 AI Model Registry System – Setup & Run Guide

This document explains how to run the project **locally** and using **Docker**.
You can directly copy this into your GitHub `README.md`.

---

## ✅ Run Backend Locally

Step 1: Go to backend folder

```bash
cd backend
```

Step 2: Install dependencies

```bash
npm install
```

Step 3: Start backend server

```bash
node server.js
```

Backend will run at:

```
http://localhost:5000
```

Test it here:

```
http://localhost:5000/models
```

---

## ✅ Run Frontend Locally

Step 1: Go to frontend folder

```bash
cd frontend
```

Step 2: Open `index.html` using VS Code Live Server or browser
Example:

```
http://127.0.0.1:5500/frontend/index.html
```

Make sure `app.js` has:

```js
const API = "http://localhost:5000";
```

---

# 🐳 Run Project Using Docker

## ✅ Run Backend Using Docker

Step 1: Go inside backend folder

```bash
cd backend
```

Step 2: Build backend image

```bash
docker build -t ai-backend .
```

Step 3: Stop and remove old container if exists

```bash
docker stop model-backend
docker rm model-backend
```

Step 4: Run backend container

```bash
docker run -d -p 5000:5000 --name model-backend ai-backend
```

Check backend:

```
http://localhost:5000/models
```

---

## ✅ Run Frontend Using Docker

Step 1: Go inside frontend folder

```bash
cd frontend
```

Step 2: Build frontend image

```bash
docker build -t ai-frontend .
```

Step 3: Stop and remove old container if exists

```bash
docker stop model-frontend
docker rm model-frontend
```

Step 4: Run frontend container

```bash
docker run -d -p 3000:80 --name model-frontend ai-frontend
```

Open frontend:

```
http://localhost:3000
```

---

## 🔍 Final Check

Run:

```bash
docker ps
```

Expected output:

```
model-backend   0.0.0.0:5000->5000/tcp
model-frontend  0.0.0.0:3000->80/tcp
```

---

## ✅ Important Notes

* Backend must be running before frontend.
* Always keep in `app.js`:

```js
const API = "http://localhost:5000";
```

* Do NOT use container names like `model-backend` in frontend API URL.

---

## 👨‍💻 Git Commands

After making changes:

```bash
git add .
git commit -m "Updated project"
git pull origin main --rebase
git push origin main
```


