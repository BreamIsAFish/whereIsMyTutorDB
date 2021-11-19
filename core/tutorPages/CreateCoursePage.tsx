import React, { FC, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Button } from "react-native-paper"

import EditCourseInfo from "../components/EditCourseInfo"
import { CourseInformations } from "../interfaces/courseInterface"

const CreateCoursePage: FC = () => {
  // States //
  const [courseInfo, setCourseInfo] = useState<CourseInformations>({
    courseImage: undefined,
    courseName: "",
    subjectName: "",
    lessonList: [],
    timeslots: {},
    price: 0,
    capacity: 0,
    learningType: "Mixed",
    description: "",
    courseHour: 0,
  })

  // Other functions //
  const createCourse = () => {
    console.log("Sending course req to backend...")
  }

  return (
    <View style={styles.page}>
      <EditCourseInfo courseInfo={courseInfo} setCourseInfo={setCourseInfo} />
      <Button mode="contained" color="dodgerblue" onPress={createCourse}>
        Create Course
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingTop: "10%",
    height: "100%",
  },
})

export default CreateCoursePage
