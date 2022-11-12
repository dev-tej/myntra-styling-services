/* eslint-disable no-undef */
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useRef } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../firebase";
import firebase from "firebase/compat/app";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [checkOtp, setCheckOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  let formattedNumber = `91${phoneNumber}`;

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    let numberToSend = `+91${phoneNumber}`;
    let number = JSON.stringify(formattedNumber);
    AsyncStorage.setItem("appLoggedNumber", number);
    phoneProvider
      .verifyPhoneNumber(numberToSend, recaptchaVerifier.current)
      .then(setVerificationId);
    setCheckOtp(true);
    setPhoneNumber("");
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setOtp("");
        setCheckOtp(false);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error, "Firebase Auth Error");
        setOtp("");
        AsyncStorage.clear();
        alert("Invalid OTP. Please enter correct OTP");
      });
  };

  return (
    <KeyboardAvoidingView style={styles.loginContainer} behavior="height">
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Image
        source={require("./images/PersonalStylistlogo.png")}
        style={{ width: 125, height: 80, marginLeft: 12 }}
      />
      <View style={styles.imageContainer}>
        <Image
          source={require("./images/LoginScreenGif.gif")}
          style={{ width: 230, height: 230 }}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "400",
            fontStyle: "normal",
            color: "#000",
          }}
        >
          Log In
        </Text>
      </View>
      <View>
        {(() => {
          if (checkOtp) {
            return (
              <View>
                <Text
                  style={{
                    width: 334,
                    fontSize: 12,
                    lineHeight: 17,
                    fontWeight: "400",
                    marginTop: 8,
                    color: "#858585",
                  }}
                >
                  Enter the 6-digit code we sent to {phoneNumber}.
                </Text>
                <Text
                  style={{
                    marginTop: 16,
                    fontWeight: "400",
                    fontSize: 12,
                    lineHeight: 17,
                  }}
                >
                  OTP
                </Text>
                <TextInput
                  placeholder="Enter OTP"
                  value={otp}
                  onChangeText={(text) => setOtp(text)}
                  keyboardType={"number-pad"}
                  style={{
                    width: "100%",
                    height: 41,
                    borderColor: "#858585",
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 10,
                    fontSize: 14,
                    marginTop: 10,
                  }}
                />
                <View style={styles.buttonContainer}>
                  {(() => {
                    if (otp?.length === 6) {
                      return (
                        <TouchableOpacity
                          style={{
                            padding: 12,
                            width: "100%",
                            height: 40,
                            backgroundColor: "#ffd9da",
                            borderRadius: 8,
                          }}
                          onPress={confirmCode}
                        >
                          <Text
                            style={{
                              fontWeight: "700",
                              textTransform: "uppercase",
                              color: "#89023e",
                              textAlign: "center",
                              marginTop: -1,
                            }}
                          >
                            CONFIRM
                          </Text>
                        </TouchableOpacity>
                      );
                    } else {
                      return (
                        <TouchableOpacity
                          style={{
                            padding: 12,
                            width: "100%",
                            height: 40,
                            backgroundColor: "#ffd9da",
                            borderRadius: 8,
                            opacity: 0.5,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "700",
                              textTransform: "uppercase",
                              color: "#89023e",
                              textAlign: "center",
                              marginTop: -1,
                            }}
                          >
                            CONFIRM
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                  })()}
                </View>
              </View>
            );
          } else {
            return (
              <View>
                <Text
                  style={{
                    width: 334,
                    fontSize: 12,
                    lineHeight: 17,
                    fontWeight: "400",
                    marginTop: 8,
                    color: "#858585",
                  }}
                >
                  Login with your phone number to book a session with a
                  professional Stylist.
                </Text>
                <Text
                  style={{
                    marginTop: 16,
                    fontWeight: "400",
                    fontSize: 12,
                    lineHeight: 17,
                  }}
                >
                  Phone Number
                </Text>
                <TextInput
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  keyboardType={"phone-pad"}
                  autoComplete="tel"
                  style={{
                    width: "100%",
                    height: 41,
                    borderColor: "#858585",
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 10,
                    fontSize: 14,
                    marginTop: 10,
                  }}
                />
                <View style={styles.buttonContainer}>
                  {phoneNumber?.length === 10 ? (
                    <TouchableOpacity
                      style={{
                        padding: 12,
                        width: "100%",
                        height: 40,
                        backgroundColor: "#ffd9da",
                        borderRadius: 8,
                      }}
                      onPress={sendVerification}
                    >
                      <Text
                        style={{
                          fontWeight: "700",
                          textTransform: "uppercase",
                          color: "#89023e",
                          textAlign: "center",
                          marginTop: -1,
                        }}
                      >
                        LOGIN
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        padding: 12,
                        width: "100%",
                        height: 40,
                        backgroundColor: "#ffd9da",
                        borderRadius: 8,
                        opacity: 0.5,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "700",
                          textTransform: "uppercase",
                          color: "#89023e",
                          textAlign: "center",
                          marginTop: -1,
                        }}
                      >
                        LOGIN
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }
        })()}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#fefcff",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
