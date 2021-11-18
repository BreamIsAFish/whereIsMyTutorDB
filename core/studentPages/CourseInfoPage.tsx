import React, { FC, useState } from "react"
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native"

import ViewCourseInfo from "../components/ViewCourseInfo"
import { CouseInformations, Review } from "../interfaces/courseInterface"

type Page = "Information" | "Review"

const CourseInfoPage: FC = () => {
  // states //
  const [page, setPage] = useState<Page>("Information")
  const [courseInfo, setCourseInfo] = useState<CouseInformations>({
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

  const changePage = (page: Page) => {
    console.log(`showing ${page}`)
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
      <ViewCourseInfo courseInfo={courseInfo} />
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
})

export default CourseInfoPage
