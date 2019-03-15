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

import { MonoText } from "../components/StyledText";
import withSession from "../withSession";

class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    n: this.props.navigation.getParam("n")
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{this.state.n}</Text>
      </View>
    );
  }
}

export default withSession(LinksScreen);
