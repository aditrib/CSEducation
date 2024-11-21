import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import theme from "./../../assets/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { UserContext } from "../../context/UserContext";
import useUserData from "../../utils/useUserData";
import useCourses from "../../utils/useCourses";
import { CoursesContext } from "../../context/CoursesContext";

export default function TabsLayout() {
  const userData = useUserData();
  const courseData = useCourses();
  return (
    <CoursesContext.Provider value={courseData}>
      <UserContext.Provider value={userData}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: theme.colors.darkBlue,
            tabBarStyle: styles.tabBarStyle,
            tabBarActiveBackgroundColor: "#F6F6F9",
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarIcon: ({ size, color }) => (
                <FontAwesome name="home" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="courses"
            options={{
              title: "Courses",
              tabBarIcon: ({ size, color }) => (
                <Feather name="book-open" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="person-sharp" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
        </Tabs>
      </UserContext.Provider>
    </CoursesContext.Provider>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
});
