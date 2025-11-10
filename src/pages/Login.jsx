import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please enter email and password");
    }

    if (isSignup && password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    // ✅ Just store a dummy user in localStorage
    localStorage.setItem("user", JSON.stringify({ email }));

    // ✅ Redirect after login/signup
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 mb-4 rounded"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-3"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="text-center text-sm">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}
