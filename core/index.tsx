import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import BottomTabs from "../core/navigation/BottomTabs"
import CourseInfoPage from "./studentPages/CourseInfoPage"
import ManageCoursePage from "./tutorPages/ManageCoursePage"
import EditCoursePage from "./tutorPages/EditCoursePage"
import CreateCoursePage from "./tutorPages/CreateCoursePage"

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
      initialRouteName={"Username"}
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
      <Stack.Screen name="ViewCourseInfo" component={CourseInfoPage} />
      <Stack.Screen name="EditCourseInfo" component={EditCoursePage} />
      <Stack.Screen name="Manage" component={ManageCoursePage} />
      <Stack.Screen name="CreateCourse" component={CreateCoursePage} />
    </Stack.Navigator>
  )
}
