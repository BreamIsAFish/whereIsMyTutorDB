import React, { FC, useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { useNavigation, CommonActions } from "@react-navigation/native"

import { Course } from "../interfaces/courseInterface"
import CourseCard from "../components/CourseCard"

const ManageCoursePage: FC = () => {
  // states //
  const [courseList, setCourseList] = useState<Course[]>([
    {
      courseName: "Caluluay เรียนแล้วรวย",
      subjectName: "Mathematics",
      lessonList: ["Calculus", "Linear Algebra"],
      courseDay: ["Monday", "Tuesday"],
      capacity: 13,
      maxCapacity: 69,
    },
    {
      courseName: "Caluluay2 เรียนแล้วจน",
      subjectName: "Mathematics",
      lessonList: ["Calculus", "Linear Algebra"],
      courseDay: ["Monday", "Tuesday"],
      capacity: 16,
      maxCapacity: 69,
    },
  ])

  // useNavigation //
  const navigation = useNavigation()

  // other functions //
  const redirectEditCourse = () => {
    console.log("navigating to edit course page...")
    // navigation.navigate('EditCourse');
    // navigation.push("CourseInfo")
    navigation.dispatch(
      CommonActions.navigate({
        name: "CourseInfo",
        // params: {
        //   \course
        // },
      })
    )
  }

  return (
    <ScrollView style={styles.list}>
      {courseList.map((course, idx) => (
        <View key={idx} style={{ marginBottom: "3%" }}>
          <CourseCard course={course} onClick={redirectEditCourse} />
        </View>
      ))}
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
