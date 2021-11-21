import firebase from "./Firebase"

import {
  AddCourseDto,
  CourseInfoDto,
  SearchDto,
  UpdateCourseDto,
} from "../interfaces/dto"
import { TimeSlots } from "../interfaces/courseInterface"

const ref = firebase.firestore().collection("courses")

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
  const res = await ref.add(courseInfo)
  ref.doc(res.id).update({ courseId: res.id, createDate: new Date() })
  return res
}

export const searchCourse = async (
  config: SearchDto
): Promise<CourseInfoDto[]> => {
  const courses: CourseInfoDto[] = await getCourse()
  // const order = config.isAscending ? "asc" : "desc"
  const result = courses.filter((course) => {
    return (
      (course.courseName.toLowerCase().includes(config.search.toLowerCase()) ||
        course.lesson.find((e) =>
          e.toLowerCase().includes(config.search.toLowerCase())
        ) ||
        course.tutorUsername
          .toLowerCase()
          .includes(config.search.toLowerCase())) &&
      course.price >= config.min &&
      course.price <= (config.max === -1 ? Infinity : config.max) &&
      (config.subject === "" ? true : course.subject === config.subject) &&
      course.learningType === config.learningType &&
      findCourseDay(course.timeSlot) === config.courseDay
    )
  })
  // console.log(result)
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

export const getCourseById = async (
  courseId: string
): Promise<CourseInfoDto> => {
  const doc = await ref.doc(courseId).get()
  return doc.data() as CourseInfoDto
}

export const getCourseByTutor = async (
  tutorUsername: string
): Promise<CourseInfoDto[]> => {
  const courses: CourseInfoDto[] = []
  const snapshot = await ref.where("tutorUsername", "==", tutorUsername).get()
  snapshot.forEach((doc) => {
    courses.push(doc.data() as CourseInfoDto)
  })
  return courses
}

export const updateCourse = (courseId: string, courseInfo: UpdateCourseDto) => {
  ref.doc(courseId).update(courseInfo)
}

export const deleteCourse = (courseId: string) => {
  ref.doc(courseId).delete()
}
