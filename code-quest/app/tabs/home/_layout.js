import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import BackButton from "../../../components/courseDetails/BackButton";
import theme from "../../../assets/theme";

export default function StackLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="courseDetails"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="moduleContent"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="newcourse"
        options={{
          headerTitle: "New Course",
          headerTitleStyle: styles.headerTitleStyle,
          animation: "slide_from_bottom",
          presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          ),
          headerStyle: styles.headerStyle,
          gestureEnabled: false,
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  cancelButtonText: {
    color: theme.colors.textGray,
  },
  submitButtonText: {
    color: theme.colors.darkBlue,
  },
  headerStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
  headerTitleStyle: {
    color: theme.colors.darkBlue,
  },
});
