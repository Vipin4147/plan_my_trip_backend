const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://vipin:vipin@cluster0.k9v3sif.mongodb.net/plan_my_trip?retryWrites=true&w=majority"
);

module.exports = {
  connection,
};
