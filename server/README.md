# BazarBhai - E-commerce Platform Backend
# Overview
BazarBhai is an e-commerce platform backend designed to manage product listings, user authentication, order processing, and file uploads. This document provides setup instructions and requirements for running the backend locally.
Features

Product management (CRUD operations)
User authentication and authorization using JWT
Image and file uploads via Cloudinary
MongoDB integration for data persistence

# Requirements
## Technology Stack

- Node.js: Version 18 or higher
- npm: For dependency management

## External Tools

- Cloudinary: For handling image and file uploads
- MongoDB: For database storage (local or cloud-based, e.g., MongoDB Atlas)

# Setup Instructions

1. Clone the Repository
```bash
git clone https://gitlab.com/bazarbhai/bazarbhai-backend.git
cd bazarbhai-backend 
```


2. Install Dependencies

```bash
npm install
```


# Configure Environment Variables 
Create a `.env` file in the root directory (same location as package.json) with the following content:
```bash
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
PORT=8080
```

⚠️ **Warning:** 
Replace the placeholder values (your_cloudinary_api_key, etc.) with actual credentials:

Obtain Cloudinary credentials from Cloudinary Dashboard.

**Set up a MongoDB instance and get the URI from MongoDB Atlas or a local MongoDB installation.**
Use a secure random string for `JWT_SECRET`.


# Run the Application
```bash
npm start
```

**The server will start on http://localhost:8080 (or the port specified in .env).**


Troubleshooting

Cloudinary Errors: Ensure API keys and secrets are correct. Check Cloudinary's documentation for rate limits.
MongoDB Connection Issues: Verify the MONGODB_URI is correct and the MongoDB service is running.
Port Conflicts: Change the PORT in .env if 8080 is in use.

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).

# API reference

[API end points](src/docs/API.md)

# License
This project is licensed under the MIT License. See the LICENSE file for details.
# Contact
For support, contact the BazarBhai team at `saif.zsdb@gmail.com` or visit BazarBhai.
