import React, { FC, useState, useEffect, useCallback } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native"
import { Button } from "react-native-paper"

import { Course } from "../interfaces/courseInterface"
import CourseCard from "../components/CourseCard"
import { loadUsername } from "../util/AsyncStorage"
import { getCourseByTutor } from "../databases/NoSQL"

const ManageCoursePage: FC = () => {
  // states //
  const [username, setUsername] = useState<string>("")
  const [courseList, setCourseList] = useState<Course[]>([
    {
      courseName: "Caluluay เรียนแล้วรวย",
      subjectName: "Mathematics",
      lessonList: ["Calculus", "Linear Algebra"],
      // courseDay: ["Monday", "Tuesday"],
      capacity: 13,
      maxCapacity: 69,
      courseId: "001",
      tutorUsername: "001",
      tutorName: "",
      rating: 0,
    },
    {
      courseName: "Caluluay2 เรียนแล้วจน",
      subjectName: "Mathematics",
      lessonList: ["Calculus", "Linear Algebra"],
      // courseDay: ["Monday", "Tuesday"],
      capacity: 16,
      maxCapacity: 69,
      courseId: "002",
      tutorUsername: "002",
      tutorName: "",
      rating: 0,
    },
  ])

  // useNavigation
  const navigation = useNavigation()

  // useFocusEffect & useEffect //
  useFocusEffect(
    useCallback(() => {
      ;(async () => {
        await getTutorUsername()
        await getAllCourses()
      })()
    }, [])
  )

  // Fetch data //
  const getTutorUsername = async () => {
    const usr = await loadUsername()
    setUsername(usr[1])
  }

  const getAllCourses = async () => {
    const courses = await getCourseByTutor(username)
    setCourseList(
      courses.map((course) => ({
        courseName: course.courseName,
        subjectName: course.subject,
        lessonList: course.lesson,
        // courseDay: course.,
        capacity: 13,
        maxCapacity: 69,
        courseId: "001",
        tutorUsername: "001",
        rating: 0,
        tutorName: "",
      }))
    )
  }

  // other functions //
  const redirectEditCourse = (courseId: string) => {
    // console.log("navigating to edit course page...")
    navigation.dispatch(
      CommonActions.navigate({
        name: "EditCourseInfo",
        params: { courseId: courseId },
      })
    )
  }

  const redirectCreateCourse = () => {
    // console.log("navigating to edit course page...")
    navigation.dispatch(
      CommonActions.navigate({
        name: "CreateCourse",
      })
    )
  }

  return (
    <ScrollView style={styles.list}>
      {courseList.map((course, idx) => (
        <View key={idx} style={{ marginBottom: "3%" }}>
          <CourseCard
            course={course}
            onClick={() => redirectEditCourse(course.courseId)}
          />
        </View>
      ))}
      <View style={{ marginTop: "10%" }}>
        <Button
          mode="outlined"
          color="dodgerblue"
          onPress={redirectCreateCourse}
        >
          Create New Course
        </Button>
      </View>
    </ScrollView>

    // </View>
  )
}

const styles = StyleSheet.create({
  list: {
    padding: "3%",
  },
})

export default ManageCoursePage
