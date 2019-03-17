import React, { Component } from "react";
//prettier-ignore
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon} from 'native-base';
import { Text, View, TextInput } from "react-native";
import { Query, Mutation } from "react-apollo";
import { GET_CHAT_MESSAGE, CREATE_MESSAGE } from "../queries/index";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

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

  sendMessage = async createMessage => {
    try {
      await createMessage();
      this.setState({ text: "" });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { userId } = this.props.session.getCurrentUser;
    // console.log(userId);
    const chatId = "8b53c94b-28f4-46a3-a1da-33819c4f7a06";
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
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Query
            query={GET_CHAT_MESSAGE}
            variables={{ chatId }}
            // pollInterval={2000}
          >
            {({ data, loading, refetch }) => {
              const message = data.getChatMessage;
              // console.log(message);
              if (message !== undefined) {
                return message.map(i => {
                  if (i.senderId === userId) {
                    return (
                      <View
                        key={i.messageId}
                        style={{ backgroundColor: "red" }}
                      >
                        <Text>{i.content}</Text>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        key={i.messageId}
                        style={{ backgroundColor: "blue" }}
                      >
                        <Text>{i.content}</Text>
                      </View>
                    );
                  }
                });
              } else {
                return null;
              }
            }}
          </Query>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            height: 80,
            alignItems: "center",
            margin: 20
          }}
        >
          <View
            style={{ flexDirection: "row", backgroundColor: "white", flex: 1 }}
          >
            <View style={{ width: "70%" }}>
              <AutoGrowingTextInput
                style={{
                  height: 50,
                  borderColor: "gray",
                  borderWidth: 1,
                  fontSize: 30
                }}
                placeholder={"Your Message"}
                value={this.state.text}
                onChangeText={text => this.setState({ text })}
              />
            </View>
            <View style={{ width: "20%" }}>
              <Mutation
                mutation={CREATE_MESSAGE}
                variables={{
                  senderId: userId,
                  recipientId: "a52eccb1-5c8d-439e-86da-f389c2df3713",
                  content: this.state.text,
                  chatId
                }}
              >
                {(createMessage, attrs = {}) => {
                  return (
                    <Button onPress={() => this.sendMessage(createMessage)}>
                      <Icon name="send" />
                    </Button>
                  );
                }}
              </Mutation>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}
