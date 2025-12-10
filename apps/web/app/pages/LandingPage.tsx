import React from "react";
import Container from "../components/Container";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

interface LandingPageProps {
  onCreateAccount: () => void;
  onSignIn: () => void;
}

const LandingPage = ({ onCreateAccount, onSignIn }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Container>
        <NavBar />
        <Hero></Hero>
        <Footer></Footer>
      </Container>
    </div>
  );
};

export default LandingPage;
