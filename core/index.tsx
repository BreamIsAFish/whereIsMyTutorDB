import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import BottomTabs from "../core/navigation/BottomTabs"
import CourseInfoPage from "./studentPages/CourseInfoPage"
import ManageCoursePage from "./tutorPages/ManageCoursePage"

const Stack = createStackNavigator()

export const Index = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // const isUser = true;
  // if (isUser === undefined || isLoading) {
  //   return (
  //     <View>
  //       <Text>still loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <Stack.Navigator
      initialRouteName={"Search"}
      screenOptions={{ headerShown: true }}
    >
      <>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />
      </>
      <Stack.Screen name="CourseInfo" component={CourseInfoPage} />
      <Stack.Screen
        name="Manage"
        component={ManageCoursePage}
        // options={{
        //   headerShown: false,
        // }}
      />
    </Stack.Navigator>
  )
}
