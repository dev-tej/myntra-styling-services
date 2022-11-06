import React from "react";
import {
  HomeContainer,
  BackgroundContainer,
  NavbarSection,
  MyntraLogo,
  BackgroundImage,
  WelcomeContainer,
  WelcomeText,
  InfluencerHeader
} from "./components";
import Tabs from "./Tabs";

const Home = () => {
  return (
    <HomeContainer>
      <BackgroundImage
        source={require("./images/BackgroundStylishImage.png")}
        resizeMode="stretch"
      >
        <BackgroundContainer>
          <NavbarSection>
            <MyntraLogo source={require("./images/PersonalStylistLogo.png")} />
          </NavbarSection>
          <WelcomeContainer>
            <WelcomeText>Welcome Back</WelcomeText>
            <InfluencerHeader>+919848913028</InfluencerHeader>
          </WelcomeContainer>
        </BackgroundContainer>
      </BackgroundImage>
      <Tabs />
    </HomeContainer>
  );
};

export default Home;
