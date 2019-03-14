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
import { Mutation, Query } from "react-apollo";
import { SIGNUP_USER, GET_CURRENT_USER } from "../queries/index";
import withSession from "../withSession";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = { ...initialState };

  handleSubmit = async signupUser => {
    try {
      const { data } = await signupUser();
      const token = await data.signupUser.token;
      if (token !== null) {
        await SecureStore.setItemAsync("token", token);
      } else {
        console.log("No Token Found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  signOut = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      console.log("ls cleaned");
      await this.props.refetch();
      this.props.navigation.navigate("Auth");
    } catch (error) {
      console.log("something went wrong when signout");
      console.log(error);
    }
  };

  render() {
    console.log(JSON.stringify(this.props.session));
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
                  title="SignUp"
                  type="solid"
                  onPress={() => this.handleSubmit(signupUser)}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {/* <Query query={GET_CURRENT_USER}>
                  {({ data, loading, refetch }) => {
                    console.log(JSON.stringify(data));
                    if (loading) return <Text>didnt work</Text>;
                    return <Text>Got Data</Text>;
                  }}
                </Query> */}
                <Button
                  raised
                  title="SignOut"
                  type="solid"
                  onPress={() => this.signOut()}
                />
              </View>
            </ThemeProvider>
          );
        }}
      </Mutation>
    );
  }
}

export default withSession(HomeScreen);
