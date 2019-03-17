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
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";
import _ from "lodash";
import { SecureStore } from "expo";
import { Button, ThemeProvider, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Mutation } from "react-apollo";
import { Constants, Location, Permissions, MapView } from "expo";

import { SIGNUP_USER } from "../queries/index";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    } catch (error) {
      console.log(error);
    }
  };

  signOut = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await this.props.refetch();
      this.props.navigation.navigate("Auth");
    } catch (error) {
      console.log(error);
    }
  };

  fetchingData = async () => {
    await this.props.refetch();
  };

  render() {
    const { location, errorMessage } = this.state;
    const { session } = this.props;
    let text = "Waiting..";
    if (errorMessage) {
      text = errorMessage;
    } else if (location) {
      text = JSON.stringify(location);
    }
    // console.log(JSON.stringify(this.props.session));
    // console.log(text);
    if (
      _.isEmpty(session) ||
      session === undefined ||
      session.getCurrentUser === null
    ) {
      this.fetchingData();
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Welcome {session.getCurrentUser.username}</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View>
              <MapView
                style={{ flex: 1, height: 400, width: 400 }}
                initialRegion={{
                  // latitude: location.latitude,
                  // longitude: location.longitude,
                  latitude: 31.889931,
                  longitude: -71.009003,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
              />
            </View>

            <Text>{text}</Text>
            <View style={{ margin: 20 }}>
              <Button title="signout" onPress={() => this.signOut()} />
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default HomeScreen;
