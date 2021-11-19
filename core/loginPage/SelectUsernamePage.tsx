import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TextInput, Modal, Alert, Pressable, } from "react-native"
import { RadioButton, Divider, List, Provider } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown"

import CourseCard from "../components/CourseCard"
import { Course } from "../interfaces/courseInterface"


const SelectUsernamePage = () => {
  

  const studentUsernameList = [
    {
      label: "Student1",
      value: "Student1",
    },
    {
      label: "Student2",
      value: "Student2",
    },
    {
      label: "Student3",
      value: "Student3",
    },
    {
      label: "Student4",
      value: "Student4",
    },
    {
      label: "Student5",
      value: "Student5",
    },
  ];
  const tutorUsernameList = [
    {
      label: "Tutor1",
      value: "Tutor1",
    },
    {
      label: "Tutor2",
      value: "Tutor2",
    },
    {
      label: "Tutor3",
      value: "Tutor3",
    },
    {
      label: "Tutor4",
      value: "Tutor4",
    },
    {
      label: "Tutor5",
      value: "Tutor5",
    },
  ];
  const [activeStudentUsername, setActiveStudentUsername] = useState<string>("");
  const [activeTutorUsername, setActiveTutorUsername] = useState<string>("");
  const [showStudentUsernameDropDown, setShowStudentUsernameDropDown] = useState<boolean>(false);
  const [showTutorUsernameDropDown, setShowTutorUsernameDropDown] = useState<boolean>(false);
 

  return (
    <View style={styles.page}>
        <View style={{width:"90%" ,flexDirection: "row", marginTop:"10%"}}>
        <Provider >
            <DropDown
                label={"Student Username"}
                mode={"outlined"}
                visible={showStudentUsernameDropDown}
                showDropDown={() => {setShowStudentUsernameDropDown(true),console.log({activeStudentUsername})}}
                onDismiss={() => setShowStudentUsernameDropDown(false)}
                value={activeStudentUsername}
                setValue={setActiveStudentUsername}
                list={studentUsernameList}
                placeholder={"Select your Student Username"}
                dropDownStyle={{marginVertical: 50}}
                />
            <DropDown
                label={"Tutor Username"}
                mode={"outlined"}
                visible={showTutorUsernameDropDown}
                showDropDown={() => {setShowTutorUsernameDropDown(true),console.log({activeTutorUsername})}}
                onDismiss={() => setShowTutorUsernameDropDown(false)}
                value={activeStudentUsername}
                setValue={setActiveTutorUsername}
                list={tutorUsernameList}
                placeholder={"Select your Tutor Username"}
                />
        </Provider>
        </View>
    </View>
  )
}



const styles = StyleSheet.create({
  page: {
    paddingTop: "5%",
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
  },
})

export default SelectUsernamePage
