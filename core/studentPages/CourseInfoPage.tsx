import React, { FC, useState } from "react"
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { Button } from "react-native-paper"

import ViewCourseInfo from "../components/ViewCourseInfo"
import { CourseInformations, Review } from "../interfaces/courseInterface"

import ReviewCard from "../components/ReviewCard"

type Page = "Information" | "Review"

const CourseInfoPage: FC = () => {
  // states //
  const [page, setPage] = useState<Page>("Information")
  const [courseInfo, setCourseInfo] = useState<CourseInformations>({
    // courseImage?: string,
    courseName: "Caluluay เรียนแล้วรวย",
    subjectName: "Mathematics",
    lessonList: ["Calculus", "Linear Algebra"],
    timeslots: {
      Monday: [
        { start: "09:00", end: "10:00" },
        { start: "13:00", end: "15:00" },
      ],
      Wednesday: [{ start: "06:00", end: "18:00" }],
    },
    price: 6969,
    capacity: 69,
    learningType: "Mixed",
    description: "KUKUKUKUKUKUKUYYYYYYYYYY",
    courseHour: 13,
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

  // fetch //
  // const fetchData = () => {}

  const changePage = (page: Page) => {
    // console.log(`showing ${page}`)
    setPage(page)
  }

  const sendRegister = () => {
    console.log("Sending register...")
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
                color="dodgerblue"
                onPress={sendRegister}
              >
                Register Coruse
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
