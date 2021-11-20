import React, { useState, FC } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"

import { Review } from "../interfaces/courseInterface"

const ReviewCard: FC<{ review: Review }> = ({ review }) => {
  const onClick = () => {
    console.log("reviewed")
  }

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/CourseImage.png")}
          // resizeMode="contain"
          style={{
            height: "100%",
            width: "35%",
            marginRight: "3%",
          }}
        />
        <View style={{ marginVertical: "2%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text>{review.reviwerName}</Text>
            <Text>{review.rating}</Text>
          </View>
          <Text>{review.comment}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 5,
    borderRadius: 10,
  },
})

export default ReviewCard
