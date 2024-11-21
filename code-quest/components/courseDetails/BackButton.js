import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import theme from "../../assets/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()}>
      <View style={styles.backButton}>
        <Ionicons
          name="arrow-back"
          size={theme.sizes.iconLarge}
          color={theme.colors.darkBlue}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingLeft: 5,
  },
});
