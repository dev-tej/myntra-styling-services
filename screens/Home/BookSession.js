import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";

const BookSession = ({ route }) => {
  let today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  return (
    <View style={styles.bookSessionContainer}>
      <Text>Select Date & Slot for Session</Text>
      <Calendar
        minDate={"2022-11-10"}
        maxDate={"2022-11-29"}
        initialDate={selectedDate}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          setSelectedDate(day?.dateString);
        }}
        // Handler which gets executed on day long press. Default = undefined
        // onDayLongPress={(day) => {
        //   console.log("long press day", day);
        // }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        // monthFormat={"yyyy MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        // onMonthChange={(month) => {
        //   console.log("month changed", month);
        // }}
        // Hide month navigation arrows. Default = false
        // hideArrows={true}
        theme={{
          calendarBackground: "#f2f2f2",
          textDisabledColor: "#a3a3a3",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
        }}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        // renderArrow={(direction) => <Arrow />}
        // Do not show days of other months in month page. Default = false
        // hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        // disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Hide day names. Default = false
        // hideDayNames={true}
        // Show week numbers to the left. Default = false
        // showWeekNumbers={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        // disableArrowLeft={true}
        // Disable right arrow. Default = false
        // disableArrowRight={true}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        // renderHeader={(date) => {
        //   /*Return JSX*/
        // }}
        // Enable the option to swipe between months. Default = false
        // enableSwipeMonths={true}
      />
    </View>
  );
};

export default BookSession;

const styles = StyleSheet.create({
  bookSessionContainer: {
    padding: 15,
  },
});
