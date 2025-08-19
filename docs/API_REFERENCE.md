# 📋 API Documentation 

This API allows users to register, login, browse products, place orders, and more. 
Admins can manage products, categories, and orders. 

**⚙️ Key Features:**
- User registration, login 
- Product, user, order and category management
- Cart and order management
- Role-based access control (Admin/User)


## BASE URL
```bash
https://api.bazarbhai.com
```

## API Sections

- [Auth API](#auth-api)
- [Products API](#products-api)
- [Orders API](#orders-api)
- [Users API](#users-api)

## Auth API

### Register new user
**POST** `/api/users/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "017XXXXXXXX",
  "password": "yourpassword"
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "userId": "12345",
    "name": "John Doe",
    "phone": "017XXXXXXXX"
    }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": 400,
    "message": "Invalid input",
    "details": "Phone number is required"
  }
}
```

## Orders API