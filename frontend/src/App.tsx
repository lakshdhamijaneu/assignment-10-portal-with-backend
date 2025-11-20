import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import CompanyShowcase from "./pages/CompanyShowcase";
import Contact from "./pages/Contact";
import CreateJob from "./pages/CreateJob";
import AdminEmployees from "./pages/AdminEmployees";

import AdminRoute from "./components/AdminRoute";
import EmployeeRoute from "./components/EmployeeRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* EMPLOYEE-ONLY ROUTES */}
        <Route
          path="/"
          element={
            <EmployeeRoute>
              <Home />
            </EmployeeRoute>
          }
        />

        <Route
          path="/about"
          element={
            <EmployeeRoute>
              <About />
            </EmployeeRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <EmployeeRoute>
              <CompanyShowcase />
            </EmployeeRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <EmployeeRoute>
              <Contact />
            </EmployeeRoute>
          }
        />

        {/* ADMIN-ONLY ROUTES */}
        <Route
          path="/admin/add-job"
          element={
            <AdminRoute>
              <CreateJob />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <AdminRoute>
              <AdminEmployees />
            </AdminRoute>
          }
        />

        {/* ANY UNKNOWN ROUTE */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
