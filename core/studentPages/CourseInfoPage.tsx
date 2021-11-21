import React, { FC, useState, useEffect } from "react"
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { Button } from "react-native-paper"
import { useRoute, RouteProp } from "@react-navigation/native"

import ViewCourseInfo from "../components/ViewCourseInfo"
import { CourseInformations, Review } from "../interfaces/courseInterface"
import {
  cancelEnrollment,
  enroll,
  getReview,
  getStudentStat,
} from "../databases/MySQL"
import ReviewCard from "../components/ReviewCard"
import { loadUsername } from "../util/AsyncStorage"
import { CourseInfoDto } from "../interfaces/dto"
import { getCourseById } from "../databases/NoSQL"

type Page = "Information" | "Review"
type RegisterStatus = "NotEnroll" | "Waiting" | "Accepted"

const CourseInfoPage: FC = () => {
  // states //
  const [username, setUsername] = useState<string>("")

  const [page, setPage] = useState<Page>("Information")
  const [gotInfo, setGotInfo] = useState<boolean>(false)
  const [gotUserename, setGotUsername] = useState<boolean>(false)
  const [registerStatus, setRegisterStatus] =
    useState<RegisterStatus>("NotEnroll")
  const [courseInfo, setCourseInfo] = useState<CourseInfoDto>({
    capacity: 0,
    courseName: "",
    courseHour: 0,
    description: "",
    imageURL: "",
    learningType: "Mixed",
    lesson: [],
    price: 0,
    startDate: new Date(),
    subject: "",
    timeSlot: {},
    courseId: "",
    tutorUsername: "",
    createDate: new Date(),
  })
  const [reviewList, setReviewList] = useState<Review[]>([
    {
      reviwerName: "Veerin",
      rating: 4.5,
      comment: "good but not job",
    }, // Just test example, can be delete
    {
      reviwerName: "Komsorn",
      rating: 4,
      comment: "not good but not job",
    }, // Just test example, can be delete
  ])

  // useRoute //
  const route: RouteProp<{ params: { courseId: string } }, "params"> =
    useRoute()

  // useEffect //
  useEffect(() => {
    ;(async () => {
      await getStudentUsername()
      await fetchInfo()
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (gotUserename && gotInfo) await getStudentStatus()
    })()
  }, [gotUserename, gotInfo])

  useEffect(() => {
    ;(async () => {
      if (page === "Review") await fetchReview()
      else await fetchInfo()
    })()
  }, [page])

  // fetch //
  const getStudentUsername = async () => {
    const usr = await loadUsername()
    setUsername(usr[0])
    setGotUsername(true)
  }

  const getStudentStatus = async () => {
    const status = await getStudentStat({
      studentUsername: username,
      courseId: courseInfo.courseId,
    })
    setRegisterStatus(status)
  }

  const fetchInfo = async () => {
    console.log("fetching info...")
    const info = await getCourseById(route.params.courseId)
    setCourseInfo(info)
    setGotInfo(true)
  }

  const fetchReview = async () => {
    console.log("fetching reviews...")
    const reviews = await getReview({ courseId: courseInfo.courseId })
    setReviewList(
      reviews.map((review) => ({
        comment: review.Content,
        rating: review.Rating,
        reviwerName: review.Susername,
      }))
    )
  }

  // Other functions //
  const changePage = (page: Page) => {
    setPage(page)
  }

  const handleButton = () => {
    if (registerStatus === "NotEnroll") {
      enroll({ studentUsername: username, courseId: courseInfo.courseId })
      setRegisterStatus("Waiting")
    } else if (registerStatus === "Waiting") {
      cancelEnrollment({
        studentUsername: username,
        courseId: courseInfo.courseId,
      })
      setRegisterStatus("NotEnroll")
    }
  }

  return (
    <View style={{ paddingVertical: "3%", alignItems: "center" }}>
      <View style={styles.button}>
        <TouchableOpacity
          style={{
            backgroundColor: page === "Information" ? "gray" : "white",
            borderColor: "gray",
            borderWidth: 2,
            borderBottomLeftRadius: 15,
            borderTopLeftRadius: 15,
            paddingHorizontal: "10%",
            paddingVertical: "2%",
            // marginRight: "20%",
          }}
          onPress={() => changePage("Information")}
        >
          <Text>Information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: page === "Review" ? "gray" : "white",
            borderColor: "gray",
            borderWidth: 2,
            borderBottomRightRadius: 15,
            borderTopRightRadius: 15,
            paddingHorizontal: "10%",
            paddingVertical: "2%",
          }}
          onPress={() => changePage("Review")}
        >
          <Text>Review</Text>
        </TouchableOpacity>
      </View>
      {page === "Information" ? (
        <View style={styles.page}>
          <ScrollView contentContainerStyle={styles.scrollSection}>
            <View style={{ marginBottom: "10%" }}>
              <ViewCourseInfo courseInfo={courseInfo} />
            </View>
            <View>
              <Button
                mode="contained"
                color={
                  registerStatus === "NotEnroll"
                    ? "dodgerblue"
                    : registerStatus === "Waiting"
                    ? "gold"
                    : "gray"
                }
                onPress={handleButton}
              >
                {registerStatus === "NotEnroll"
                  ? "Enroll Course"
                  : registerStatus === "Waiting"
                  ? "Cancel Enrollment"
                  : "Enrollment Completed"}
              </Button>
            </View>
          </ScrollView>
        </View>
      ) : (
        // </View>
        <View style={styles.page}>
          <ScrollView contentContainerStyle={styles.scrollSection}>
            {reviewList.map((review, idx) => (
              <View key={idx} style={styles.card}>
                <ReviewCard review={review} />
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
  // Showing course information page //
  // if (page === "Information") {
  //   return <ViewCourseInfo courseInfo={courseInfo} />
  // }

  // Showing review page //
  // return <></>
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    padding: "3%",
    width: "80%",
  },
  page: {
    // paddingTop: "10%",
    height: "100%",
  },
  scrollSection: {
    marginTop: "5%",
    paddingHorizontal: "5%",
  },
  card: {
    marginBottom: "3%",
  },
})

export default CourseInfoPage
