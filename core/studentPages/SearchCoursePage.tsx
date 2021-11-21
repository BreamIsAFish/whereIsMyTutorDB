import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
  Pressable,
} from "react-native"
import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native"
import { RadioButton, Divider } from "react-native-paper"

import CourseCard from "../components/CourseCard"
import { getCourseInfo } from "../databases/MySQL"
import { searchCourse } from "../databases/NoSQL"
import { Course, CourseDay, LearningType } from "../interfaces/courseInterface"
import { MinorCourseInfoDto } from "../interfaces/dto"

type PriceRate =
  | "All"
  | "0 - 500 Bath"
  | "500 - 1000 Bath"
  | "1000 - 2000 Bath"
  | "2000 - 3000 Bath"
  | "3000++ Bath"

type MinorCourseInfoList = { [courseId: string]: MinorCourseInfoDto }

const SearchCoursePage = () => {
  // States //
  const [courseList, setCourseList] = useState<Course[]>([
    {
      courseName: "Caluluay เรียนแล้วรวย",
      subjectName: "Mathematics",
      lessonList: ["Calculus", "Linear Algebra"],
      // courseDay: ["Monday", "Tuesday"],
      capacity: 13,
      maxCapacity: 69,
      rating: 3.6,
      tutorName: "Dr. Kommuay",
      courseId: "002",
      tutorUsername: "002",
    }, // Just test example, can be delete
  ])
  const [minorInfoList, setMinorInfoList] = useState<MinorCourseInfoList>({
    // "000": {
    //   courseId: "000",
    //   displayName: "",
    //   numMember: 0,
    //   rating: 0,
    // },
  })

  // Search States //
  const [search, setSearch] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [min, setMin] = useState<number>(0)
  const [max, setMax] = useState<number>(-1)
  const [courseDay, setCourseDay] = useState<CourseDay>("Mixed")
  const [learningType, setLearningType] = useState<LearningType>("Mixed")
  const [sortType, setSortType] = useState<"Price" | "Date">("Price")
  const [isAscending, setIsAscending] = useState<boolean>(true)
  const [priceRate, setPriceRate] = useState<PriceRate>("All")
  const [filterVisible, setFilterVisible] = useState<boolean>(false)

  const [refresh, setRefresh] = useState<boolean>(false)

  // useNavigation //
  const navigation = useNavigation()

  // useFocusEffect & useEffect //
  // useFocusEffect(
  //   React.useCallback(() => {
  //     ;(async () => {
  //       console.log("Fetching Courses")
  //       await fetchCourseList()
  //     })()
  //   }, [])
  // )
  // useEffect(() => {
  //   console.log("Fetching Courses")
  //   fetchCourseList()
  // }, [])

  useEffect(() => {
    ;(async () => {
      console.log("Fetching Courses")
      await fetchCourseList()
    })()
  }, [
    search,
    subject,
    min,
    max,
    courseDay,
    learningType,
    sortType,
    isAscending,
  ])

  useEffect(() => {
    ;(async () => {
      if (refresh) {
        // console.log(courseList)
        setRefresh(false)
        await fetchCourseMinorInfo()
      }
    })()
  }, [courseList])

  useEffect(() => {
    setCourseList(
      courseList.map((course) => ({
        ...course,
        tutorName: minorInfoList[course.courseId]
          ? minorInfoList[course.courseId].displayName
          : "",
        capacity: minorInfoList[course.courseId]
          ? minorInfoList[course.courseId].numMember
          : -1,
        rating: minorInfoList[course.courseId]
          ? minorInfoList[course.courseId].rating
          : -1,
      }))
    )
  }, [minorInfoList])

  // Fetch data //
  const fetchCourseList = async () => {
    // console.log({
    //   search,
    //   subject,
    //   min,
    //   max,
    //   courseDay,
    //   learningType,
    //   sortType,
    //   isAscending,
    // })
    const courses = await searchCourse({
      search,
      subject,
      min,
      max,
      courseDay,
      learningType,
      sortType,
      isAscending,
    })
    // console.log("got", courses)
    if (courses) {
      setRefresh(true)
      setCourseList(
        courses.map((course) => ({
          courseName: course.courseName,
          subjectName: course.subject,
          lessonList: course.lesson,
          // courseDay: Object.keys(course.timeSlot),
          maxCapacity: course.capacity,
          capacity: 0,
          rating: 0,
          tutorName: "",
          courseId: course.courseId,
          tutorUsername: course.tutorUsername,
        }))
      )
    }
  }

  const fetchCourseMinorInfo = async () => {
    let list: MinorCourseInfoList = {}
    if (courseList) {
      const minorInfo = await getCourseInfo(
        courseList.map((course) => ({
          tutorUsername: course.tutorUsername,
          courseId: course.courseId,
        }))
      )
      for (const info of minorInfo) {
        list[info.courseId] = info
      }
      setMinorInfoList(list)
    }
  }

  // Other functions //
  const redirectCourseInfo = (courseId: string) => {
    console.log("navigating to edit course page...")
    navigation.dispatch(
      CommonActions.navigate({
        name: "ViewCourseInfo",
        params: { courseId: courseId },
      })
    )
  }

  return (
    <View style={styles.page}>
      <View style={{ flexDirection: "column", marginHorizontal: 20 }}>
        <View style={{ flexDirection: "row", height: 40 }}>
          <TextInput
            style={styles.input}
            onChangeText={setSearch}
            value={search}
            placeholder="Search bar"
          />
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setFilterVisible(true)}
          >
            <Text style={styles.textStyle}>Add filter</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            style={{ backgroundColor: "gray", width: 50 }}
            onPress={() => setIsAscending(!isAscending)}
          >
            <Text style={styles.textStyle}>{isAscending ? "Asc" : "Des"}</Text>
          </Pressable>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="Sort by Price"
              status={sortType === "Price" ? "checked" : "unchecked"}
              onPress={() => setSortType("Price")}
            />
            <Text>Sort by Price</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "2%",
            }}
          >
            <RadioButton
              value="Sort by Date"
              status={sortType === "Date" ? "checked" : "unchecked"}
              onPress={() => setSortType("Date")}
            />
            <Text>Sort by Date</Text>
          </View>
        </View>
      </View>

      {/* </View> */}
      <ScrollView style={styles.scrollSection}>
        {courseList.map((course, idx) => (
          <View key={idx} style={styles.card}>
            <CourseCard
              course={course}
              onClick={() => redirectCourseInfo(course.courseId)}
            />
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.")
          setFilterVisible(!filterVisible)
        }}
      >
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Filter</Text>
              <Divider />
              <View style={{ width: 280, backgroundColor: "white" }}>
                <Divider />
                <Text>Subject:</Text>
                {/* <List.Accordion
                title={subject}
                style={{ padding: 0}}>
                {subjectList.map((subjectName, idx) => (
                  <List.Item style={{ paddingVertical: 0}} 
                    title={subjectName} 
                    onPress={() => setSubject(subjectName)}
                  />
                ))}
              </List.Accordion> */}
                <TextInput
                  style={styles.input}
                  onChangeText={setSubject}
                  value={subject}
                  placeholder="Key Your subject name?"
                />
                <Divider />
                <Text>Price Rate:</Text>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: 140,
                    }}
                  >
                    <RadioButton
                      value="value"
                      status={
                        priceRate === "0 - 500 Bath" ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        setPriceRate("0 - 500 Bath"), setMin(0), setMax(500)
                        // console.log("set min:", { min }, ", max:", { max })
                      }}
                    />
                    <Text>0 - 500 Bath</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: "2%",
                    }}
                  >
                    <RadioButton
                      value="value"
                      status={
                        priceRate === "500 - 1000 Bath"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => {
                        setPriceRate("500 - 1000 Bath"),
                          setMin(500),
                          setMax(1000)
                        // console.log("set min:", { min }, ", max:", { max })
                      }}
                    />
                    <Text>500 - 1000 Bath</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: 140,
                    }}
                  >
                    <RadioButton
                      value="value"
                      status={
                        priceRate === "1000 - 2000 Bath"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => {
                        setPriceRate("1000 - 2000 Bath"),
                          setMin(1000),
                          setMax(2000)
                        // console.log("set min:", { min }, ", max:", { max })
                      }}
                    />
                    <Text>1000 - 2000 Bath</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: "2%",
                    }}
                  >
                    <RadioButton
                      value="value"
                      status={
                        priceRate === "2000 - 3000 Bath"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => {
                        setPriceRate("2000 - 3000 Bath"),
                          setMin(2000),
                          setMax(3000)
                        // console.log("set min:", { min }, ", max:", { max })
                      }}
                    />
                    <Text>2000 - 3000 Bath</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: 140,
                    }}
                  >
                    <RadioButton
                      value="value"
                      status={
                        priceRate === "3000++ Bath" ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        setPriceRate("3000++ Bath"), setMin(3000), setMax(-1)
                        // console.log("set min:", { min }, ", max:", { max })
                      }}
                    />
                    <Text>3000++ Bath</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: "2%",
                    }}
                  >
                    <RadioButton
                      value="value"
                      status={priceRate === "All" ? "checked" : "unchecked"}
                      onPress={() => {
                        setPriceRate("All"), setMin(0), setMax(-1)
                        // console.log("set min:", { min }, ", max:", { max })
                      }}
                    />
                    <Text>All</Text>
                  </View>
                </View>

                <Text>Course Day:</Text>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: 90,
                    }}
                  >
                    <RadioButton
                      value="value"
                      status={courseDay === "Weekend" ? "checked" : "unchecked"}
                      onPress={() => setCourseDay("Weekend")}
                    />
                    <Text>Weekend</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: 90,
                      marginLeft: "2%",
                    }}
                  >
                    <RadioButton
                      value="value"
                      status={courseDay === "Weekday" ? "checked" : "unchecked"}
                      onPress={() => setCourseDay("Weekday")}
                    />
                    <Text>Weekday</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: "2%",
                    }}
                  >
                    <RadioButton
                      value="value"
                      status={courseDay === "Mixed" ? "checked" : "unchecked"}
                      onPress={() => setCourseDay("Mixed")}
                    />
                    <Text>Mixed</Text>
                  </View>
                </View>

                <Text>Learning Type:</Text>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: 90,
                    }}
                  >
                    <RadioButton
                      value="Online"
                      status={
                        learningType === "Online" ? "checked" : "unchecked"
                      }
                      onPress={() => setLearningType("Online")}
                    />
                    <Text>Online</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: 90,
                      marginLeft: "2%",
                    }}
                  >
                    <RadioButton
                      value="Offline"
                      status={
                        learningType === "Offline" ? "checked" : "unchecked"
                      }
                      onPress={() => setLearningType("Offline")}
                    />
                    <Text>Offline</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: "2%",
                    }}
                  >
                    <RadioButton
                      value="Mixed"
                      status={
                        learningType === "Mixed" ? "checked" : "unchecked"
                      }
                      onPress={() => setLearningType("Mixed")}
                    />
                    <Text>Mixed</Text>
                  </View>
                </View>

                <Divider />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "5%",
                }}
              >
                <Pressable
                  style={[styles.button, styles.buttonClearFilter]}
                  onPress={() => {
                    setCourseDay("Mixed"),
                      setPriceRate("All"),
                      setSubject(""),
                      setMin(0),
                      setMax(-1),
                      setLearningType("Mixed")
                    // console.log("set min:", { min }, ", max:", { max })
                  }}
                >
                  <Text style={styles.textStyle}>Clear</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonApplyFilter]}
                  onPress={() => setFilterVisible(!filterVisible)}
                >
                  <Text style={styles.textStyle}>Apply Filter</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingTop: "5%",
    height: "100%",
  },
  scrollSection: {
    marginTop: "5%",
    paddingHorizontal: "5%",
  },
  card: {
    marginBottom: "3%",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: "75%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonApplyFilter: {
    backgroundColor: "purple",
    width: 100,
  },
  buttonClearFilter: {
    backgroundColor: "gray",
    width: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
})

export default SearchCoursePage
