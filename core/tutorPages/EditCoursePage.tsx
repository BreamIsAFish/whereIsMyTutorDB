import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button } from "react-native-paper"

import MemberCard from "../components/MemberCard"
import EnrollmentCard from "../components/ErollmentCard"
import EditCourseInfo from "../components/EditCourseInfo"
import { Member, Enrollment } from "../interfaces/courseInterface"
import { AddCourseDto } from "../interfaces/dto"

const EditCoursePage = () => {
  // states //
  const [courseInfo, setCourseInfo] = useState<AddCourseDto>({
    courseName: "",
    subject: "",
    lesson: [],
    timeSlot: {},
    price: 0,
    capacity: 0,
    learningType: "Mixed",
    description: "",
    courseHour: 0,
    tutorUsername: "",
    createDate: new Date(),
  })
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
      time: "03/11/2021   06:37",
    }, // Just test example, can be delete
    {
      memberName: "Dr. Veeruay0",
      time: "03/11/2021   06:38",
    }, // Just test example, can be delete
    {
      memberName: "Dr. Veeruay1",
      time: "03/11/2021   06:39",
    }, // Just test example, can be delete
    {
      memberName: "Dr. Veeruay2",
      time: "03/11/2021   06:40",
    }, // Just test example, can be delete
    {
      memberName: "Dr. Veeruay3",
      time: "03/11/2021   06:41",
    }, // Just test example, can be delete
  ])

  const [pageState, setPageState] = useState<
    "Enrollment" | "Member" | "Information"
  >("Information")

  const navigation = useNavigation()

  // Other functions //
  const sendData = () => {
    console.log("Saving data...")

    navigation.goBack()
  }

  const goBack = () => {
    console.log("Bringing you back...")
    navigation.goBack()
  }

  const deleteCourse = () => {
    console.log("Deleting the course...")

    navigation.goBack()
  }

  return (
    <View style={styles.page}>
      {/* <Text style={{ textAlign: "center" }}>
        {"======== Info / Member / Enrollment ======="}
      </Text> */}
      <View style={styles.ChooseSection}>
        <TouchableOpacity
          style={{
            backgroundColor: pageState === "Information" ? "gray" : "white",
            borderColor: "gray",
            borderWidth: 2,
            borderBottomLeftRadius: 15,
            borderTopLeftRadius: 15,
            paddingHorizontal: "7%",
            paddingVertical: "2%",
            // marginRight: "20%",
          }}
          onPress={() => setPageState("Information")}
        >
          <Text>Information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: pageState === "Member" ? "gray" : "white",
            borderColor: "gray",
            borderWidth: 2,
            // borderBottomRightRadius: 15,
            // borderTopRightRadius: 15,
            paddingHorizontal: "7%",
            paddingVertical: "2%",
          }}
          onPress={() => setPageState("Member")}
        >
          <Text>Member</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: pageState === "Enrollment" ? "gray" : "white",
            borderColor: "gray",
            borderWidth: 2,
            borderBottomRightRadius: 15,
            borderTopRightRadius: 15,
            paddingHorizontal: "7%",
            paddingVertical: "2%",
          }}
          onPress={() => setPageState("Enrollment")}
        >
          <Text>Enrollment</Text>
        </TouchableOpacity>
      </View>

      {pageState == "Information" ? (
        <ScrollView>
          <EditCourseInfo
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            // onSave={sendData}
            // goBack={goBack}
            // deleteCourse={deleleCourse}
          />
          <View style={{ paddingHorizontal: "5%" }}>
            <Button
              mode="contained"
              color="dodgerblue"
              onPress={sendData}
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
            </Button>
          </View>
        </ScrollView>
      ) : null}

      {pageState == "Member" ? (
        <ScrollView style={styles.scrollSection}>
          {memberList.map((member, idx) => (
            <View key={idx} style={styles.card}>
              <MemberCard member={member} />
            </View>
          ))}
        </ScrollView>
      ) : null}

      {pageState == "Enrollment" ? (
        <ScrollView style={styles.scrollSection}>
          {enrollmentList.map((enrollment, idx) => (
            <View key={idx} style={styles.card}>
              <EnrollmentCard enrollment={enrollment} />
            </View>
          ))}
        </ScrollView>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    // paddingVertical: "10%",
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
    // backgroundColor: "gray"
  },
  scrollSection: {
    // marginTop: "5%",
    paddingHorizontal: "5%",
  },
  card: {
    marginBottom: "3%",
  },
  ChooseSection: {
    flexDirection: "row",
    justifyContent: "center",
    padding: "3%",
    width: "80%",
    marginHorizontal: "10%",
    // backgroundColor: "black",
  },
})

export default EditCoursePage
