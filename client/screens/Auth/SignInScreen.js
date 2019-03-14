import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SecureStore } from "expo";
import { Button, ThemeProvider, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries/index";

const initialState = {
  email: "",
  password: ""
};

export default class SignInScreen extends React.Component {
  // static navigationOptions = {
  //   header: null
  // };

  state = { ...initialState };

  handleSubmit = async signinUser => {
    try {
      const { data } = await signinUser();
      const token = await data.signinUser.token;
      if (token !== null) {
        await SecureStore.setItemAsync("token", token);
      } else {
        console.log("No Token Found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { password, email } = this.state;
    return (
      <Mutation mutation={SIGNIN_USER} variables={{ email, password }}>
        {(signinUser, { data, loading, error }) => {
          return (
            <ThemeProvider>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Input
                  placeholder="EMAIL"
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
                <Input
                  placeholder="PASSWORD"
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />
                <Button
                  raised
                  title="Sign In"
                  type="solid"
                  onPress={() => this.handleSubmit(signinUser)}
                />
              </View>
            </ThemeProvider>
          );
        }}
      </Mutation>
    );
  }
}
