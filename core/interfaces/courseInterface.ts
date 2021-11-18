export interface Course {
  courseName: string
  subjectName: string
  lessonList: string[]
  courseDay: string[]
  capacity: number
  maxCapacity: number
  rating?: number
  tutorName?: string
}

export interface CouseInformations {
  courseImage?: string
  courseName: string
  subjectName: string
  lessonList: string[]
  timeslots: {[day: string]: Slot[]}
  price: number
  capacity: number // max student
  learningType: LearningType
  description: string
  amountOfWeek: number
}

export interface Slot {
  start: string // "09:00"
  end: string
}

export type LearningType = "Offline" | "Online" | "Mixed"

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