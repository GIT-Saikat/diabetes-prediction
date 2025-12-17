"use client";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import { DiabetesPredictionForm } from "./pages/DiabetesPredictionForm";
import Dashboard from "./pages/Dashboard";

export interface HealthData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  age: number;
  immediateFamilyHistory: string;
  extendedFamilyHistory: string;
}

export interface PredictionResult {
  isDiabetic: boolean;
  probability: number;
  riskLevel: "Low" | "Moderate" | "High" | "Very High";
  riskFactors: string[];
  feedback: string[];
}

type AppView = "landing" | "auth-signup" | "auth-signin" | "dashboard";

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [predictionResult, setPredictionResult] =
    useState<PredictionResult | null>(null);

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
    setPredictionResult(null);
    setCurrentView("landing");
  };

  const handlePrediction = (result: PredictionResult) => {
    setPredictionResult(result);
  };

  const handleNewPrediction = () => {
    setPredictionResult(null);
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
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-indigo-600">Diabetes Risk Predictor</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {userName}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!predictionResult ? (
          <DiabetesPredictionForm
            userName={userName}
            onPrediction={handlePrediction}
          />
        ) : (
          <Dashboard
            result={predictionResult}
            userName={userName}
            onNewPrediction={handleNewPrediction}
          />
        )}
      </main>
    </div>
  );
}
