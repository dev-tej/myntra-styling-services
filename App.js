import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./screens/Navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
