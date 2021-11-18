<<<<<<< refs/remotes/origin/main
import React, { FC, useState } from "react"
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native"

import ViewCourseInfo from "../components/ViewCourseInfo"
import { CourseInformations, Review } from "../interfaces/courseInterface"

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
    amountOfWeek: 13,
  })
  const [reviewList, setReviewList] = useState<Review[]>([])

  // fetch //
  // const fetchData = () => {}

  const changePage = (page: Page) => {
    // console.log(`showing ${page}`)
    setPage(page)
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
        <ViewCourseInfo courseInfo={courseInfo} />
      ) : (
        <>
          <Text>@Pon put the review here</Text>
        </>
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
=======
import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"

import ReviewCard from "../components/ReviewCard"
import { Review } from "../interfaces/courseInterface"

const CourseInfoPage = () => {
  // const [courseName, setCourseName] = useState()
  // const [subjectName, setSubjectName] = useState('Mathematics')
  // const [lessonList, setLessonList] = useState(['Calculus', 'Linear Algebra'])
  // const [courseDay, setCourseDay] = useState(['Monday', 'Wednesday'])
  // const [capacity, setCapacity] = useState(0)
  // const [maxCapacity, setMaxCapacity] = useState(0)
  // const [rating, setRating] = useState(0)
  // const [tutorName, setTutorName] = useState('Dr. Kommuay')
  const [reviewList, setReviewList] = useState<Review[]>([
    {
        studentName: "Veerin",
        rating: 4.5,
        description: "good but not job",
    }, // Just test example, can be delete
    {
        studentName: "Komsorn",
        rating: 4.0,
        description: "no good but not job",
    }, // Just test example, can be delete
    {
        studentName: "Ruttasate",
        rating: 4.7,
        description: "hey that's pretty good",
    }, // Just test example, can be delete
  ])

  return (
    <View style={styles.page}>
      <Text style={{ textAlign: "center" }}>
        {"======== Course info ======="}
      </Text>
      {/* </View> */}
      <ScrollView style={styles.scrollSection}>
        {reviewList.map((review, idx) => (
          <View key={idx} style={styles.card}>
            <ReviewCard review={review} />
          </View>
        ))}
      </ScrollView>
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
>>>>>>> Auto stash before rebase of "origin/main"
  },
})

export default CourseInfoPage
