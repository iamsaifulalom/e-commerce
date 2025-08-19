# 🛒 Full-Stack E-commerce Application

A high-performance **full-stack e-commerce web application** built with the **MERN stack** (MongoDB, Express.js, React, Node.js) using a **micro-frontend architecture**. The platform enables customers to seamlessly browse products, manage carts, and place orders, while admins efficiently manage inventory, categories, and users.

## 🛍️ The platform consists of three separate apps:

- Client App– Customer-facing interface to browse products, manage carts, and place orders.

- Admin App – Dashboard for admins to manage inventory, categories, and users.

- Server – Backend API handling authentication, database integration, and business logic.

## 👨🏻‍💻 This project demonstrates:

- Modular, micro-frontend architecture for scalability and maintainability.

- Optimized performance and user experience through efficient state management and server-side logic.

- End-to-end features including authentication, role-based access, and real-time database integration.

## ✨ Features
### 👤 Shop Features

- 🔐 User Authentication (JWT / OTP-based login)
- 🛍 Browse Products with categories, filters, and search
- 🛒 Shopping Cart (add, update, remove items)
- 💳 Checkout & Order Placement
- 📦 Order History & Tracking
- ♾️ Infinite scroll

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
- Deployment: Firebase (frontend), Render (backend)



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

## 🚀 Getting Started

- Clone the repository

```bash 
https://github.com/iamsaifulalom/e-commerce.git
cd e-commerce
```
- Install dependencies

```bash 
cd client && npm install
cd ../admin && npm install
cd ../server && npm install
```

## Configure environment variables
Each app has its own `.env` file:

For **``server``** create a `.env` file in the root directory (same location as package.json) with the following content:
```bash
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
PORT=8080
```

For **``client``** create a `.env` file in the root directory (same location as package.json) with the following content:

```bash
VITE_BACKEND_URL=http://localhost:8080 # backend base url
```
For **``admin``** create a `.env` file in the root directory (same location as package.json) with the following content:

```bash
VITE_BACKEND_URL=http://localhost:8080# backend base url
```
⚠️ **Warning:** 
Replace the placeholder values (your_cloudinary_api_key, etc.) with actual credentials:

Obtain Cloudinary credentials from Cloudinary Dashboard.

**Set up a MongoDB instance and get the URI from MongoDB Atlas or a local MongoDB installation.**
Use a secure random string for `JWT_SECRET`.

## Run the project localy

```bash 
cd server && npm run dev # Run backend
cd admin && npm run dev # Run backend
cd client && npm run dev # Run frontend
```

Backend runs on ``http://localhost:8080 🎉``
Admin runs on ``http://localhost:3001 🎉``
Frontend runs on ``http://localhost:3000 🎉``
## 📄 Documentation

- [API Endpoints](docs/API_REFERENCE.md) – Complete list of REST API endpoints, request/response formats, and error handling.
- [Admin Frontend](admin/README.md) – Instructions and documentation for the admin panel.
- [Backend](server/README.md) – Backend setup, installation, environment variables, and architecture.

---


## 📜 License

This project is licensed under the **MIT License**.