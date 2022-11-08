import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BookSessionsInfo from "./BookSessionsInfo";
import CompletedSessions from "./CompletedSessions";
// import { SessionContainer, TabsContainer, TabItem } from "./components";

const TabsData = [
  {
    id: 0,
    title: "Upcoming Sessions",
  },
  {
    id: 1,
    title: "Completed Sessions",
  },
];

const styles = StyleSheet.create({
  tabsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 33.5,
  },
  selectedTabDetails: {
    marginTop: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Tabs = (props) => {
  const { sessionData, number } = props;
  const [selectedTab, setSelectedTab] = useState("Upcoming Sessions");

  return (
    <View
      style={{
        width: "100%",
        marginTop: -50,
        height: "100%",
        padding: 10,
        backgroundColor: "#fefcff",
        shadowColor: "rgba(0, 0, 0)",
        shadowOpacity: 0.11,
        borderRadius: 20,
      }}
    >
      <View style={styles.tabsContainer}>
        {TabsData?.map((tab, index) => {
          return (
            <Text
              style={{
                fontStyle: "normal",
                fontSize: 16,
                color: tab?.title === selectedTab ? "#cc7178" : "#858585",
                textDecorationLine:
                  tab?.title === selectedTab ? "underline" : "",
                textDecorationStyle: tab?.title === selectedTab ? "solid" : "",
                textDecorationColor:
                  tab?.title === selectedTab ? "#cc7178" : "",
              }}
              key={index}
              onPress={() => setSelectedTab(tab?.title)}
            >
              {tab?.title}
            </Text>
          );
        })}
      </View>
      <View style={styles.selectedTabDetails}>
        {selectedTab === "Upcoming Sessions" ? (
          <BookSessionsInfo bookingSessionData={sessionData} number={number} />
        ) : (
          <CompletedSessions
            completedSessionData={sessionData}
            number={number}
          />
        )}
      </View>
    </View>
  );
};

export default Tabs;
