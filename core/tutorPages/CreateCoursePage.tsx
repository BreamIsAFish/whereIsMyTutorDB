import React, { FC, useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"

import EditCourseInfo from "../components/EditCourseInfo"
import { addCourse } from "../databases/NoSQL"
// import { CourseInformations } from "../interfaces/courseInterface"
import { AddCourseDto } from "../interfaces/dto"
import { loadUsername } from "../util/AsyncStorage"

const CreateCoursePage: FC = () => {
  // States //
  // const [username, setUsername] = useState<string>("")
  const [courseInfo, setCourseInfo] = useState<AddCourseDto>({
    courseName: "",
    subject: "",
    lesson: [],
    timeSlot: {},
    price: 0,
    capacity: 0,
    learningType: "Mixed",
    description: "",
    courseHour: 0,
    tutorUsername: "",
    createDate: new Date(),
  })

  // useNavigation //
  const navigation = useNavigation()

  // useEffect //
  useEffect(() => {
    getTutorUsername()
  }, [])

  // Fetch data //
  const getTutorUsername = async () => {
    const usr = await loadUsername()
    setCourseInfo({ ...courseInfo, tutorUsername: usr[1] })
  }

  // Other functions //
  const createCourse = () => {
    console.log("Sending course req to backend...")
    addCourse(courseInfo)
    navigation.goBack()
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
