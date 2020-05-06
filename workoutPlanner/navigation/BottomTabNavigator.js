import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import NewPlanScreen from "../screens/NewPlanScreen";
import LogScreen from "../screens/LogScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: "#FF8C42",
        inactiveTintColor: "#028090"
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home" />
          )
        }}
      />
      <BottomTab.Screen
        name="CreatePlan"
        component={NewPlanScreen}
        options={{
          title: "Create Plan",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="table-edit" />
          )
        }}
      />
      <BottomTab.Screen
        name="Log"
        component={LogScreen}
        options={{
          title: "Log Workout",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="dumbbell" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "How to get started";
    case "CreatePlan":
      return "Create Workout Plan";
    case "Log":
      return "Log workout";
  }
}
