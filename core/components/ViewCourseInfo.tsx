import React, { FC, useState } from "react"
import { View, Text, ScrollView, Image } from "react-native"

import { CourseInformations } from "../interfaces/courseInterface"

const ViewCourseInfo: FC<{ courseInfo: CourseInformations }> = ({
  courseInfo,
}) => {
  // const [courseInfo, setCourseInfo] = useState<CouseInformations>()

  const renderTimeSlot = () => (
    <ScrollView style={{ padding: "3%" }}>
      {Object.keys(courseInfo.timeslots).map((day) => {
        return courseInfo.timeslots[day].map((slot, idx) => (
          <Text key={day + idx}>{`${day} | ${slot.start} : ${slot.end}`}</Text>
        ))
      })}
    </ScrollView>
  )

  return (
    <View>
      <View style={{ marginBottom: "5%" }}>
        {courseInfo.courseImage ? (
          <Image source={{}} />
        ) : (
          <Image source={require("../../assets/CourseImage.png")} />
        )}
      </View>
      <View>
        <Text>{`Course Name : ${courseInfo.courseName}`}</Text>
        <Text>{`Subject : ${courseInfo.subjectName}`}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text>Lesson : </Text>
          {courseInfo.lessonList.map((lesson, idx) => (
            <Text key={idx} style={{ marginRight: "2%" }}>
              {courseInfo.subjectName}
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
