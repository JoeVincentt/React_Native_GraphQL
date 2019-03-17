import React, { Component } from "react";
//prettier-ignore
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon} from 'native-base';
import { Text, View, TextInput, ScrollView, ListView } from "react-native";
import { Query, Mutation } from "react-apollo";
import { GET_CHAT } from "../queries/index";
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
    const { userId } = this.props.session.getCurrentUser;
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
        <InvertibleScrollView
          inverted
          ref={ref => {
            this.scrollView = ref;
          }}
          onContentSizeChange={() => {
            this.scrollView.scrollTo({ y: 0, animated: true });
          }}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Query query={GET_CHAT} variables={{ userId }} pollInterval={500}>
              {({ data, loading, refetch }) => {
                const chats = data.getChat;
                console.log(chats);
                if (chats !== undefined) {
                  return chats.map(i => {
                    return <Text>{i.createdAt}</Text>;
                  });
                } else {
                  return null;
                }
              }}
            </Query>
          </View>
        </InvertibleScrollView>
        <View
          style={{
            justifyContent: "flex-end",
            height: 80,
            alignItems: "center",
            margin: 10
          }}
        />
      </Container>
    );
  }
}
