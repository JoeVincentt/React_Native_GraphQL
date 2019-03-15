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
import { SIGNUP_USER } from "../../queries/index";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

class SignUpScreen extends React.Component {
  // static navigationOptions = {
  //   header: null
  // };

  state = { ...initialState };

  handleSubmit = async signupUser => {
    try {
      const { data } = await signupUser();
      const token = await data.signupUser.token;
      if (token !== null) {
        await SecureStore.setItemAsync("token", token);
        await this.props.refetch();
        this.props.navigation.navigate("Main");
      } else {
        console.log("No Token Found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { username, password, email, passwordConfirmation } = this.state;
    return (
      <Mutation
        mutation={SIGNUP_USER}
        variables={{ username, email, password, passwordConfirmation }}
      >
        {(signupUser, { data, loading, error }) => {
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
                  placeholder="USERNAME"
                  onChangeText={username => this.setState({ username })}
                  value={this.state.username}
                />
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
                <Input
                  placeholder="PASSWORD CONFIRMATION"
                  secureTextEntry={true}
                  onChangeText={passwordConfirmation =>
                    this.setState({ passwordConfirmation })
                  }
                  value={this.state.passwordConfirmation}
                />
                <Button
                  raised
                  title="Sign Up"
                  type="solid"
                  onPress={() => this.handleSubmit(signupUser)}
                />
              </View>
            </ThemeProvider>
          );
        }}
      </Mutation>
    );
  }
}

export default SignUpScreen;
