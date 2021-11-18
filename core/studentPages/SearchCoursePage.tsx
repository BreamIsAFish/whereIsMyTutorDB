import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TextInput, Modal, Alert, Pressable, } from "react-native"
import { RadioButton } from 'react-native-paper';

import CourseCard from "../components/CourseCard"
import { Course } from "../interfaces/courseInterface"

const SearchCoursePage = () => {
  // const [courseName, setCourseName] = useState()
  // const [subjectName, setSubjectName] = useState('Mathematics')
  // const [lessonList, setLessonList] = useState(['Calculus', 'Linear Algebra'])
  // const [courseDay, setCourseDay] = useState(['Monday', 'Wednesday'])
  // const [capacity, setCapacity] = useState(0)
  // const [maxCapacity, setMaxCapacity] = useState(0)
  // const [rating, setRating] = useState(0)
  // const [tutorName, setTutorName] = useState('Dr. Kommuay')
  const [courseList, setCourseList] = useState<Course[]>([
    {
      courseName: "Caluluay เรียนแล้วรวย",
      subjectName: "Mathematics",
      lessonList: ["Calculus", "Linear Algebra"],
      courseDay: ["Monday", "Tuesday"],
      capacity: 13,
      maxCapacity: 69,
      rating: 3.6,
      tutorName: "Dr. Kommuay",
    }, // Just test example, can be delete
    {
      courseName: "Caluluay เรียนแล้วรวย",
      subjectName: "Mathematics",
      lessonList: ["Calculus", "Linear Algebra"],
      courseDay: ["Monday", "Tuesday"],
      capacity: 13,
      maxCapacity: 69,
      rating: 3.6,
      tutorName: "Dr. Kommuay",
    }, // Just test example, can be delete
  ])
  const [text, onChangeText] = React.useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortType, setSortType] = React.useState("price");
  const [priceRate, setPriceRate] = React.useState("All");
  const [courseDay, setCourseDay] = React.useState("Mixed");

  return (
    <View style={styles.page}>
      {/* <Text style={{ textAlign: "center" }}>
        {"======== Search bar ======="}
      </Text> */}
      <View style={{ flexDirection: "column" , marginHorizontal: 20}}>
        <View style={{ flexDirection: "row" , height: 40}}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Search bar"

          />
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setFilterVisible(true)}
          >
            <Text style={styles.textStyle}>Add filter</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: "row",}}>
          <View style={{ flexDirection: "row", alignItems: "center",}}>
            <RadioButton
              value="Sort by Price"
              status={ sortType === 'price' ? 'checked' : 'unchecked' }
              onPress={() => setSortType('price')}
            />
            <Text>Sort by Price</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: "2%"}}>
            <RadioButton
              value="Sort by Date"
              status={ sortType === 'date' ? 'checked' : 'unchecked' }
              onPress={() => setSortType('date')}
            />
            <Text>Sort by Date</Text>
          </View>
        </View>
      </View>


      {/* </View> */}
      <ScrollView style={styles.scrollSection}>
        {courseList.map((course, idx) => (
          <View key={idx} style={styles.card}>
            <CourseCard course={course} />
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setFilterVisible(!filterVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Filter</Text>

            <View style={{width: 280, backgroundColor:"white"}}>
              <Text>Subject:</Text>

              <Text>                        </Text>

              <Text>Price Rate:</Text>

              <View style={{ flexDirection: "row",}}>
                <View style={{ flexDirection: "row", alignItems: "center", width: 140}}>
                  <RadioButton
                    value="value"
                    status={ priceRate === '0 - 500 Bath' ? 'checked' : 'unchecked' }
                    onPress={() => setPriceRate('0 - 500 Bath')}
                  />
                  <Text>0 - 500 Bath</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: "2%"}}>
                  <RadioButton
                    value="value"
                    status={ priceRate === '500 - 1000 Bath' ? 'checked' : 'unchecked' }
                    onPress={() => setPriceRate('500 - 1000 Bath')}
                  />
                  <Text>500 - 1000 Bath</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row",}}>
                <View style={{ flexDirection: "row", alignItems: "center", width: 140}}>
                  <RadioButton
                    value="value"
                    status={ priceRate === '1000 - 2000 Bath' ? 'checked' : 'unchecked' }
                    onPress={() => setPriceRate('1000 - 2000 Bath')}
                  />
                  <Text>1000 - 2000 Bath</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: "2%"}}>
                  <RadioButton
                    value="value"
                    status={ priceRate === '2000 - 3000 Bath' ? 'checked' : 'unchecked' }
                    onPress={() => setPriceRate('2000 - 3000 Bath')}
                  />
                  <Text>2000 - 3000 Bath</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row",}}>
                <View style={{ flexDirection: "row", alignItems: "center", width: 140}}>
                  <RadioButton
                    value="value"
                    status={ priceRate === '3000++ Bath' ? 'checked' : 'unchecked' }
                    onPress={() => setPriceRate('3000++ Bath')}
                  />
                  <Text>3000++ Bath</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: "2%"}}>
                  <RadioButton
                    value="value"
                    status={ priceRate === 'All' ? 'checked' : 'unchecked' }
                    onPress={() => setPriceRate('All')}
                  />
                  <Text>All</Text>
                </View>
              </View>

              <Text>Course Day:</Text>

              <View style={{ flexDirection: "row",}}>
                <View style={{ flexDirection: "row", alignItems: "center", width: 90}}>
                  <RadioButton
                    value="value"
                    status={ courseDay === 'Weekend' ? 'checked' : 'unchecked' }
                    onPress={() => setCourseDay('Weekend')}
                  />
                  <Text>Weekend</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", width: 90, marginLeft: "2%"}}>
                  <RadioButton
                    value="value"
                    status={ courseDay === 'Weekday' ? 'checked' : 'unchecked' }
                    onPress={() => setCourseDay('Weekday')}
                  />
                  <Text>Weekday</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: "2%"}}>
                  <RadioButton
                    value="value"
                    status={ courseDay === 'Mixed' ? 'checked' : 'unchecked' }
                    onPress={() => setCourseDay('Mixed')}
                  />
                  <Text>Mixed</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: "5%"}}>
              <Pressable
                style={[styles.button, styles.buttonClearFilter]}
                onPress={() => {setCourseDay('Mixed'),setPriceRate('All')}}
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
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

export default SearchCoursePage
