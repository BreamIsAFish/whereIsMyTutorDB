import React, { useState, FC } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"

import { Review } from "../interfaces/courseInterface"

const ReviewCard: FC<{ review: Review }> = ({ review }) => {
    // const [courseName, setCourseName] = useState('Calculuay เรียนแล้วรวย')
    // const [subjectName, setSubjectName] = useState('Mathematics')
    // const [lessonList, setLessonList] = useState(['Calculus', 'Linear Algebra'])
    // const [courseDay, setCourseDay] = useState(['Monday', 'Wednesday'])
    // const [capacity, setCapacity] = useState(0)
    // const [maxCapacity, setMaxCapacity] = useState(0)
    // const [rating, setRating] = useState(0)
    // const [tutorName, setTutorName] = useState('Dr. Kommuay')
  
    const onClick = () => {
      console.log("reviewed")
    }
  
    return (
      <TouchableOpacity onPress={onClick}>
        <View style={styles.card}>
          <Image
            source={require("../../assets/CourseImage.png")}
            // resizeMode="contain"
            style={{
              height: "100%",
              width: "35%",
              marginRight: "3%",
            }}
          />
          <View style={{ marginVertical: "2%" }}>
            <Text>{review.studentName}</Text>
            <Text>{review.rating}</Text>
            <Text>{review.description}</Text>
            {/* <View style={{ flexDirection: "row" }}>
              {course.lessonList.map((lesson, idx) => (
                <Text key={idx}>{lesson}</Text>
              ))}
            </View> */}
            {/* <View style={{ flexDirection: "row" }}>
              {course.courseDay.map((day, idx) => (
                <Text key={idx}>{day}</Text>
              ))}
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>{"Rating: " + course.rating}</Text>
              <Text>{`Capacity: ${course.capacity}/${course.maxCapacity}`}</Text>
              <Text>{course.tutorName}</Text> */}
            {/* </View> */}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  
  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      borderColor: "gray",
      borderWidth: 5,
      borderRadius: 10,
    },
  })
  
  export default ReviewCard