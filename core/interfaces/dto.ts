import {  CourseDay, LearningType, Slot, TimeSlots } from "./courseInterface";

export interface MinorCourseInfoDto {
  courseId: string
  displayName: string
  numMember: number
  rating: number
}

export interface AddCourseDto {
  tutorUsername: string
  courseName: string
  subject: string
  lesson: string[]
  timeSlot: {[day: string]: Slot[]}
  price: number
  capacity: number
  learningType: string
  description: string
  courseHour: number
	createDate: Date
}

export interface CourseInfoDto {
  capacity: number
  courseName: string
  courseHour: number
  description: string
  imageURL: string
  learningType: LearningType
  lesson: string[]
  price: number
  startDate: Date
  subject: string
  timeSlot: TimeSlots
  courseId: string
  tutorUsername: string
  createDate: Date
}

export interface SearchDto {
  search: string // -> courseName, tutorName, lessonList
  subject: string
  min: number // default is 0
  max: number // “All” = -1
  courseDay: CourseDay, // "Weekend", "Weekday", "Mixed"
  learningType: LearningType, //"Online", "Offline", "Mixed"
  sortType: "Date" | "Price", // “Date”, “Price”
  isAscending: boolean,
}

export interface ReviewDto {
  Review_id: string // key
  Cid: string
  Content: string
  Rating: number
  Susername: string
}

export interface UpdateCourseDto {
  courseId: string
  courseName: string
  subject: string
  lesson: string[]
  timeSlot: TimeSlots
  price: number
  capacity: number,
  learningType: LearningType,
  description: string,
  courseHour: number
}

export interface MemberDto {
  firstName: string
  lastName: string
}

export interface EnrollmentDto {
  enrollmentId : string
  studentUsername: string
  firstName: string
  lastName: string
}