import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity } from "react-native"

import MemberCard from "../components/MemberCard"

import { Member, Enrollment } from "../interfaces/courseInterface"
import EnrollmentCard from "../components/ErollmentCard"

const EditCoursePage = () => {
  // const [courseName, setCourseName] = useState()
  // const [subjectName, setSubjectName] = useState('Mathematics')
  // const [lessonList, setLessonList] = useState(['Calculus', 'Linear Algebra'])
  // const [courseDay, setCourseDay] = useState(['Monday', 'Wednesday'])
  // const [capacity, setCapacity] = useState(0)
  // const [maxCapacity, setMaxCapacity] = useState(0)
  // const [rating, setRating] = useState(0)
  // const [tutorName, setTutorName] = useState('Dr. Kommuay')
  const [memberList, setMemberList] = useState<Member[]>([
    {
      memberName: "Dr. Kommuay",
    }, // Just test example, can be delete
    {
      memberName: "Dr. Veeruay0",
    }, // Just test example, can be delete
    {
      memberName: "Dr. Veeruay1",
    }, // Just test example, can be delete
    {
      memberName: "Dr. Veeruay2",
    }, // Just test example, can be delete
    {
      memberName: "Dr. Veeruay3",
    }, // Just test example, can be delete
  ])

  const [enrollmentList, setEnrollmentList] = useState<Enrollment[]>([
    {
      memberName: "Dr. Kommuay",
      time: "03/11/2021   06:37"
    }, // Just test example, can be delete
    {
      memberName: "Dr. Veeruay0",
      time: "03/11/2021   06:38"
    }, // Just test example, can be delete
    {
      memberName: "Dr. Veeruay1",
      time: "03/11/2021   06:39"
    }, // Just test example, can be delete
    {
      memberName: "Dr. Veeruay2",
      time: "03/11/2021   06:40"
    }, // Just test example, can be delete
    {
      memberName: "Dr. Veeruay3",
      time: "03/11/2021   06:41"
    }, // Just test example, can be delete
  ])

  const [pageState, setPageState] = useState<string>("EnrollmentSection")


  return (
    <View style={styles.page}>
      {/* <Text style={{ textAlign: "center" }}>
        {"======== Info / Member / Enrollment ======="}
      </Text> */}
      <View style={styles.ChooseSection}>
        <TouchableOpacity style={{
            backgroundColor: "#E9E8FC",
            }}
            onPress={() => setPageState("ImformationSection")}>
            <Text style={{ color: "black", margin: "3%", paddingHorizontal: "2%",}}>Imformation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
            backgroundColor: "#E9E8FC",
            }}
            onPress={() => setPageState("MemberSection")}>
            <Text style={{ color: "black", margin: "3%" ,paddingHorizontal: "2%",}}>Member</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
            backgroundColor: "#E9E8FC",
            }}
            onPress={() => setPageState("EnrollmentSection")}>
            <Text style={{ color: "black", margin: "3%" ,paddingHorizontal: "2%",}}>Enrollment</Text>
        </TouchableOpacity>
      </View>

      {(pageState == "MemberSection") ?
      <ScrollView style={styles.scrollSection}>
      {memberList.map((member, idx) => (
        <View key={idx} style={styles.card}>
          <MemberCard member={member} />
        </View>
      ))}
      </ScrollView>
      :null}

      {(pageState == "EnrollmentSection") ?
      <ScrollView style={styles.scrollSection}>
      {enrollmentList.map((enrollment, idx) => (
        <View key={idx} style={styles.card}>
          <EnrollmentCard enrollment={enrollment} />
        </View>
      ))}
      </ScrollView>
      :null}

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
  ChooseSection: {
    marginLeft: "5%",
    marginRight: "5%",
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 3,
    borderRadius: 10,
  },
})

export default EditCoursePage
