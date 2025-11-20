# Job Portal — Assignment 10 (Frontend)

## 🚀 Features

### 🔐 Authentication
- Login via:  
  **POST /user/login**
- User is stored in `localStorage`
- Protected routes ensure only authenticated users can access pages

### 📄 Pages
| Page              | Description |
|------------------|-------------|
| Home              | Welcome page with navigation |
| Login             | Backend-powered login |
| Job Listings      | Fetches jobs from backend |
| Company Showcase  | Displays user/company images from backend |
| Create Job        | Admin-only job posting page |
| About             | Static description page |
| Contact           | Demo contact form |

---

## 🧩 Tech Stack

**Frontend**
- React 18  
- TypeScript  
- Vite  
- Material UI v7  
- Axios  
- React Router v6  
- Redux Toolkit  

**Backend (Assignment 8)**
- Express REST API  
- Bcrypt for authentication  
- Multer for image uploads  
- Static file serving (`/images/...`)

---

## 📡 API Endpoints Used

### 🔹 Authentication
```
POST /user/login
```

### 🔹 Fetch all users (Company Showcase)
```
GET /users
```

### 🔹 Job Listings
```
GET /jobs
```

### 🔹 Create Job (Admin only)
```
POST /create/job
```

---

## 📂 Project Structure

```
src/
  api/
    axiosClient.ts
  components/
    Navbar.tsx
    ProtectedRoute.tsx
  pages/
    Home.tsx
    Login.tsx
    CompanyShowcase.tsx
    CreateJob.tsx
    About.tsx
    Contact.tsx
  store/
    authSlice.ts
    store.ts
  types/
    index.ts
```

---

## ▶️ Running the Project

1. Install dependencies:
```
npm install
```

2. Start the dev server:
```
npm run dev
```

3. Ensure backend (Assignment 8) is running at:
```
http://localhost:3000
```


