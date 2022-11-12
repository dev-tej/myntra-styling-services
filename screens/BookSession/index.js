import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { apiBase } from "../envinronment";
import axios from "axios";

const BookSession = ({ route }) => {
  // let today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState({});
  const [unavailableDates, setUnavalialbeDates] = useState({});
  const [selectedSlot, setSelectedSlot] = useState("");
  const currentYear = moment().format("YYYY");
  const currentMonth = moment().format("MM");
  const [getNumber, setGetNumber] = useState("");

  const couponCode = route?.params?.unUsedCoupon;
  const navigation = useNavigation();

  AsyncStorage.getItem("appLoggedNumber").then((value) => {
    setGetNumber(JSON.parse(value));
  });

  useEffect(() => {
    let fetchUnavailableDates = async () => {
      setLoading(true);
      let url = `${apiBase}/stylist/days/unavailable/${currentYear}/${currentMonth}`;
      let result = await axios.get(url);
      setUnavalialbeDates(result?.data);
      setLoading(false);
    };
    fetchUnavailableDates();
  }, [currentMonth, currentYear]);

  useEffect(() => {
    let fetchAvailableSlots = async () => {
      setLoading(true);
      let url = `${apiBase}/stylist/available/slots/${selectedDate}`;
      let result = await axios.get(url);
      setSlots(result?.data);
      setLoading(false);
    };
    fetchAvailableSlots();
  }, [selectedDate]);

  useEffect(() => {
    setSelectedDate(null);
  }, []);

  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={"large"} color="#89023e" />
    </View>
  ) : (
    <ScrollView style={{ backgroundColor: "#fefcff" }}>
      <View style={styles.bookSessionContainer}>
        <Text>Select Date & Slot for Session</Text>
        <Calendar
          minDate={moment().add(2, "days").format("YYYY-MM-DD")}
          maxDate={moment().add(21, "days").format("YYYY-MM-DD")}
          initialDate={selectedDate}
          onDayPress={(day) => {
            setSelectedDate(day?.dateString);
            setSelectedSlot("");
          }}
          theme={{
            calendarBackground: "#fefcff",
            textDisabledColor: "#a3a3a3",
            selectedDayBackgroundColor: "#89023e",
            selectedDayTextColor: "#fefcff",
            arrowColor: "#89023e",
            todayTextColor: "#cc7178",
            dayTextColor: "#2d4150",
          }}
          firstDay={1}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          disableAllTouchEventsForDisabledDays={true}
        />
      </View>
      {!!selectedDate && slots?.availableSlots?.length >= 1 && (
        <View style={styles.slotsContainer}>
          <Text style={{ textAlign: "center" }}>Available Slots</Text>
          <View style={styles.slotsDisplay}>
            {slots?.availableSlots?.map((slot, index) => {
              return (
                <TouchableOpacity
                  style={{
                    width: "25%",
                    height: 40,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor:
                      selectedSlot === slot ? "transparent" : "#89023e",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      selectedSlot === slot ? "#ffd9da" : "transparent",
                    margin: 5,
                  }}
                  key={index}
                  onPress={() => {
                    setSelectedSlot(slot);
                    setTimeout(() => {
                      navigation.navigate("ConfirmSession", {
                        coupon: couponCode,
                        date: selectedDate,
                        pickedSlot: slot,
                        number: getNumber,
                      });
                    }, 500);
                    setSelectedDate(null);
                    setSelectedSlot("");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: "#89023e",
                    }}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default BookSession;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  bookSessionContainer: {
    padding: 15,
    backgroundColor: "#fefcff",
  },
  slotsContainer: {
    padding: 15,
  },
  slotsDisplay: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    flex: 2,
  },
});
