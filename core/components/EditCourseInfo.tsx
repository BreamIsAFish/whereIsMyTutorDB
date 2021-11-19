import React, { FC, useState, useEffect } from "react"
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { TextInput, Button, RadioButton, Provider } from "react-native-paper"
import DropDown from "react-native-paper-dropdown"

import {
  CourseInformations,
  LearningType,
  Slot,
} from "../interfaces/courseInterface"

interface EditCourseInfoProp {
  courseInfo: CourseInformations
  setCourseInfo: React.Dispatch<React.SetStateAction<CourseInformations>>
  // onSave: () => void
  // goBack: () => void
  // deleteCourse: () => void
}

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"

const EditCourseInfo: FC<EditCourseInfoProp> = ({
  courseInfo,
  setCourseInfo,
  // onSave,
  // goBack,
  // deleteCourse,
}) => {
  // States //
  const [lessonInput, setLessonInput] = useState<string>("")
  const [selectDay, setSelectDay] = useState<Day>("Monday")
  const [startHour, setStartHour] = useState<number>(0)
  const [startMin, setStartMin] = useState<number>(0)
  const [endHour, setEndHour] = useState<number>(1)
  const [endMin, setEndMin] = useState<number>(0)
  const [showDropDown, setShowDropDown] = useState<boolean>(false)

  const dayList = [
    { label: "MON", value: "Monday" },
    { label: "TUE", value: "Tuesday" },
    { label: "WED", value: "Wednesday" },
    { label: "THU", value: "Thursday" },
    { label: "FRI", value: "Friday" },
    { label: "SAT", value: "Saturday" },
    { label: "SUN", value: "Sunday" },
  ]

  // Other functions //
  const addSlot = () => {
    const start =
      `${startHour}`.padStart(2, "0") + `:` + `${startMin}`.padStart(2, "0")
    const end =
      `${endHour}`.padStart(2, "0") + `:` + `${endMin}`.padStart(2, "0")
    const newSlot = { start, end }
    const newTimeSlot = {
      ...courseInfo.timeslots,
      [selectDay]: courseInfo.timeslots[selectDay]
        ? [...courseInfo.timeslots[selectDay], newSlot]
        : [newSlot],
    }
    setCourseInfo({ ...courseInfo, timeslots: newTimeSlot })
  }

  const removeSlot = (day: string, delSlot: Slot) => {
    const newTimeSlot = {
      ...courseInfo.timeslots,
      [day]: courseInfo.timeslots[day].filter((slot) => slot !== delSlot),
    }
    setCourseInfo({ ...courseInfo, timeslots: newTimeSlot })
  }

  const renderTimeSlot = () => (
    <View
      style={{
        padding: "5%",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: "5%",
      }}
    >
      <Text style={{ marginBottom: "3%" }}>Add New Timeslots :</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "3%",
        }}
      >
        <DropDown
          label={"Day"}
          mode={"outlined"}
          value={selectDay}
          setValue={setSelectDay}
          list={dayList}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          inputProps={{
            right: <TextInput.Icon name={"menu-down"} />,
          }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            value={startHour.toString()}
            keyboardType="numeric"
            autoComplete
            autoCorrect={false}
            onChangeText={(hour) => setStartHour(hour ? parseInt(hour) : 0)}
          />
          <TextInput
            value={startMin.toString()}
            keyboardType="numeric"
            autoComplete
            autoCorrect={false}
            onChangeText={(min) => setStartMin(min ? parseInt(min) : 0)}
          />
          <Text> - </Text>
          <TextInput
            value={endHour.toString()}
            keyboardType="numeric"
            autoComplete
            autoCorrect={false}
            onChangeText={(hour) => setEndHour(hour ? parseInt(hour) : 0)}
          />
          <TextInput
            value={endMin.toString()}
            keyboardType="numeric"
            autoComplete
            autoCorrect={false}
            onChangeText={(min) => setEndMin(min ? parseInt(min) : 0)}
          />
        </View>
        <View>
          <Button mode="contained" color="limegreen" onPress={addSlot}>
            Add
          </Button>
        </View>
      </View>
      <Text style={{ marginBottom: "3%" }}>Your Timeslots :</Text>
      <View>
        {Object.keys(courseInfo.timeslots).map((day) => {
          return courseInfo.timeslots[day].map((slot, idx) => (
            // <Text key={day + idx}>{`${day} | ${slot.start} : ${slot.end}`}</Text>
            <TouchableOpacity
              key={day + idx}
              style={{
                marginBottom: "2%",
                paddingVertical: "5%",
                paddingHorizontal: "3%",
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "gray",
              }}
              onPress={() => removeSlot(day, slot)}
            >
              {/* <View key={day + idx} style={{flexDirection: "row", marginBottom: "2%"}}> */}
              <Text>{`${day} | ${slot.start} - ${slot.end}`}</Text>
              {/* </View> */}
            </TouchableOpacity>
          ))
        })}
      </View>
    </View>
  )

  const removeLesson = (lessonName: string) => {
    setCourseInfo({
      ...courseInfo,
      lessonList: courseInfo.lessonList.filter(
        (lesson) => lesson !== lessonName
      ),
    })
  }

  const addLesson = () => {
    if (lessonInput !== "") {
      setCourseInfo({
        ...courseInfo,
        lessonList: [...courseInfo.lessonList, lessonInput],
      })
      setLessonInput("")
    }
  }

  return (
    <Provider>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: "5%",
          marginBottom: "5%",
        }}
      >
        {/* {courseInfo.courseImage ? (
        <Image source={{}} />
      ) : (
        <Image source={require("../../assets/CourseImage.png")} />
      )} */}

        {/* Course Name */}
        <TextInput
          label="Course Name"
          value={courseInfo.courseName}
          autoComplete
          autoCorrect={false}
          style={styles.input}
          onChangeText={(name) =>
            setCourseInfo({ ...courseInfo, courseName: name })
          }
        />

        {/* Subject */}
        <TextInput
          label="Subject"
          value={courseInfo.subjectName}
          autoComplete
          autoCorrect={false}
          style={styles.input}
          onChangeText={(subject) =>
            setCourseInfo({ ...courseInfo, subjectName: subject })
          }
        />

        {/* Lesson */}
        <Text style={{ marginBottom: "2%" }}>Lesson :</Text>
        <View style={{ flexDirection: "row" }}>
          {courseInfo.lessonList.map((lesson, idx) => (
            <TouchableOpacity
              key={idx}
              style={{
                backgroundColor: "mediumturquoise",
                paddingHorizontal: "5%",
                paddingVertical: "2%",
                marginRight: "2%",
                marginBottom: "2%",
                borderRadius: 15,
              }}
              onPress={() => removeLesson(lesson)}
            >
              <Text>{lesson}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            label="Lesson"
            value={lessonInput}
            autoComplete
            autoCorrect={false}
            style={[styles.input, { width: "76%", marginRight: "3%" }]}
            onChangeText={(lessonName) => setLessonInput(lessonName)}
          />
          <View style={{ justifyContent: "center" }}>
            <Button mode="contained" onPress={addLesson}>
              Add
            </Button>
          </View>
        </View>

        {/* TimeSlots */}
        <Text style={{ marginBottom: "2%" }}>Timeslots : </Text>
        {renderTimeSlot()}

        {/* Price */}
        <TextInput
          label="Price"
          value={courseInfo.price.toString()}
          keyboardType="numeric"
          autoComplete
          autoCorrect={false}
          style={styles.input}
          onChangeText={(price) =>
            setCourseInfo({ ...courseInfo, price: price ? parseInt(price) : 0 })
          }
        />

        {/* Capacity */}
        <TextInput
          label="Capacity"
          value={courseInfo.capacity.toString()}
          keyboardType="numeric"
          autoComplete
          autoCorrect={false}
          style={styles.input}
          onChangeText={(cap) =>
            setCourseInfo({ ...courseInfo, capacity: cap ? parseInt(cap) : 0 })
          }
        />

        {/* Learning Type */}
        <Text style={{ marginBottom: "2%" }}>Learning type :</Text>
        <View
          style={[
            styles.input,
            { borderColor: "gray", borderWidth: 1, borderRadius: 10 },
          ]}
        >
          <RadioButton.Group
            onValueChange={(value) =>
              setCourseInfo({
                ...courseInfo,
                learningType: value as LearningType,
              })
            }
            value={courseInfo.learningType}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RadioButton value="Online" />
              <Text>First</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="Offline" />
              <Text>Second</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="Mixed" />
              <Text>Mixed</Text>
            </View>
          </RadioButton.Group>
        </View>

        {/* Description */}
        <TextInput
          label="Description"
          value={courseInfo.description}
          autoComplete
          autoCorrect={false}
          style={styles.input}
          onChangeText={(desc) =>
            setCourseInfo({ ...courseInfo, description: desc })
          }
        />

        {/* Course Hour */}
        <TextInput
          label="Total Course Hour"
          value={courseInfo.courseHour.toString()}
          keyboardType="numeric"
          autoComplete
          autoCorrect={false}
          style={styles.input}
          onChangeText={(hour) =>
            setCourseInfo({
              ...courseInfo,
              courseHour: hour ? parseInt(hour) : 0,
            })
          }
        />
        {/* <View style={{ justifyContent: "center" }}> */}
        {/* <Button
          mode="contained"
          color="dodgerblue"
          onPress={onSave}
          style={{ marginBottom: "3%" }}
        >
          Save Changes
        </Button>
        <Button
          mode="contained"
          color="gold"
          onPress={goBack}
          style={{ marginBottom: "8%" }}
        >
          Cancel
        </Button>
        <Button mode="contained" color="tomato" onPress={deleteCourse}>
          Delete Course
        </Button> */}
        {/* </View> */}
      </ScrollView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  input: { marginBottom: "5%", paddingVertical: 0 },
})

export default EditCourseInfo
