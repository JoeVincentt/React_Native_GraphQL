import React, { Component } from "react";
//prettier-ignore
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon} from 'native-base';
import { Text, View, TextInput, ScrollView, ListView } from "react-native";
import { Query, Mutation } from "react-apollo";
import { GET_CHAT_MESSAGE, CREATE_MESSAGE } from "../queries/index";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInput from "../components/Chat/MessageInput";

import { SecureStore } from "expo";

export default class LinksScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    text: ""
  };

  componentWillMount() {}
  componentDidMount() {
    isMounted = true;
  }

  signOut = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      this.props.navigation.navigate("Auth");
      this.props.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.signOut()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <ChatMessages session={this.props.session} />
        <View
          style={{
            justifyContent: "flex-end",
            height: 80,
            alignItems: "center",
            margin: 10
          }}
        >
          <MessageInput session={this.props.session} />
        </View>
      </Container>
    );
  }
}
