import React, { FC } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"

import { EnrollmentDto } from "../interfaces/dto"
import { acceptEnrollment } from "../databases/MySQL"

type EnrollmentCardProp = { enrollment: EnrollmentDto; update: () => void }

const EnrollmentCard: FC<EnrollmentCardProp> = ({ enrollment, update }) => {
  // Other functions //
  const handleAccept = () => {
    acceptEnrollment({ enrollmentId: enrollment.enrollmentId, accept: true })
    update()
  }

  const handleReject = () => {
    acceptEnrollment({ enrollmentId: enrollment.enrollmentId, accept: false })
    update()
  }

  return (
    <View style={styles.card}>
      <Image
        source={require("../../assets/CourseImage.png")}
        // resizeMode="contain"
        style={{
          height: "100%",
          width: "20%",
          marginRight: "3%",
        }}
      />
      <View style={{ marginVertical: "2%" }}>
        <Text>{`${enrollment.firstName} ${enrollment.firstName}`}</Text>
      </View>

      <View
        style={{
          margin: "2%",
          height: "70%",
          flexDirection: "row",
          backgroundColor: "red",
        }}
      >
        <Text style={{ color: "white" }}> Reject </Text>
      </View>

      <View
        style={{
          margin: "2%",
          height: "70%",
          flexDirection: "row",
          backgroundColor: "green",
        }}
      >
        <Text style={{ color: "white" }}> Accept </Text>
      </View>
      <TouchableOpacity
        style={{ marginHorizontal: "5%" }}
        onPress={handleAccept}
      >
        <Image
          source={require("../../assets/icons/CheckMark.png")}
          // resizeMode="contain"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReject}>
        <Image
          source={require("../../assets/icons/CrossMark.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 3,
    borderRadius: 10,
  },
  icon: {
    height: "10%",
    width: "10%",
  },
})

export default EnrollmentCard
