var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  firstName: String,
  middleName: String,
  lastName: String,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item"
    }
  ],
  overAllCost: Number,
  quentity: Number
});

module.exports = mongoose.model("User", userSchema);
