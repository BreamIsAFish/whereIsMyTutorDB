import React, { FC } from "react"
import { ScrollView, Text, Image, View } from "react-native"
import { TextInput } from "react-native-paper"

import { CourseInformations } from "../interfaces/courseInterface"

interface EditCourseInfoProp {
  courseInfo: CourseInformations
  setCourseInfo: React.Dispatch<React.SetStateAction<CourseInformations>>
}

const EditCourseInfo: FC<EditCourseInfoProp> = ({
  courseInfo,
  setCourseInfo,
}) => {
  // const renderTimeSlot = () => (
  //   <ScrollView style={{ padding: "3%" }}>
  //     {Object.keys(courseInfo.timeslots).map((day) => {
  //       courseInfo.timeslots[day].map((slot, idx) => (
  //         <Text key={day + idx}>{`${day} | ${slot.start} : ${slot.end}`}</Text>
  //       ))
  //     })}
  //   </ScrollView>
  // )

  return (
    <ScrollView contentContainerStyle={{ width: "100%", height: "100%" }}>
      {/* {courseInfo.courseImage ? (
        <Image source={{}} />
      ) : (
        <Image source={require("../../assets/CourseImage.png")} />
      )} */}
      <View style={{ width: "100%" }}>
        {/* <Text>{`Course Name : ${courseInfo.courseName}`}</Text> */}
        <TextInput
          label="Course Name"
          value={courseInfo.courseName}
          autoComplete="off"
          onChangeText={(name) =>
            setCourseInfo({ ...courseInfo, courseName: name })
          }
        />
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
        {/* {renderTimeSlot()} */}
        <Text>{`Price : ${courseInfo.price}`}</Text>
        <Text>{`Capacity : ${courseInfo.capacity}`}</Text>
        <Text>{`Learning type : ${courseInfo.learningType}`}</Text>
        <Text>Description : </Text>
        <Text>{courseInfo.description}</Text>
        <Text>{`Amount of week : ${courseInfo.amountOfWeek}`}</Text>
      </View>
    </ScrollView>
  )
}

export default EditCourseInfo
