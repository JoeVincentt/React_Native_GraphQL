import { gql } from "apollo-boost";

//Chat&&Message Queries
export const GET_CHAT = gql`
  query($userId: String!) {
    getChat(userId: $userId) {
      createdAt
      chatId
      participant
      updatedAt
    }
  }
`;
export const MESSAGE_ADDED = gql`
  subscription onMessageAdded($chatId: String!) {
    messageAdded(chatId: $chatId) {
      messageId
      sentAt
      content
    }
  }
`;

//Message subscription
export const GET_CHAT_MESSAGE = gql`
  query($chatId: String!) {
    getChatMessage(chatId: $chatId) {
      sentAt
      content
      senderId
      recipientId
      messageId
    }
  }
`;

//Chat&&Message Mutation
export const CREATE_CHAT = gql`
  mutation($user1Id: String!, $user2Id: String!) {
    createChat(user1Id: $user1Id, user2Id: $user2Id) {
      participant
      chatId
    }
  }
`;
export const CREATE_MESSAGE = gql`
  mutation(
    $senderId: String!
    $recipientId: String!
    $content: String!
    $chatId: String!
  ) {
    createMessage(
      senderId: $senderId
      recipientId: $recipientId
      content: $content
      chatId: $chatId
    ) {
      sentAt
      content
      senderId
      recipientId
      chatId
    }
  }
`;

// User Queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      userId
      username
      joinDate
      email
    }
  }
`;
// User Mutations

export const SIGNIN_USER = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signupUser(
      username: $username
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      token
    }
  }
`;
