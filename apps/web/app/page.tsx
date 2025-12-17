"use client";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

type AppView = "landing" | "auth-signup" | "auth-signin" | "dashboard";

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleCreateAccount = () => {
    setCurrentView("auth-signup");
  };

  const handleSignIn = () => {
    setCurrentView("auth-signin");
  };

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setCurrentView("landing");
  };

  if (currentView === "landing") {
    return (
      <LandingPage
        onCreateAccount={handleCreateAccount}
        onSignIn={handleSignIn}
      />
    );
  }
  if (currentView === "auth-signup" || currentView === "auth-signin") {
    const initialMode = currentView === "auth-signup" ? "signup" : "signin";
    return <LoginPage onLogin={handleLogin} initialMode={initialMode} />;
  }
  if (currentView === "dashboard") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome, {userName}!
          </h1>
          <p className="text-gray-600 mb-6">You are now logged in.</p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return null; // Fallback
}
