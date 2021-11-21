import {
  EnrollmentDto,
  MemberDto,
  MinorCourseInfoDto,
  ReviewDto,
  StudentEnrollStatus,
} from "../interfaces/dto"

const link = "https://bff3-2001-fb1-9f-abca-bcf3-5df2-682d-fe72.ngrok.io"

export const getTutor = async (): Promise<{ tutorUsername: string }[]> => {
  var x: { tutorUsername: string }[] = []
  await fetch(`${link}/tutor`)
    .then((response) => response.json())
    .then((data) => (x = data))
    .catch(({ response }) => console.log(response))
  return x
}

export const getStudent = async () => {
  var x: { studentUsername: string }[] | null = null
  await fetch(`${link}/student`)
    .then((response) => response.json())
    .then((data) => (x = data))
    .catch(({ response }) => console.log(response))
  return x
}

// export const getCourseInfo = async (obj: {
//   tutorUsername: string
//   courseId: string
// }) => {
//   var x: MinorCourseInfoDto = {
//     courseId: "",
//     displayName: "",
//     numMember: 0,
//     rating: 0,
//   }
//   // console.log("21", obj)
//   await fetch(
//     `${link}/course/info?tutorUsername=${obj.tutorUsername}&courseId=${obj.courseId}`
//   )
//     .then((response) => response.json())
//     .then((data) => (x = data))
//     .catch(({ response }) => console.log(response))
//   return x
// }

export const getCourseInfo = async (
  l: {
    tutorUsername: string
    courseId: string
  }[]
): Promise<MinorCourseInfoDto[]> => {
  var x: MinorCourseInfoDto[] = []
  var tList: string[] = []
  var cList: string[] = []
  l.forEach((e) => {
    tList.push(e.tutorUsername)
    cList.push(e.courseId)
  })
  var tutorUsername = tList.join(",")
  var coursId = cList.join(",")
  // console.log(tutorUsername)
  // console.log(coursId)
  await fetch(
    `${link}/course/info?tutorUsername=${tutorUsername}&courseId=${coursId}`
  )
    .then((response) => response.json())
    .then((data) => (x = data))
    .catch(({ response }) => console.log(response))
  return x
}

export const getStudentStat = async (obj: {
  studentUsername: string
  courseId: string
}): Promise<StudentEnrollStatus> => {
  var x = null
  await fetch(
    `${link}/student/status?studentUsername=${obj.studentUsername}&courseId=${obj.courseId}`
  )
    .then((response) => response.json())
    .then((data) => (x = data))
    .catch(({ response }) => console.log(response))
  if (!x || (x as string[]).length == 0) return "NotEnroll"
  else if (x[0]["Verify_status"] == "Accept") return "Accepted"
  return "Waiting"
}

export const getReview = async (obj: {
  courseId: string
}): Promise<ReviewDto[]> => {
  var x: ReviewDto[] = []
  await fetch(`${link}/review?courseId=${obj.courseId}`)
    .then((response) => response.json())
    .then((data) => (x = data))
    .catch(({ response }) => console.log(response))
  return x
}

export const getMember = async (obj: {
  courseId: string
}): Promise<MemberDto[]> => {
  var x: MemberDto[] = []
  await fetch(`${link}/member?courseId=${obj.courseId}`)
    .then((response) => response.json())
    .then((data) => (x = data))
    .catch(({ response }) => console.log(response))
  return x
}
/*
export const getStudentEnrollment = async (sUsername) => {
    var x = null
	await fetch(`http://localhost:3000/enrollment/student?susername=${sUsername}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};
*/
export const getCourseEnrollment = async (obj: {
  courseId: string
}): Promise<EnrollmentDto[]> => {
  var x: EnrollmentDto[] = []
  await fetch(`${link}/enrollment/course?courseId=${obj.courseId}`)
    .then((response) => response.json())
    .then((data) => (x = data))
    .catch(({ response }) => console.log(response))
  return x
}

export const acceptEnrollment = async (obj: {
  enrollmentId: string
  accept: boolean
}) => {
  var x = null
  console.log(obj)
  await fetch(
    `${link}/enrollment/manage?enrollmentId=${obj.enrollmentId}&accept=${obj.accept}`
  )
    .then((response) => response.json())
    .then((data) => (x = data))
    .catch(({ response }) => console.log(response))
  return x
}

export const deleteCourseSQL = async (obj: { courseId: string }) => {
  var x = null
  await fetch(`${link}/course/delete?courseId=${obj.courseId}`)
    .then((response) => response.json())
    .then((data) => (x = data))
    .catch(({ response }) => console.log(response))
  return x
}

export const enroll = async (obj: {
  studentUsername: string
  courseId: string
}) => {
  // console.log(obj)
  var x = null
  await fetch(
    `${link}/enrollment/enroll?studentUsername=${obj.studentUsername}&courseId=${obj.courseId}`
  )
    .then((response) => response.json())
    .then((data) => (x = data))
    .catch(({ response }) => console.log(response))
  // console.log(x)
  return x
}

export const cancelEnrollment = async (obj: {
  studentUsername: string
  courseId: string
}) => {
  var x = null
  await fetch(
    `${link}/enrollment/cancel?studentUsername=${obj.studentUsername}&courseId=${obj.courseId}`
  )
    .then((response) => response.json())
    .then((data) => (x = data))
    .catch(({ response }) => console.log(response))
  return x
}

/*
export const isAlreadyEnroll = async (susername,cid) => {
    var x = null
	await fetch(`http://localhost:3000/enrollment/checkEnrolled?cid=${cid}&susername=${susername}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data[0]['count(*)'] == 0)
            x = false
        else
            x = true
    });
   return x
};
*/

// export const showUser = async () => {
//   var x = null
//   await fetch(`${link}/user/show`)
//     .then((response) => response.json())
//     .then((data) => (x = data))
//   return x
// }

// export const showEnroll = async () => {
//   var x = null
//   await fetch(`${link}/enroll/show`)
//     .then((response) => response.json())
//     .then((data) => (x = data))
//   return x
// }
// export const showEnrollment = async () => {
//   var x = null
//   await fetch(`${link}/enrollment/show`)
//     .then((response) => response.json())
//     .then((data) => (x = data))
//   return x
// }
// export const showReview = async () => {
//   var x = null
//   await fetch(`${link}/review/show`)
//     .then((response) => response.json())
//     .then((data) => (x = data))
//   return x
// }
// export const showMember = async () => {
//   var x = null
//   await fetch(`${link}/member/show`)
//     .then((response) => response.json())
//     .then((data) => (x = data))
//   return x
// }
// export const showTutor = async () => {
//   var x = null
//   await fetch(`${link}/tutor/show`)
//     .then((response) => response.json())
//     .then((data) => (x = data))
//   return x
// }
// export const showStudent = async () => {
//   var x = null
//   await fetch(`${link}/student/show`)
//     .then((response) => response.json())
//     .then((data) => (x = data))
//   return x
// }
