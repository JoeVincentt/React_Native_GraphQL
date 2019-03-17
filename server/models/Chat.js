const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    chatId: {
      type: String,
      unique: true
    },
    participant: {
      // type: [mongoose.ObjectId],
      // required: true,
      // autopopulate: true,
      // ref: "User"
      type: [String],
      required: true
    }
  },
  { timestamps: true }
);

// ChatSchema.pre("save", function(next) {
//   mongoose.ObjectId.get(v => v.toString());
//   next();
// });

// ChatSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Chat", ChatSchema);
