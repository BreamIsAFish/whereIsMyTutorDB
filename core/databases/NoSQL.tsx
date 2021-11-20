import React from "react"
import { useState } from "react"

import firebase from "./Firebase"
import { AddCourseDto, CourseInfoDto, SearchDto } from "../interfaces/dto"
import { TimeSlots } from "../interfaces/courseInterface"

const ref = firebase.firestore().collection("courses")

// const [data, setData] = useState([])
// const [keyword, setKeyword] = useState("")
// const [searchResult, setSearchResult] = useState([])

// const config = {
//   search: keyword, // -> courseName, tutorName, lessonList
//   subject: "Mathematics",
//   min: 0, // default is 0
//   max: -1, // “All” = -1
//   courseDay: "Weekend", // "Weekend", "Weekday", "Mixed"
//   learningType: "Online", //"Online", "Offline", "Mixed"
//   sortType: "Date", // “Date”, “Price”
//   isAscending: true,
// }

// useEffect(() => {
//   getCourse()
// }, [])

const getCourse = async (): Promise<CourseInfoDto[]> => {
  let courses: CourseInfoDto[] = []
  const querySnapShot = await ref.get()
  querySnapShot.forEach((res) => {
    const cinfo: CourseInfoDto = res.data() as CourseInfoDto
    cinfo.courseId = res.id
    courses.push(cinfo)
  })
  // ref.onSnapshot((querySnapShot) => {
  //   const courses: CourseInfoDto[] = []
  //   querySnapShot.forEach((res) => {
  //     const cinfo: CourseInfoDto = res.data() as CourseInfoDto
  //     cinfo.courseId = res.id
  //     courses.push(cinfo)
  //   })
  //   // setSearchResult(courses)
  //   // setData(courses)
  //   courseList = courses
  // })
  return courses
}

export const addCourse = async (courseInfo: AddCourseDto) => {
  // const ncourse = {
  //   courseName: "Calculus III",
  //   subject: "Mathematics",
  //   lesson: ["A"],
  //   price: 20000,
  //   learningType: "Online",
  //   tutorUsername: "Jack",
  //   timeSlot: {
  //     Monday: [{ start: "09:00", end: "12:00" }],
  //     Sunday: [{ start: "09:00", end: "12:00" }],
  //   },
  // }
  // const res = await ref.add(ncourse)
  const res = await ref.add(courseInfo)
  ref.doc(res.id).update({ courseId: res.id, createDate: new Date() })
  return res
}

export const searchCourse = async (
  config: SearchDto
): Promise<CourseInfoDto[]> => {
  // console.log(config.search);
  const courses: CourseInfoDto[] = await getCourse()
  // const order = config.isAscending ? "asc" : "desc"
  const result = courses.filter((course) => {
    return (
      (course.courseName.toLowerCase().includes(config.search) ||
        course.lesson.find((e) => e.toLowerCase().includes(config.search)) ||
        course.tutorUsername.toLowerCase().includes(config.search)) &&
      course.price >= config.min &&
      course.price <= (config.max == -1 ? Infinity : config.max) &&
      course.subject == config.subject &&
      course.learningType == config.learningType &&
      findCourseDay(course.timeSlot) == config.courseDay
    )
  })
  result.sort((a, b) => {
    const type = config.sortType
    const isAscending = config.isAscending
    if (type == "Price" && isAscending) {
      return a.price - b.price
    } else if (type == "Price" && !isAscending) {
      return b.price - a.price
    } else if (type == "Date" && isAscending) {
      return a.createDate.getMilliseconds() - b.createDate.getMilliseconds()
    } else if (type == "Date" && !isAscending) {
      return b.createDate.getMilliseconds() - a.createDate.getMilliseconds()
    }
    return a.price - b.price // Default
  })
  // setSearchResult(result)
  return result
}

const findCourseDay = (timeSlot: TimeSlots) => {
  // const timeSlot = { Sunday: [] };
  const weekEnd = ["Sunday", "Saturday"]
  const weekDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const day = Object.keys(timeSlot)
  if (
    day.some((d) => weekEnd.includes(d) && day.some((d) => weekDay.includes(d)))
  )
    return "Mixed"
  else if (
    day.some(
      (d) => !weekEnd.includes(d) && day.some((d) => weekDay.includes(d))
    )
  )
    return "Weekday"
  else if (
    day.some(
      (d) => weekEnd.includes(d) && day.some((d) => !weekDay.includes(d))
    )
  )
    return "Weekend"
}

// function updateCourse(courseId, courseInfo) {
//   const ncourse = {
//     courseName: "Calculus III",
//     subject: "Mathematics",
//     lesson: ["A"],
//     price: 20000,
//     learningType: "Online",
//     tutorUsername: "Jack",
//     timeSlot: {
//       Monday: [{ start: "09:00", end: "12:00" }],
//       Sunday: [{ start: "09:00", end: "12:00" }],
//     },
//   }
//   ref.doc(courseId).update(courseInfo)
// }

// function deleteCourse(id) {
//   ref.doc(id).delete()
// }
