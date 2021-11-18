import React, { useState, FC } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from "react-native"

import { Enrollment } from "../interfaces/courseInterface"

const EnrollmentCard: FC<{ enrollment: Enrollment}> = ({ enrollment }) => {
  // const [courseName, setCourseName] = useState('Calculuay เรียนแล้วรวย')
  // const [subjectName, setSubjectName] = useState('Mathematics')
  // const [lessonList, setLessonList] = useState(['Calculus', 'Linear Algebra'])
  // const [courseDay, setCourseDay] = useState(['Monday', 'Wednesday'])
  // const [capacity, setCapacity] = useState(0)
  // const [maxCapacity, setMaxCapacity] = useState(0)
  // const [rating, setRating] = useState(0)
  // const [tutorName, setTutorName] = useState('Dr. Kommuay')

  const onClick = () => {
    console.log("Beam Ju Leck")
  }

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/CourseImage.png")}
          // resizeMode="contain"
          style={{
            height: "100%",
            width: "20%",
            marginRight: "3%",
          }}
        />
        <View style={{ marginVertical: "2%" , flexDirection: "column",}}>
          <Text>{enrollment.memberName}</Text>
          <Text>{enrollment.time}</Text>
        </View>

        <View style={{ margin: "2%" ,
            height: "70%",
            flexDirection: "row",
            backgroundColor: "red"
            }}>
            <Text style={{ color: "white"}}> Reject </Text>
        </View>

        <View style={{ margin: "2%" ,
            height: "70%",
            flexDirection: "row",
            backgroundColor: "green"
            }}>
            <Text style={{ color: "white"}}> Accept </Text>
        </View>
        
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 3,
    borderRadius: 10,
  },
})

export default EnrollmentCard