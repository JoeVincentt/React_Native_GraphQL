import { gql } from "apollo-boost";

// User Queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
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
