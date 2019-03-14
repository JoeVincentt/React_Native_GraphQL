const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var stripe = require("stripe")(process.env.STRIPE_KEY);

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
  Query: {
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
    //User Mutations
    signinUser: async (root, { email, password }, { User }) => {
      // if (password !== passwordConfirmation) {
      //   throw new Error("Password Confirmation Failed");
      // }

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
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    }
  }
};
