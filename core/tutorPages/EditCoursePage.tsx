import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"

import MemberCard from "../components/MemberCard"
import EnrollmentCard from "../components/ErollmentCard"
import EditCourseInfo from "../components/EditCourseInfo"
import {
  Member,
  Enrollment,
  CourseInformations,
} from "../interfaces/courseInterface"

const EditCoursePage = () => {
  // states //
  const [courseInfo, setCourseInfo] = useState<CourseInformations>({
    courseImage: undefined,
    courseName: "",
    subjectName: "",
    lessonList: [],
    timeslots: {},
    price: 0,
    capacity: 0,
    learningType: "Mixed",
    description: "",
    courseHour: 0,
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
    "EnrollmentSection" | "MemberSection" | "ImformationSection"
  >("ImformationSection")

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

  const deleleCourse = () => {
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
            backgroundColor: "#E9E8FC",
          }}
          onPress={() => setPageState("ImformationSection")}
        >
          <Text
            style={{ color: "black", margin: "3%", paddingHorizontal: "2%" }}
          >
            Imformation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#E9E8FC",
          }}
          onPress={() => setPageState("MemberSection")}
        >
          <Text
            style={{ color: "black", margin: "3%", paddingHorizontal: "2%" }}
          >
            Member
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#E9E8FC",
          }}
          onPress={() => setPageState("EnrollmentSection")}
        >
          <Text
            style={{ color: "black", margin: "3%", paddingHorizontal: "2%" }}
          >
            Enrollment
          </Text>
        </TouchableOpacity>
      </View>

      {pageState == "ImformationSection" ? (
        <EditCourseInfo
          courseInfo={courseInfo}
          setCourseInfo={setCourseInfo}
          onSave={sendData}
          goBack={goBack}
          deleteCourse={deleleCourse}
        />
      ) : null}

      {pageState == "MemberSection" ? (
        <ScrollView style={styles.scrollSection}>
          {memberList.map((member, idx) => (
            <View key={idx} style={styles.card}>
              <MemberCard member={member} />
            </View>
          ))}
        </ScrollView>
      ) : null}

      {pageState == "EnrollmentSection" ? (
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
    paddingVertical: "10%",
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
    marginBottom: "5%",
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 3,
    borderRadius: 10,
  },
})

export default EditCoursePage
