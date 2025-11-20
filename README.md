# Assignment 10 — Full-Stack Job Portal

A complete full-stack Job Portal built using **React + TypeScript + Vite (frontend)** and **Node.js + Express + MongoDB (backend)**.  
Features **role-based authentication**, **protected routes**, **job posting**, and a **company showcase** with image hosting.

---

## 🚀 Features

### 🔐 Authentication & Roles
- Login via: `POST /user/login`
- Roles supported: **admin**, **employee**
- Auth stored in Redux + localStorage
- Restores session on refresh
- Admin-only access to Create Job

### 🧭 Frontend Pages
| Page | Description |
|------|-------------|
| Login | Authenticates user |
| Home | Welcome message + role badge + navigation |
| Job Listings | Shows job postings from backend |
| Create Job | **Admin-only** job creation form |
| Company Showcase | Displays all users + profile images |
| About / Contact | Static demo pages |

---

## 🧩 Tech Stack

### Frontend
- React 18  
- TypeScript + Vite  
- Material UI v7  
- Redux Toolkit  
- Axios  
- React Router v6  

### Backend
- Node.js + Express  
- MongoDB + Mongoose  
- Multer (image upload)  
- Bcrypt (password hashing)  
- REST API (Assignment 8 + new job routes)

---

## 📡 API Endpoints

### Authentication
```
POST /user/login
```

### Users
```
GET /users
POST /user/uploadImage
```

### Jobs
```
POST /create/job       // Admin only
GET  /jobs             // Job listings
```

### Image Hosting
```
/images/<filename>
```

---

## 📂 Project Structure

```
assignment-10/
  backend/
    src/
      controllers/
      models/
      routes/
      app.js
    images/
  frontend/
    src/
      pages/
      components/
      store/
      api/
      types/
```

---

## ▶️ Running the Project

### Start Backend
```
cd backend
npm install
npm run dev
```
Backend URL: `http://localhost:3000`

### Start Frontend
```
cd frontend
npm install
npm run dev
```
Frontend URL: `http://localhost:5173`

---
