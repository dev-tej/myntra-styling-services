import { View, Text, StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
