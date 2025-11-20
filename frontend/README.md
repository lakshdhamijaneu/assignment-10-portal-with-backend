# Job Portal -- Assignment 9

A full-stack job portal application built using **React + TypeScript +
Vite** (frontend) and the backend APIs implemented in **Assignment 8**.

This project demonstrates authentication, protected routes, API
integration, job listings, and company showcase images --- all styled
with **Material UI**.

------------------------------------------------------------------------

## 🚀 Features

### 🔐 **Authentication**

-   Login using:

        POST /user/login

-   Uses Axios to authenticate against backend

-   Stores logged-in user in `localStorage`

-   All main pages protected with `ProtectedRoute`

### 🏠 **Pages Included**

  Page               Description
  ------------------ ---------------------------------------------
  Home               Hero section + navigation buttons
  Login              Fully functional login with API integration
  Job Listings       Static job list displayed using MUI cards
  Company Showcase   Dynamic list of users fetched from backend
  About              Summary of app features
  Contact            Demo contact form

------------------------------------------------------------------------

## 🧩 **Tech Stack**

### Frontend

-   React 18\
-   TypeScript\
-   Vite\
-   Material UI v7\
-   Axios\
-   React Router v6

### Backend (From Assignment 8)

-   Node.js + Express\
-   REST API routes\
-   Bcrypt authentication\
-   Multer for image upload

------------------------------------------------------------------------

## 📡 **API Endpoints Used**

The frontend communicates with the backend using these routes:

### 🔹 Login

    POST /user/login

### 🔹 Fetch all users

    GET /getUser

### 🔹 User image upload

    POST /user/uploadImage

### 🔹 Other backend routes (create/edit/delete user)

Implemented in Assignment 8 --- not used directly in this frontend.

------------------------------------------------------------------------

## 📂 **Project Structure**

    src/
      api/
        axiosClient.ts
      components/
        Navbar.tsx
        ProtectedRoute.tsx
      context/
        AuthContext.tsx
      data/
        jobPosts.ts
      pages/
        Home.tsx
        Login.tsx
        JobListings.tsx
        CompanyShowcase.tsx
        About.tsx
        Contact.tsx
      types/
        index.ts

------------------------------------------------------------------------

## ▶️ **How to Run**

### 1️⃣ Install dependencies

    npm install

### 2️⃣ Start Vite dev server

    npm run dev

### 3️⃣ Make sure backend (Assignment 8) is running on:

    http://localhost:3000

------------------------------------------------------------------------

## 🖼️ Screenshots (Optional)

You may add screenshots here before submission:

    /screenshots/login.png  
    /screenshots/home.png  
    /screenshots/job-listings.png  
    /screenshots/company-showcase.png

------------------------------------------------------------------------

## ✔️ Notes

-   The Job Listings are static (frontend-only), as required.\
-   The Company Showcase pulls images and user details from the
    backend.\
-   The login is fully functional using Assignment 8 backend logic.\
-   Protected routes ensure only logged-in users can access pages.

------------------------------------------------------------------------

## 👨‍💻 Developed By

**Laksh Dhamija**\
Northeastern University\
Assignment 9 -- Web Development
