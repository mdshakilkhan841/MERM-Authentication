import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignupPage";
import Login from "./pages/Login";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
