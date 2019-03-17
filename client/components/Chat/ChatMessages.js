import React, { Component } from "react";
//prettier-ignore
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon} from 'native-base';
import { Text, View, TextInput, ScrollView, ListView } from "react-native";
import { Query, Mutation } from "react-apollo";
import { GET_CHAT_MESSAGE, CREATE_MESSAGE } from "../../queries/index";

import InvertibleScrollView from "react-native-invertible-scroll-view";

export default class LinksScreen extends Component {
  render() {
    const { userId } = this.props.session.getCurrentUser;
    // console.log(userId);
    const chatId = "8b53c94b-28f4-46a3-a1da-33819c4f7a06";
    return (
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
          <Query
            query={GET_CHAT_MESSAGE}
            variables={{ chatId }}
            pollInterval={500}
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
                        <Text style={{ fontSize: 50 }}>{i.content}</Text>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        key={i.messageId}
                        style={{ backgroundColor: "blue" }}
                      >
                        <Text style={{ fontSize: 50 }}>{i.content}</Text>
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
      </InvertibleScrollView>
    );
  }
}
