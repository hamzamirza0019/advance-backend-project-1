# 🚀 Backend - Production Style Backend API

A scalable backend application built using **Node.js**, **Express.js**, **MongoDB**, and **Cloudinary**, following a modular architecture inspired by real-world backend systems.

This project focuses on building production-ready backend fundamentals including authentication, file uploads, middleware design, structured error handling, and clean project organization.

---

## ✨ Features

### Authentication
- User Registration
- User Login
- JWT Access Token Authentication
- Refresh Token Mechanism
- Secure Logout
- Password Hashing using bcrypt

### File Uploads
- Avatar Upload
- Cover Image Upload
- Multer Middleware
- Cloudinary Integration
- Automatic Temporary File Cleanup

### User Management
- Register User
- Login User
- Logout User
- Refresh Access Token

### Backend Architecture
- Layered Architecture
- Centralized Error Handling
- Standard API Response Format
- Async Controller Wrapper
- Environment Based Configuration

---

# 🏗️ Project Architecture

```
src
│
├── controllers
│
├── models
│
├── routes
│
├── middlewares
│
├── utils
│
├── db
│
├── app.js
│
└── index.js
```

---

# ⚙️ Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Multer | File Upload |
| Cloudinary | Image Storage |
| Cookie Parser | Cookie Handling |
| dotenv | Environment Variables |

---

# 🔄 Request Lifecycle

```
Client
   │
   ▼
Express Route
   │
   ▼
Middleware
(Authentication / Multer)
   │
   ▼
Controller
   │
   ▼
Database
(Mongoose)
   │
   ▼
API Response
```

---

# 🔐 Authentication Flow

## Login

```
User
    │
    ▼
Verify Credentials
    │
    ▼
Generate Access Token
Generate Refresh Token
    │
    ▼
Store Refresh Token in Database
    │
    ▼
Send Cookies
```

---

## Access Protected Routes

```
Client
    │
Access Token
    │
verifyJWT Middleware
    │
Valid ?
    │
 ├── Yes → Continue
 └── No  → 401 Unauthorized
```

---

## Refresh Token Flow

```
Access Token Expired
          │
          ▼
POST /refresh-token
          │
          ▼
Verify Refresh Token
          │
          ▼
Match with Database
          │
          ▼
Generate New Tokens
          │
          ▼
Return New Access Token
```

---

# 📂 File Upload Flow

```
Client
   │
Multipart Form Data
   │
Multer
   │
public/temp
   │
Cloudinary Upload
   │
Delete Temp File
   │
Save Cloudinary URL
```

---

# 📦 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/v1/users/register | Register User |
| POST | /api/v1/users/login | Login User |
| POST | /api/v1/users/logout | Logout User |
| POST | /api/v1/users/refresh-token | Refresh Access Token |

---

# 🧠 Key Concepts Implemented

- Express Middleware
- JWT Authentication
- Refresh Token Rotation
- Cookie Based Authentication
- Password Hashing
- MongoDB Relationships
- Mongoose Middleware
- Environment Configuration
- Cloudinary SDK Integration
- Error Handling Architecture

---

# 🛡️ Security Practices

- Passwords hashed using bcrypt
- JWT Authentication
- HTTP Only Cookies
- Environment Variables
- Centralized Error Handling
- Input Validation
- File Cleanup After Upload

---

# 🐛 Debugging Challenges Solved

During development several real-world backend issues were identified and resolved:

- Cloudinary SDK configuration before environment loading
- Multer ENOENT file system errors
- Multipart form-data handling (`req.file` vs `req.files`)
- Mongoose middleware (`next()` with async)
- JWT signature verification
- Access vs Refresh token validation
- Cookie based authentication issues
- MongoDB schema migration during development
- Token expiry and refresh workflow

---

# 📖 What I Learned

This project helped me understand that backend engineering goes far beyond creating CRUD APIs.

Major learning areas include:

- Designing modular backend architecture
- Authentication using JWT Access & Refresh Tokens
- Middleware execution flow
- Database modelling using Mongoose
- External service integration (Cloudinary)
- Debugging across multiple layers of the application
- Writing reusable backend utilities
- Building scalable project structures

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/hamzamirza0019/advance-backend-project-1
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file.

```env
PORT=

MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Run Development Server

```bash
npm run dev
```

---

# 📌 Future Improvements

- Email Verification
- Password Reset
- Role Based Authorization
- OAuth Login
- API Documentation using Swagger
- Unit & Integration Testing
- Docker Support
- Logging (Winston/Pino)
- Rate Limiting
- Redis Based Token Blacklisting

---

# 👨‍💻 Author

**Hamza Mirza**

Backend Developer passionate about building scalable backend systems and understanding software engineering fundamentals.
