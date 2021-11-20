import React, { FC, useState } from "react"
import { View, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
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
      <ScrollView>
        <EditCourseInfo courseInfo={courseInfo} setCourseInfo={setCourseInfo} />
        <View style={{ paddingHorizontal: "5%" }}>
          <Button mode="contained" color="dodgerblue" onPress={createCourse}>
            Create Course
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingVertical: "10%",
    height: "100%",
  },
})

export default CreateCoursePage
