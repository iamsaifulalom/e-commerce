# 🛒 Full-Stack E-commerce Application

A **full-stack e-commerce web application** built with the **MERN stack** (MongoDB, Express.js, React, Node.js).
The platform allows customers to browse products, add them to the cart, and place orders, while admins can manage inventory, categories, and users.

This project demonstrates my ability to design and develop end-to-end web applications with authentication, state management, and database integration.

## ✨ Features
### 👤 User Features

- 🔐 User Authentication (JWT / OTP-based login)
- 🛍 Browse Products with categories, filters, and search
- 🛒 Shopping Cart (add, update, remove items)
- 💳 Checkout & Order Placement
- 📦 Order History & Tracking

### 🛠 Admin Features

- 📦 Product Management (create, edit, delete)
- 🏷 Category Management
- 👥 User Management
- 📊 Order Management and basic reporting

## 🏗 Tech Stack

- Frontend: React, Zustand, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication: JWT and O-Auth
- Deployment: Firebase (frontend), Render

## 🚀 Getting Started

- Clone the repository

```bash 
https://github.com/iamsaifulalom/e-commerce.git
cd e-commerce
```
- Install dependencies

```bash 
cd client && npm install
cd ../server && npm install
```

- Run the project

```bash 
# Run backend
cd server && npm run dev

# Run frontend
cd client && npm run dev
```

Frontend runs on ``http://localhost:3000 🎉``
Backend runs on ``http://localhost:3000 🎉``

## 📂 Project Structure

```bash
e-commerce/
 ├── admin/           # Frontend (React)
 ├── client/          # Frontend (React)
 ├── server/          # Backend (Node.js / Express)
 ├── docs/            # Documentation, screenshots, API docs
 ├── .gitignore
 ├── README.md
 └── LICENSE
```

## 📜 License

This project is licensed under the **MIT License**.