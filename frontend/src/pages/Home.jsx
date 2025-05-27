import React from "react";
import MainSection from "../components/MainSection";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home - NextGenCoach</title>
        <meta name="description" content="Home page of NextGenAiCoach" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <MainSection />
    </div>
  );
};

export default Home;
