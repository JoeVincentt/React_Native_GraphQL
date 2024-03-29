const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const fs = require("fs");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { execute, subscribe } = require("graphql");
const { createServer } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");

//Mongoose Models
const User = require("./models/User");
const Chat = require("./models/Chat");
const Message = require("./models/Message");

//GraphQL Types And Resolvers
const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/schema.graphql"), "utf8")}
`;
const { resolvers } = require("./resolvers");

const app = express();
const path = "/graphql";

//Use MIDDLEWARE
const corsOptions = {
  // origin: "exp://192.168.0.63:19000",
  origin: "http://localhost:19001",
  credentials: true
};
app.use(path, cors(corsOptions));

// Set up JWT authentication middleware
app.use(path, async (req, res, next) => {
  const token = req.headers.authorization || "";
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (error) {
      console.log("Token not found");
    }
  }
  next();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    User,
    Chat,
    Message,
    currentUser: req.currentUser
  })
});

server.applyMiddleware({ app, path });
const ws = createServer(app);

// Add subscription support
server.installSubscriptionHandlers(ws);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))
  .then(() =>
    ws.listen({ port: PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    )
  );
