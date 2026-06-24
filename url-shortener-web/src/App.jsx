import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary"; // 👈 Import

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Home from "./components/Home";
import Navbar from "./components/Navbar"; // ✅ Import navbar
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="pt-24">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ErrorBoundary>
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                </ErrorBoundary>
              }
            />
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
            {/* Private Routes */}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
