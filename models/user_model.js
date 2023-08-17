const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  destination: String,
  no_of_travelers: Number,
  budget_per_person: Number,
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = {
  UserModel,
};
