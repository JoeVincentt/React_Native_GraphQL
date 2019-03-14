import { createStackNavigator } from "react-navigation";

import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";

const AuthStackNavigator = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
});

export default AuthStackNavigator;
