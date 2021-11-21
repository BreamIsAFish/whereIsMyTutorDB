import React, { useState, useEffect, useCallback } from "react"
import { View, StyleSheet } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { Provider } from "react-native-paper"
import DropDown from "react-native-paper-dropdown"

import { loadUsername, saveUsername } from "../util/AsyncStorage"
import { getStudent, getTutor } from "../databases/MySQL"

const SelectUsernamePage = () => {
  // States //
  const [activeStudentUsername, setActiveStudentUsername] = useState<string>("")
  const [activeTutorUsername, setActiveTutorUsername] = useState<string>("")
  const [showStudentUsernameDropDown, setShowStudentUsernameDropDown] =
    useState<boolean>(false)
  const [showTutorUsernameDropDown, setShowTutorUsernameDropDown] =
    useState<boolean>(false)

  const [studentUsernameList, setStudentUsernameList] = useState<
    { studentUsername: string }[]
  >([])
  const [tutorUsernameList, setTutorUsernameList] = useState<
    { tutorUsername: string }[]
  >([])

  // const { getItem, setItem } = useAsyncStorage("@username")

  // useEffects //
  useFocusEffect(
    useCallback(() => {
      ;(async () => {
        console.log("Loding all username...")
        await fetchData()
      })()
    }, [])
  )

  useEffect(() => {
    ;(async () => {
      const [sUsername, tUsername] = await loadUsername()
      if (
        sUsername.length !== 0 &&
        tUsername.length !== 0
        //  &&
        // studentUsernameList.includes({ studentUsername: sUsername }) &&
        // tutorUsernameList.includes({ tutorUsername: tUsername })
      ) {
        // console.log("I'm in")
        setActiveStudentUsername(sUsername)
        setActiveTutorUsername(tUsername)
      } else if (studentUsernameList[0] && tutorUsernameList[0]) {
        // console.log("I'm out")
        setActiveStudentUsername(studentUsernameList[0].studentUsername)
        setActiveTutorUsername(tutorUsernameList[0].tutorUsername)
      }
    })()
  }, [studentUsernameList, tutorUsernameList])

  useEffect(() => {
    ;(async () => {
      if (activeStudentUsername !== "" && activeTutorUsername !== "")
        await saveUsername(activeStudentUsername, activeTutorUsername)
      console.log(
        `Saving username: ${activeStudentUsername}, ${activeTutorUsername}`
      )
    })()
  }, [activeStudentUsername, activeTutorUsername])

  // Other functions //
  const fetchData = async () => {
    const tUsernameList = await getTutor()
    const sUsernameList = await getStudent()
    // console.log(tUsernameList)
    // console.log(sUsernameList)
    if (tUsernameList && sUsernameList) {
      setTutorUsernameList(tUsernameList)
      setStudentUsernameList(sUsernameList)
    } else {
      setTutorUsernameList([])
      setStudentUsernameList([])
    }
  }

  return (
    <View style={styles.page}>
      <View style={{ width: "90%", flexDirection: "row", marginTop: "10%" }}>
        <Provider>
          <View style={{ marginBottom: "10%" }}>
            <DropDown
              label={"Student Username"}
              mode={"outlined"}
              visible={showStudentUsernameDropDown}
              showDropDown={() => {
                setShowStudentUsernameDropDown(true),
                  console.log({ activeStudentUsername })
              }}
              onDismiss={() => setShowStudentUsernameDropDown(false)}
              value={activeStudentUsername}
              setValue={setActiveStudentUsername}
              list={studentUsernameList.map(({ studentUsername }) => ({
                label: studentUsername,
                value: studentUsername,
              }))}
              placeholder={"Select your Student Username"}
              // dropDownStyle={{ marginVertical: "10%" }}
            />
          </View>
          <View>
            <DropDown
              label={"Tutor Username"}
              mode={"outlined"}
              visible={showTutorUsernameDropDown}
              showDropDown={() => {
                setShowTutorUsernameDropDown(true),
                  console.log({ activeTutorUsername })
              }}
              onDismiss={() => setShowTutorUsernameDropDown(false)}
              value={activeTutorUsername}
              setValue={setActiveTutorUsername}
              list={tutorUsernameList.map(({ tutorUsername }) => ({
                label: tutorUsername,
                value: tutorUsername,
              }))}
              placeholder={"Select your Tutor Username"}
            />
          </View>
        </Provider>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingTop: "5%",
    // height: "100%",
    // justifyContent: "center",
    alignItems: "center",
  },
})

export default SelectUsernamePage
