import React from "react";
import Container from "../components/Container";
import NavBar from "../components/NavBar";

interface LandingPageProps {
  onCreateAccount: () => void;
  onSignIn: () => void;
}

const LandingPage = ({ onCreateAccount, onSignIn }: LandingPageProps) => {
  return (
    <div className="w-full">
      <Container>
        <NavBar />
      </Container>
    </div>
  );
};

export default LandingPage;
