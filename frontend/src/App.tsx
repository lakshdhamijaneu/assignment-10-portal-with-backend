import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import JobListings from "./pages/JobListings";
import CompanyShowcase from "./pages/CompanyShowcase";
import Contact from "./pages/Contact";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import EmployeeRoute from "./components/EmployeeRoute";
import CreateJob from "./pages/CreateJob";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Authenticated */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        {/* Employee-only */}
        <Route
          path="/jobs"
          element={
            <EmployeeRoute>
              <JobListings />
            </EmployeeRoute>
          }
        />

        {/* Admin-only */}
        <Route
          path="/admin/create-job"
          element={
            <AdminRoute>
              <CreateJob />
            </AdminRoute>
          }
        />

        {/* Shared */}
        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <CompanyShowcase />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
