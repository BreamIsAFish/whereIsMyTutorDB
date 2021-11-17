import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"

import CourseCard from "../components/CourseCard"
import { Course } from "../interfaces/courseInterface"

const SearchCoursePage = () => {
  // const [courseName, setCourseName] = useState()
  // const [subjectName, setSubjectName] = useState('Mathematics')
  // const [lessonList, setLessonList] = useState(['Calculus', 'Linear Algebra'])
  // const [courseDay, setCourseDay] = useState(['Monday', 'Wednesday'])
  // const [capacity, setCapacity] = useState(0)
  // const [maxCapacity, setMaxCapacity] = useState(0)
  // const [rating, setRating] = useState(0)
  // const [tutorName, setTutorName] = useState('Dr. Kommuay')
  const [courseList, setCourseList] = useState<Course[]>([
    {
      courseName: "Caluluay เรียนแล้วรวย",
      subjectName: "Mathematics",
      lessonList: ["Calculus", "Linear Algebra"],
      courseDay: ["Monday", "Tuesday"],
      capacity: 13,
      maxCapacity: 69,
      rating: 3.6,
      tutorName: "Dr. Kommuay",
    }, // Just test example, can be delete
    {
      courseName: "Caluluay เรียนแล้วรวย",
      subjectName: "Mathematics",
      lessonList: ["Calculus", "Linear Algebra"],
      courseDay: ["Monday", "Tuesday"],
      capacity: 13,
      maxCapacity: 69,
      rating: 3.6,
      tutorName: "Dr. Kommuay",
    }, // Just test example, can be delete
  ])

  return (
    <View style={styles.page}>
      <Text style={{ textAlign: "center" }}>
        {"======== Search bar ======="}
      </Text>
      {/* </View> */}
      <ScrollView style={styles.scrollSection}>
        {courseList.map((course, idx) => (
          <View key={idx} style={styles.card}>
            <CourseCard course={course} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingTop: "10%",
    height: "100%",
  },
  scrollSection: {
    marginTop: "5%",
    paddingHorizontal: "5%",
  },
  card: {
    marginBottom: "3%",
  },
})

export default SearchCoursePage
