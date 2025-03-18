# POSGRESTORE

![image](https://github.com/user-attachments/assets/e8638c55-417c-40a1-85b7-05fbb6e7361e)


A modern e-commerce product management system built with React, TypeScript, Node.js, and PostgreSQL.

## 🚀 Features

- **Product Management**: Create, read, update, and delete products
- **Responsive Design**: Works on desktop and mobile devices
- **Theme Switching**: Toggle between light and dark modes
- **Real-time Feedback**: Toast notifications for user actions
- **Security**: Rate limiting and bot detection with Arcjet
- **Database**: PostgreSQL storage with Neon serverless

## 📋 Tech Stack

### Frontend
- React 18
- TypeScript
- Zustand (State Management)
- React Router
- Tailwind CSS
- DaisyUI Components

### Backend
- Node.js
- Express.js
- PostgreSQL (Neon)
- Arcjet (Security)
- Helmet (HTTP Headers)
- CORS Protection


## 📱 Usage

### Managing Products
- **View Products**: Visit the homepage to see all products
- **Add Product**: Click the "Add Product" button and fill the form
- **Edit Product**: Click on any product to edit its details
- **Delete Product**: Use the delete button on the product edit page

### Theme Switching
- Click the theme toggle in the navbar to switch between light and dark modes

## 🔒 Security Features

POSGRESTORE implements several security measures:

- **Rate Limiting**: Prevents abuse by limiting request frequency
- **Bot Detection**: Identifies and blocks malicious bots
- **Secure Headers**: Implements security headers with Helmet
- **Input Validation**: Validates all user inputs before processing
- **SQL Injection Protection**: Uses parameterized queries

## 📦 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/products | Get all products |
| GET    | /api/products/:id | Get a specific product |
| POST   | /api/products | Create a new product |
| PUT    | /api/products/:id | Update a product |
| DELETE | /api/products/:id | Delete a product |
