import { useState, useEffect } from "react";
import db from "../database/db";

export default function useCourses() {
  const [courses, setCourses] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [enrolledSelectedCourse, setEnrolledSelectedCourse] = useState();

  const fetchCourses = async () => {
    setIsLoading(true);
    // TODO
    const fetchData = async () => {
      try {
        let coursesQuery = db.from("courses").select("*");
        const { data: courseData } = await coursesQuery;

        const { data: subjectData } = await db
          .from("courses")
          .select("subject", { count: "exact" })
          .neq("subject", null);

        const uniqueSubjects = Array.from(
          new Set(subjectData.map((item) => item.subject))
        );

        const groupedBySubject = courseData.reduce((acc, course) => {
          const subject = course.subject;

          if (!acc[subject]) {
            acc[subject] = [];
          }

          acc[subject].push(course);

          return acc;
        }, {});
        const coursesByName = courseData.reduce((acc, course) => {
          acc[course.course_name] = course;
          return acc;
        }, {});

        setCourses({
          courses: courseData,
          subjects: uniqueSubjects,
          groupedBySubject: groupedBySubject,
          coursesByName: coursesByName,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return {
    ...courses,
    isLoading: isLoading,
    selectedCourse: selectedCourse,
    setSelectedCourse: setSelectedCourse,
    enrolledSelectedCourse: enrolledSelectedCourse,
    setEnrolledSelectedCourse: setEnrolledSelectedCourse,
  };
}
