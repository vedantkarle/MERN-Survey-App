const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  subject: {
    type: String,
  },
  recipients: [recipientSchema],
  yes: {
    type: Number,
    default: 0,
  },
  no: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateSent: Date,
  lastResponded: Date,
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
