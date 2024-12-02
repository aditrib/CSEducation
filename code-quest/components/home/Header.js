import { View, Image, StyleSheet, Dimensions } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const { userData } = useContext(UserContext);
  if (userData) {
    return (
      <View style={styles.header}>
        <Image
          source={require("./../../assets/images/default-profile.png")}
          style={styles.profileImage}
        />
      </View>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    alignItems: "flex-end",
    marginRight: 10,
  },
  profileImage: {
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").height * 0.06,
    borderRadius: 100,
  },
});
