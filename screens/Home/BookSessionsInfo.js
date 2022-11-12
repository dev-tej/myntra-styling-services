/* eslint-disable no-undef */
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { apiBase } from "../envinronment";
import moment from "moment";
import axios from "axios";
import Icon from "react-native-vector-icons/Entypo";

const BookSessionsInfo = (props) => {
  const { bookingSessionData, number } = props;

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelInfoModal, setCancelInfoModal] = useState("");
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponValue, setCouponValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState("");
  const navigation = useNavigation();

  let fetchCouponData = async () => {
    setLoading(true);
    let url = `${apiBase}/myntra/sessions/add-coupon/${couponValue}/${number}`;
    let result = await axios.get(url);
    setLoading(false);
    setCouponValue("");
    if (result?.data?.status) {
      return setIsValid(true);
    } else {
      return setShowError(result?.data?.message);
    }
  };

  async function cancelSession(coupon, date, time, couponStatus) {
    setLoading(true);
    let url = `${apiBase}/cancel-session/${JSON.parse(
      localStorage.getItem("stylishPhone")
    )}/${coupon}`;
    await axios
      .post(
        url,
        {
          date: date,
          time: time,
          couponTerminated: couponStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        alert("SESSION CANCELLED");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        console.log(response?.data);
      })
      .catch(function (error) {
        alert("SESSION CANCEL FAILED");
        console.log(error);
      });
    setLoading(false);
  }

  // Render Upcoming Sessions Data
  function renderUpcomingSessioData() {
    return (
      <View>
        {bookingSessionData?.upcomingSessions?.length >= 1 ? (
          <View>
            <View style={styles.bookSessionDetails}>
              <View style={styles.respectiveSessionContainer}>
                <Image
                  style={styles.sessionInfoLogo}
                  source={require("./images/SessionInfoIcon.png")}
                />
                <Text style={styles.fillOutFormText}>
                  Please fill out the form for the respective session.
                </Text>
              </View>
            </View>
            {bookingSessionData?.upcomingSessions?.map((session, index) => {
              let scheduleDate = moment(
                session?.sessionStatus?.bookingDate?.replace("-", ""),
                "YYYYMMDD"
              ).format("Do MMMM YYYY");
              let days = moment(
                `${session?.sessionStatus?.bookingDate?.replace("-", "")}, ${
                  session?.sessionStatus?.bookingTime
                }`,
                "YYYYMMDD, hh:mm A"
              ).diff(moment(), "days");
              return (
                <View key={index}>
                  <View style={styles.exactSessionDetails}>
                    <View style={styles.exactSessionContainer}>
                      <Text style={styles.exactSessionDate}>
                        {scheduleDate}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    );
  }

  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={"large"} color="#89023e" />
    </View>
  ) : (
    <View>
      {bookingSessionData?.remainingSessions === 0 ? (
        <View>
          <Text style={styles.bookSessionHeader}>
            You have &nbsp;{" "}
            <Text style={styles.sessionNumber}>
              {bookingSessionData?.remainingSessions}
            </Text>
            &nbsp; coupons left.
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.bookSessionHeader}>
            You can book
            <Text style={styles.sessionNumber}>
              {bookingSessionData?.remainingSessions}
            </Text>
            more session(s).
          </Text>
          {bookingSessionData?.unUsedCoupons && (
            <TouchableOpacity
              style={styles.bookSessionButton}
              onPress={() => {
                navigation.navigate("BookSession", {
                  unUsedCoupon: bookingSessionData?.unUsedCoupons?.[0],
                });
              }}
            >
              <Icon name="plus" size={25} color="#89023e" />
              <Text style={styles.bookSessionTitle}>Book Session</Text>
            </TouchableOpacity>
          )}
          <View>{renderUpcomingSessioData()}</View>
        </View>
      )}
    </View>
  );
};

export default BookSessionsInfo;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  bookSessionDetails: {
    marginTop: 17.5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  respectiveSessionContainer: {
    marginTop: 8,
    width: "90%",
    height: 34,
    backgroundColor: "rgba(255, 217, 218, 0.22)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  sessionInfoLogo: {
    width: 13.5,
    height: 13.5,
  },
  fillOutFormText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 17,
    color: "#89023e",
  },
  exactSessionDetails: {
    padding: 9,
    marginTop: 16,
    marginBottom: 16,
    width: "100%",
    backgroundColor: "#fefcff",
    shadowColor: "rgba(0, 0, 0)",
    shadowOpacity: 0.11,
    borderRadius: 6,
  },
  exactSessionContainer: {
    marginTop: 9,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exactSessionDate: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 13,
    color: "#89023e",
  },
  bookSessionHeader: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 17,
    color: "#000",
    textAlign: "center",
  },
  sessionNumber: {
    fontWeight: "800",
    color: "#89023e",
    fontSize: 14,
  },
  bookSessionButton: {
    marginTop: 16,
    width: "100%",
    height: 48,
    backgroundColor: "#ffd9da",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgb(0, 0, 0, 0.11)",
    shadowOpacity: 0.11,
    shadowOffset: {
      width: 2,
      height: 10,
    },
  },
  bookSessionTitle: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 13,
    color: "#89023e",
    marginLeft: 12,
  },
});
