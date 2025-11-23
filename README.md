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
