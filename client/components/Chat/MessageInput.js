import React, { Component } from "react";
//prettier-ignore
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon} from 'native-base';
import { Text, View, TextInput, ScrollView, ListView } from "react-native";
import { Query, Mutation } from "react-apollo";
import { GET_CHAT_MESSAGE, CREATE_MESSAGE } from "../../queries/index";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

export default class LinksScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    text: ""
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
    const chatId = "8b53c94b-28f4-46a3-a1da-33819c4f7a06";
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          flex: 1,
          width: "100%"
        }}
      >
        <View style={{ width: "80%" }}>
          <AutoGrowingTextInput
            style={{
              flex: 1,
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
    );
  }
}
