import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Button } from "react-native-paper"

import MemberCard from "../components/MemberCard"
import EnrollmentCard from "../components/ErollmentCard"
import EditCourseInfo from "../components/EditCourseInfo"
import { EnrollmentDto, MemberDto, UpdateCourseDto } from "../interfaces/dto"
import { deleteCourse, getCourseById, updateCourse } from "../databases/NoSQL"
import { loadUsername } from "../util/AsyncStorage"
import { getCourseEnrollment, getMember } from "../databases/MySQL"

type PageState = "Enrollment" | "Member" | "Information"

const EditCoursePage = () => {
  // states //
  const [username, setUsername] = useState<string>()
  const [courseInfo, setCourseInfo] = useState<UpdateCourseDto>({
    courseName: "",
    subject: "",
    lesson: [],
    timeSlot: {},
    price: 0,
    capacity: 0,
    learningType: "Mixed",
    description: "",
    courseHour: 0,
    courseId: "",
  })
  const [memberList, setMemberList] = useState<MemberDto[]>([
    {
      firstName: "Dr. Kommuay",
      lastName: "HuaKee",
    }, // Just test example, can be delete
    {
      firstName: "Dr. Kommuay",
      lastName: "HuaKee",
    }, // Just test example, can be delete
  ])
  const [enrollmentList, setEnrollmentList] = useState<EnrollmentDto[]>([
    {
      enrollmentId: "",
      studentUsername: "",
      firstName: "",
      lastName: "",
    }, // Just test example, can be delete
  ])
  const [pageState, setPageState] = useState<PageState>("Information")

  // useNavigation & useRoute //
  const navigation = useNavigation()

  // useRoute //
  const route: RouteProp<{ params: { courseId: string } }, "params"> =
    useRoute()

  // useEffect //
  useEffect(() => {
    ;(async () => {
      await getTutorUsername()
      await getCourseInfo()
      console.log(route.params.courseId)
    })()
  }, [])

  // Fetch data //
  const getTutorUsername = async () => {
    const usr = await loadUsername()
    setUsername(usr[1])
  }

  const getCourseInfo = async () => {
    const info = await getCourseById(route.params.courseId)
    if (info) setCourseInfo(info)
  }

  const getCourseMember = async () => {
    const memberList = await getMember({ courseId: route.params.courseId })
    setMemberList(memberList)
  }

  const getEnrollment = async () => {
    const enrollments = await getCourseEnrollment({
      courseId: route.params.courseId,
    })
    setEnrollmentList(enrollments)
  }

  // Other functions //
  const sendData = () => {
    console.log("Saving data...")
    updateCourse(route.params.courseId, courseInfo)
    navigation.goBack()
  }

  const goBack = () => {
    console.log("Bringing you back...")
    navigation.goBack()
  }

  const handleChangePage = async (nextPage: PageState) => {
    if (nextPage === "Information") await getCourseInfo()
    else if (nextPage === "Member") await getCourseMember()
    else await getEnrollment()
    setPageState(nextPage)
  }

  const handleDelete = () => {
    console.log("Deleting the course...")
    deleteCourse(route.params.courseId)
    navigation.goBack()
  }

  return (
    <View style={styles.page}>
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
          onPress={() => handleChangePage("Information")}
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
          onPress={() => handleChangePage("Member")}
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
          onPress={() => handleChangePage("Enrollment")}
        >
          <Text>Enrollment</Text>
        </TouchableOpacity>
      </View>

      {pageState == "Information" ? (
        <ScrollView>
          <EditCourseInfo
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
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
            <Button mode="contained" color="tomato" onPress={handleDelete}>
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
              <EnrollmentCard enrollment={enrollment} update={getEnrollment} />
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
