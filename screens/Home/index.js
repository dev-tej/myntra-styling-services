import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  HomeContainer,
  BackgroundContainer,
  NavbarSection,
  MyntraLogo,
  BackgroundImage,
  WelcomeContainer,
  WelcomeText,
  InfluencerHeader,
} from "./components";
import Tabs from "./Tabs";
import { apiBase } from "../envinronment";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Home = () => {
  const [getNumber, setGetNumber] = useState("");
  const [sessionData, setSessionData] = useState({});
  const [loading, setLoading] = useState(false);

  const getLoggedInData = async () => {
    const value = await AsyncStorage.getItem("appLoggedNumber");
    setGetNumber(JSON.parse(value));
  };

  let fetchSessionData = async () => {
    setLoading(true);
    let url = `${apiBase}/myntra/sessions/919848913028`;
    let result = await axios.get(url);
    setSessionData(result?.data);
    setLoading(false);
  };

  useEffect(() => {
    getLoggedInData();
    fetchSessionData();
  }, []);

  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={"large"} color="#89023e" />
    </View>
  ) : (
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
            {sessionData?.userData?.name?.length > 1 ? (
              <InfluencerHeader>{sessionData?.userData?.name}</InfluencerHeader>
            ) : (
              <InfluencerHeader>{getNumber}</InfluencerHeader>
            )}
          </WelcomeContainer>
        </BackgroundContainer>
      </BackgroundImage>
      <Tabs sessionData={sessionData} number={getNumber} />
    </HomeContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
