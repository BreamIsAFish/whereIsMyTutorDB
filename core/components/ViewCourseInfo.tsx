import React, { FC, useState } from "react"
import { View, Text, ScrollView, Image } from "react-native"

import { CourseInfoDto } from "../interfaces/dto"

const ViewCourseInfo: FC<{ courseInfo: CourseInfoDto }> = ({ courseInfo }) => {
  // const [courseInfo, setCourseInfo] = useState<CouseInformations>()

  const renderTimeSlot = () => (
    <ScrollView style={{ padding: "3%" }}>
      {Object.keys(courseInfo.timeSlot).map((day) => {
        return courseInfo.timeSlot[day].map((slot, idx) => (
          <Text key={day + idx}>{`${day} | ${slot.start} : ${slot.end}`}</Text>
        ))
      })}
    </ScrollView>
  )

  return (
    <View>
      <View style={{ marginBottom: "5%" }}>
        {/* {courseInfo.courseImage ? (
          <Image source={{}} />
        ) : ( */}
        <Image source={require("../../assets/CourseImage.png")} />
        {/* )} */}
      </View>
      <View>
        <Text>{`Course Name : ${courseInfo.courseName}`}</Text>
        <Text>{`Subject : ${courseInfo.subject}`}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text>Lesson : </Text>
          {courseInfo.lesson.map((lesson, idx) => (
            <Text key={idx} style={{ marginRight: "2%" }}>
              {courseInfo.subject}
            </Text>
          ))}
        </View>
        <Text>Timeslots : </Text>
        {renderTimeSlot()}
        <Text>{`Price : ${courseInfo.price}`}</Text>
        <Text>{`Capacity : ${courseInfo.capacity}`}</Text>
        <Text>{`Learning type : ${courseInfo.learningType}`}</Text>
        <Text>Description : </Text>
        <Text>{courseInfo.description}</Text>
        <Text>{`Course Hour : ${courseInfo.courseHour}`}</Text>
      </View>
    </View>
  )
}

export default ViewCourseInfo
