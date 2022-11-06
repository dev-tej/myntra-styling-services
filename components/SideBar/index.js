import React, { useState, useEffect, useRef } from "react";
import { HamburgerButtonContainer, HamburgerIcon } from "./components";
import { View } from "react-native";

const SideBar = () => {
  const [loading, setLoading] = useState(false);
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);

//   useEffect(() => {
//     const closeDrawer = (event) => {
//       if (drawerRef.current && drawerRef.current.contains(event.target)) {
//         return;
//       }
//       toggleDrawer(false);
//     };

//     window.document.addEventListener("mousedown", closeDrawer);
//     return () => window.document.removeEventListener("mousedown", closeDrawer);
//   }, []);

  return (
    <View>
      <HamburgerButtonContainer>
        <HamburgerIcon source={require("./images/Hamburger.png")} />
      </HamburgerButtonContainer>
    </View>
  );
};

export default SideBar;
