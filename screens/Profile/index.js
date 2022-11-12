/* eslint-disable no-undef */
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#fefcff",
    height: "100%",
  },
  underConstructionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noDataLogo: {
    width: "100%",
    height: 200,
  },
  workingHeader: {
    color: "#89023e",
    fontStyle: "italic",
  },
});

const Profile = () => {
  return (
    <ScrollView style={{ backgroundColor: "#fefcff" }}>
      <View style={styles.container}>
        <Text>Account Settings</Text>
        <View style={styles.underConstructionContainer}>
          <Image
            source={require("./images/UnderConstruction.png")}
            style={styles.noDataLogo}
          />
          <Text style={styles.workingHeader}>
            We are working on this section
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
