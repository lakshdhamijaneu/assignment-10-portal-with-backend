# Assignment 10 — Users & Jobs API (Backend)

## 🚀 Setup
cp .env.example .env  
npm install  
npm run dev

Base URL: http://localhost:3000  
Swagger Docs: http://localhost:3000/docs

---

## 🔐 Features
- User creation with role (`admin` / `employee`)
- Secure login (bcrypt)
- Edit & delete user
- Upload profile image (JPG/PNG/GIF)
- Serve images from `/images/*`
- Create job (admin)
- Get all jobs (employee)

---

## 📡 Endpoints

### POST /user
Create user.
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "S3cure!Pass1@",
  "type": "employee"
}
```

### POST /user/login  
Login.

### PUT /user/edit  
Edit user.

### GET /users  
Get all users.

### POST /user/uploadImage  
Upload profile image.

### DELETE /user/:email  
Delete user.

---

## 🏢 Job Endpoints

### POST /create/job  
```json
{
  "companyName": "Google",
  "jobTitle": "Software Engineer",
  "description": "Backend systems.",
  "salary": 150000
}
```

### GET /jobs  
Fetch all jobs.

---

## 🗂 Folder Structure
```
backend/
 ├── src/
 │    ├── app.js
 │    ├── controllers/
 │    ├── routes/
 │    ├── models/
 │    ├── docs/
 ├── images/
 ├── .env
 └── README.md
```
