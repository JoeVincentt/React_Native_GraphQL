const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  messageId: {
    type: String
  },
  senderId: {
    type: String,
    required: true
    // type: mongoose.ObjectId,
    // required: true,
    // autopopulate: true,
    // ref: "User"
  },
  recipientId: {
    type: String,
    required: true
    // autopopulate: true,
    // ref: "User"
  },
  chatId: {
    type: String,
    required: true
    // autopopulate: true,
    // ref: "Chat"
  },
  content: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

// MessageSchema.pre("save", function(next) {
//   mongoose.ObjectId.get(v => v.toString());
//   next();
// });
// MessageSchema.plugin(require("mongoose-autopopulate"));

MessageSchema.index({
  "$**": "text"
});

module.exports = mongoose.model("Message", MessageSchema);
