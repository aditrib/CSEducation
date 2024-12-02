import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import db from "../database/db";
import { CoursesContext } from "../context/CoursesContext";

export default function useUnenroll() {
  const [isLoading, setIsLoading] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const { setEnrolledSelectedCourse } = useContext(CoursesContext);

  const unenrollInCourse = async (courseName) => {
    setIsLoading(true);
    // TODO
    const setData = async () => {
      if (userData != null) {
        try {
          let updatedCourseData = { ...userData.courses };
          delete updatedCourseData[courseName];
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
    setEnrolledSelectedCourse(false);
    setIsLoading(false);
  };

  return { unenrollInCourse };
}
