import { createStackNavigator } from "react-navigation";

import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import LoginOptionsScreen from "../screens/Auth/LoginOptionsScreen";

const AuthStackNavigator = createStackNavigator({
  LoginOptions: LoginOptionsScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen
});

export default AuthStackNavigator;
