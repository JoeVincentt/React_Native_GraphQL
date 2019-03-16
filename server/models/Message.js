const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  senderId: {
    type: mongoose.ObjectId,
    required: true,
    autopopulate: true,
    ref: "User"
  },
  recipientId: {
    type: mongoose.ObjectId,
    required: true,
    autopopulate: true,
    ref: "User"
  },
  chatId: {
    type: mongoose.ObjectId,
    required: true,
    autopopulate: true,
    ref: "Chat"
  },

  content: {
    type: String,
    unique: true,
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

MessageSchema.pre("save", function(next) {
  mongoose.ObjectId.get(v => v.toString());
  next();
});

MessageSchema.index({
  "$**": "text"
});
MessageSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Message", MessageSchema);
