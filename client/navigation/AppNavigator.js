import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStackNavigator,
      Main: MainTabNavigator
    },
    {
      initialRouteName: "Auth"
    }
  )
);
