import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { apiBase } from "../envinronment";

const ConfirmSession = ({ route }) => {
  const navigation = useNavigation();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const code = route?.params?.coupon;
  const number = route?.params?.number;
  const pickedDate = route?.params?.date;
  const pickedSlot = route?.params?.pickedSlot;

  const isValidEmail = (string) => {
    let format = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    let result = format.test(string);
    return result;
  };

  useEffect(() => {
    let fetchData = async () => {
      setLoading(true);
      let url = `${apiBase}/myntra/sessions/${number}`;
      let result = await axios.get(url);
      setData(result?.data);
      setLoading(false);
    };
    fetchData();
  }, [number]);

  async function bookStylishSession() {
    setLoading(true);
    let url = `${apiBase}/book-session/${number}/${code}`;
    let updatedEmail =
      email?.length >= 1
        ? email?.toLowerCase()
        : data?.userData?.email?.toLowerCase();
    await axios
      .post(
        url,
        {
          date: pickedDate,
          time: pickedSlot,
          appUser: true,
          email: updatedEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert("SESSION BOOKED");
        setTimeout(() => {
          navigation.navigate("Home");
        }, 1000);
        console.log(response?.data);
      })
      .catch(function (error) {
        alert("BOOK SESSION FAILED");
        console.log(error);
      });
    setLoading(false);
  }

  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={"large"} color="#89023e" />
    </View>
  ) : (
    <ScrollView style={{ backgroundColor: "#fefcff" }}>
      <View style={styles.confirmSessionContainer}>
        {(() => {
          if (
            data?.userData?.email?.length > 1 &&
            data?.userData?.phone?.length > 1
          ) {
            return (
              <View>
                <Text style={styles.confirmSlotHeader}>
                  Do you want to confirm your slot at {pickedDate} on{" "}
                  {pickedSlot} ?
                </Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      bookStylishSession();
                    }}
                  >
                    <Text style={styles.buttonText}>CONFIRM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.navigate("Home")}
                  >
                    <Text style={styles.buttonText}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        })()}
      </View>
    </ScrollView>
  );
};

export default ConfirmSession;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  confirmSessionContainer: {
    padding: 15,
    backgroundColor: "#fefcff",
  },
  confirmSlotHeader: {
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    textAlign: "center",
    lineHeight: 30,
    letterSpacing: 0.5,
  },
  buttonsContainer: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  confirmButton: {
    marginBottom: 10,
    width: "60%",
    height: 50,
    padding: 5,
    backgroundColor: "#ffd9da",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontStyle: "normal",
    fontSize: 12,
    fontWeight: "600",
    color: "#89023e",
    textAlign: "center",
  },
  cancelButton: {
    width: "60%",
    height: 50,
    padding: 5,
    borderWidth: 1,
    borderColor: "#89023e",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
