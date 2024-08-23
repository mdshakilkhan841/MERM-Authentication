import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

function App() {
  const { checkAuth, isisCheckingAuth, isAuthenticated, user } = useAuthStore();
  console.log("🚀 ~ App ~ isAuthenticated:", isAuthenticated)
  console.log("🚀 ~ App ~ isisCheckingAuth:", isisCheckingAuth)
  console.log("🚀 ~ App ~ user:", user)

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
