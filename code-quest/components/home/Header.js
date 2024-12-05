import { View, Image, StyleSheet, Dimensions } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import useImage from "../../utils/useImage";
import { Link } from "expo-router";

export default function Header() {
  const { userData } = useContext(UserContext);
  const { imageUri } = useImage({ path: userData["profile_image"] });
  if (userData) {
    return (
      <View style={styles.header}>
        <Link
          href={{
            pathname: `/tabs/profile`,
          }}
        >
          <Image
            source={{
              uri: imageUri,
            }}
            style={styles.profileImage}
          />
        </Link>
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
