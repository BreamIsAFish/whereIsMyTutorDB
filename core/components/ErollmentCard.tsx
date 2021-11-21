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
        source={require("../../assets/icons/Person.png")}
        // resizeMode="contain"
        style={{
          height: 25,
          width: 25,
          margin: "3%",
        }}
      />
      <View style={{ marginVertical: "2%" }}>
        <Text>{`${enrollment.firstName} ${enrollment.firstName}`}</Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
          paddingRight: "5%",
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: "10%" }}
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
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
})

export default EnrollmentCard
