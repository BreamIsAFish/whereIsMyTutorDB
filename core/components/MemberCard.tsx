import React, { useState, FC } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"

import { MemberDto } from "../interfaces/dto"

const MemberCard: FC<{ member: MemberDto }> = ({ member }) => {
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
        <Text>{`${member.firstName} ${member.firstName}`}</Text>
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
})

export default MemberCard
