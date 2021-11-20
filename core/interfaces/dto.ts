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
	createDate: string
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