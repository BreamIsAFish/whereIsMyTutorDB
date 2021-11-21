import React, { useState, FC } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"

import { Course } from "../interfaces/courseInterface"

interface CourseCardProp {
  course: Course
  onClick?: () => void // "?" mean that onClick can be undefined (other page doesn't "need" sent onClick to this component)
}

const CourseCard: FC<CourseCardProp> = ({ course, onClick }) => {
  const defaultClick = () => {
    console.log("Kuy Pond")
  }

  return (
    <TouchableOpacity onPress={onClick ? () => onClick() : defaultClick}>
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
        <View style={{ marginVertical: "3%" }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 20, marginBottom: "5%" }}
          >
            {course.courseName}
          </Text>
          <Text>{course.subjectName}</Text>
          <View style={{ flexDirection: "row" }}>
            {course.lessonList.map((lesson, idx) => (
              <Text key={idx}>{lesson}</Text>
            ))}
          </View>
          {/* <View style={{ flexDirection: "row" }}>
            {course.courseDay.map((day, idx) => (
              <Text key={idx}>{day}</Text>
            ))}
          </View> */}
          <View style={{ flexDirection: "row", marginBottom: "4%" }}>
            <Text>{course.rating ? "Rating: " + course.rating + " " : ""}</Text>
            <Text>
              {course.capacity
                ? `Capacity: ${course.capacity}/${course.maxCapacity} `
                : ""}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: "3%" }}>
              <Image
                source={require("../../assets/icons/Person.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text>{course.tutorName}</Text>
          </View>
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

export default CourseCard
