import React from "react";
import { Text, View } from "react-native";
import { Button, Divider } from "react-native-elements";
import { SecureStore } from "expo";

export default class LoginOptionsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  async componentWillMount() {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        console.log("no token in secure storage");
      }
      if (token) {
        this.props.navigation.navigate("Main");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          onPress={() => this.props.navigation.push("SignIn")}
          title="Sign In"
          raised
        />
        <Divider style={{ backgroundColor: "blue", height: 10 }} />
        <Button
          buttonStyle={{ backgroundColor: "red" }}
          onPress={() => this.props.navigation.push("SignUp")}
          title="Sign Up"
          raised
        />
      </View>
    );
  }
}
