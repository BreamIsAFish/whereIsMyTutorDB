export interface Course {
  courseName: string
  subjectName: string
  lessonList: string[]
  // courseDay: string[]
  capacity: number
  maxCapacity: number
  rating: number
  tutorName: string
  courseId: string
  tutorUsername: string
}

export interface CourseInformations {
  courseImage?: string
  courseName: string
  subjectName: string
  lessonList: string[]
  timeslots: TimeSlots
  price: number
  capacity: number // max student
  learningType: LearningType
  description: string
  courseHour: number
}

export interface Slot {
  start: string // "09:00"
  end: string
}

export type LearningType = "Offline" | "Online" | "Mixed"

export type CourseDay = "Weekend"|"Weekday"|"Mixed"

export type TimeSlots = {[day: string]: Slot[]}

export interface Review {
  reviwerName: string
  rating: number
  comment: string
}

export interface Member {
  memberName: string
}

export interface Enrollment {
  memberName: string
  time: string
}