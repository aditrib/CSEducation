import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import db from "../database/db";
import { CoursesContext } from "../context/CoursesContext";

export default function useCompleteModule() {
  const [isLoading, setIsLoading] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const { selectedCourse } = useContext(CoursesContext);

  const completeModule = async (moduleName) => {
    setIsLoading(true);
    // TODO
    const setData = async () => {
      if (userData != null) {
        try {
          let updatedCourseData = { ...userData.courses };
          if (
            !updatedCourseData[selectedCourse["course_name"]].includes(
              moduleName
            )
          ) {
            updatedCourseData[selectedCourse["course_name"]].push(moduleName);
          }
          setUserData({
            ...userData,
            courses: { ...updatedCourseData },
          });
          let userQuery = db
            .from("users")
            .update({
              ...userData,
              courses: { ...updatedCourseData },
            })
            .eq("email", userData.email);
          await userQuery;
        } catch (err) {
          console.error(err);
        }
      }
    };
    setData();
    setIsLoading(false);
  };

  return { completeModule };
}
