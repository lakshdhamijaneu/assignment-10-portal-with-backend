# Assignment 8 — Secure RESTful APIs (Final)

This backend implements all requirements for **Assignment 8**, aligned with the provided Postman Collection and SwaggerHub specification.

---

## 🚀 Setup

1. Copy environment file:
   ```bash
   cp .env.example .env
   ```
2. Set your MongoDB connection string in `.env`:
   ```
   MONGODB_URI=mongodb+srv://...
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

Backend runs at:
```
http://localhost:3000
```

---

## 📘 API Documentation (Swagger UI)

Swagger UI is available at:

👉 **http://localhost:3000/docs**

---

## 🔐 Features Implemented

- Secure user creation and authentication
- Password hashing using **bcrypt (10 rounds)**
- CRUD operations (Create, Edit, Delete)
- Image upload (1 per user, JPEG/PNG/GIF)
- Static serving of user images under `/images/*`
- Fully testable via Postman

---

## 📡 API Endpoints (Accurate per Postman Collection)

### ### **Base URL:**  
```
http://localhost:3000
```

---

### **1. Create User**
**POST** `/user`

**Body (JSON)**
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "S3cure!Pass1@"
}
```

---

### **2. Login**
**POST** `/user/login`

**Body (JSON)**  
```json
{
  "email": "john.doe@example.com",
  "password": "S3cure!Pass1@"
}
```

---

### **3. Edit User**
**PUT** `/user/edit`

**Body (JSON)**
```json
{
  "email": "john.doe@example.com",
  "fullName": "Johnny Doe",
  "password": "N3w!Pass@123"
}
```

---

### **4. Get All Users**
**GET** `/getUser`

Returns all users with fields such as:
- `fullName`
- `email`
- `imagePath`

---

### **5. Upload Image**
**POST** `/user/uploadImage`

Content-Type: **multipart/form-data**

**Form fields**
- `email`: text  
- `image`: file (PNG/JPG/GIF)

Stored under:
```
/images/<generated_filename>.png
```

---

### **6. Delete User**
**DELETE** `/user/:email`

Example:
```
DELETE /user/john.doe@example.com
```

---

## 🗂 Folder Structure

```
backend/
 ├── src/
 │    ├── app.js
 │    ├── routes/
 │    ├── controllers/
 ├── images/                # Uploaded images
 ├── swagger/
 ├── package.json
 └── .env
```

Static image hosting enabled via:
```js
app.use("/images", express.static(path.join(__dirname, "..", "images")));
```
