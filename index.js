const { connection } = require("./config/db.js");

const express = require("express");

const app = express();

const cors = require("cors");

const { UserModel } = require("./models/user_model.js");

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("welcome user");
});

app.post("/post", async (req, res) => {
  try {
    const { name, email, destination, no_of_travelers, budget_per_person } =
      req.body;
    let user = await new UserModel({
      name,
      email,
      destination,
      no_of_travelers,
      budget_per_person,
    });
    user.save();
    res.send("user created successfully");
  } catch (error) {
    console.log(error);
  }
});

app.get("/retrieve", async (req, res) => {
  try {
    let user = await UserModel.find();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    let ID = req.params.id;

    let user = await UserModel.findByIdAndDelete(ID);

    res.send("data deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

app.get("/filter/:destination/:sort", async (req, res) => {
  try {
    let destination = req.params.destination;
    let sortby = req.params.sort;

    let user = await UserModel.find({ destination: destination }).sort({
      budget_per_person: sortby,
    });
    if (user.length == 0) {
      res.send("No data found");
    } else {
      res.send(user);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/filter/:destination", async (req, res) => {
  try {
    let destination = req.params.destination;
    let user = await UserModel.find({ destination: destination });
    if (user.length == 0) {
      res.send("No data found");
    } else {
      res.send(user);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/sorted/:sort", async (req, res) => {
  try {
    let sort = req.params.sort;
    let user = await UserModel.find().sort({ budget_per_person: sort });
    if (user.length == 0) {
      res.send("No data found");
    } else {
      res.send(user);
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(5100, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log("err", error);
  }
  console.log("running at 5100");
});

// completed
