"use client";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";


type AppView = "landing" | "auth-signup" | "auth-signin" | "dashboard";

export default function App() {

  const [currentView,setCurrentView]=useState<AppView>("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  const handleCreateAccount = () => {
    setCurrentView('auth-signup');
  };

  const handleSignIn = () => {
    setCurrentView('auth-signin');
  };

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentView('landing');
  };

  if (currentView === 'landing') {
    return <LandingPage onCreateAccount={handleCreateAccount} onSignIn={handleSignIn} />;
  }

 
}
