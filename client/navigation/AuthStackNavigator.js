import { createStackNavigator } from "react-navigation";

import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import LoginOptionsScreen from "../screens/Auth/LoginOptionsScreen";
import withSession from "../withSession";

const AuthStackNavigator = createStackNavigator({
  LoginOptions: withSession(LoginOptionsScreen),
  SignIn: withSession(SignInScreen),
  SignUp: withSession(SignUpScreen)
});

export default AuthStackNavigator;
