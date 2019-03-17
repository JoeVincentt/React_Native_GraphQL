const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var stripe = require("stripe")(process.env.STRIPE_KEY);
var mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");
const { PubSub, withFilter } = require("graphql-subscriptions");

const pubsub = new PubSub();

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return jwt.sign(
    {
      username,
      email
    },
    secret,
    { expiresIn }
  );
};

exports.resolvers = {
  // Subscription: {
  //   messageAdded: {
  //     subscribe: withFilter(
  //       () => pubsub.asyncIterator("messageAdded"),
  //       (payload, variables) => {
  //         return payload.chatId === variables.chatId;
  //       }
  //     )
  //   }
  // },
  Query: {
    //Chat && Message
    getChat: async (root, { userId }, { Chat, Messsage }) => {
      const chat = await Chat.find({ participant: userId });

      return chat;
    },
    getChatMessage: async (root, { chatId }, { Message }) => {
      const messages = await Message.find({ chatId });
      return messages;
    },
    // User resolvers
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username
      });
      // console.log(user);
      return user;
    }
  },
  Mutation: {
    //Chat && Message
    createChat: async (root, { user1Id, user2Id }, { Chat }) => {
      const participant = [user1Id, user2Id];
      const newChat = await new Chat({
        chatId: uuidv4(),
        participant
      }).save();
      return newChat;
    },
    createMessage: async (
      root,
      { senderId, recipientId, content, chatId },
      { Chat, Message, User }
    ) => {
      const newMessage = await new Message({
        messageId: uuidv4(),
        senderId,
        recipientId,
        content,
        chatId,
        sentAt: Date.now()
      }).save();

      // pubsub.publish("messageAdded", {
      //   messageAdded: newMessage,
      //   chatId: chatId
      // });

      return newMessage;
    },
    //User Mutations
    signinUser: async (root, { email, password }, { User }) => {
      const user = await User.findOne({ email });
      // console.log(user);
      if (!user) {
        throw new Error("User not found");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      return { token: createToken(user, process.env.SECRET, "1hr") };
    },

    signupUser: async (
      root,
      { username, email, password, passwordConfirmation },
      { User }
    ) => {
      if (password !== passwordConfirmation) {
        throw new Error("Password Confirmation Failed");
      }

      const userNameExists = await User.findOne({ username });
      if (userNameExists) {
        throw new Error("User Name already exists");
      }
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        throw new Error("User Email already exists");
      }

      const newUser = await new User({
        userId: uuidv4(),
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    }
  }
};
