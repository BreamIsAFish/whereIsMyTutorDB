import React from "react"
import { Image, StyleSheet, PixelRatio, SafeAreaView } from "react-native"
// import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import SearchCoursePage from "../studentPages/SearchCoursePage"
import ManageCoursePage from "../tutorPages/ManageCoursePage"
import SelectUsernamePage from "../loginPage/SelectUsernamePage"

const Tab = createBottomTabNavigator()
const BottomTabs = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "blue",
          tabBarShowLabel: true,
          tabBarLabelPosition: "below-icon",
          tabBarStyle: styles.tabBar,
        }}
        // tabBarOptions={{
        //   activeTintColor: "blue",
        //   showLabel: true,
        //   // labelStyle: { fontFamily: 'Prompt-Regular', fontSize: SIZES.h6 },
        //   labelPosition: "below-icon",
        //   style: styles.tabBar,
        // }}
      >
        <Tab.Screen
          name="Username"
          component={SelectUsernamePage}
          options={{
            tabBarIcon: ({ focused }: any) => (
              <Image
                source={require("../../assets/icons/Person.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  // tintColor: focused ? COLORS.primary : COLORS.darkgrey,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchCoursePage}
          options={{
            tabBarIcon: ({ focused }: any) => (
              <Image
                source={require("../../assets/icons/Search.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  // tintColor: focused ? COLORS.primary : COLORS.darkgrey,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Manage"
          component={ManageCoursePage}
          options={{
            tabBarIcon: ({ focused }: any) => (
              <Image
                source={require("../../assets/icons/Manage.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  // tintColor: focused ? COLORS.primary : COLORS.darkgrey,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    // paddingBottom: PixelRatio.get() <= 2 ? 0 : 4,
    paddingBottom: "1%",
    //     height: 56,
    //     shadowColor: COLORS.lightgrey,
    //     shadowOffset: { height: -5, width: 0 },
    //     shadowOpacity: 0.5,
    //     shadowRadius: 5,
    //     borderTopWidth: 0,
  },
})

export default BottomTabs
