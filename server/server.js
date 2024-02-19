const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);

const databaseConnect = require("./database/databaseConnect");
databaseConnect();

const Message = require("./database/messageSchema");

app.get("/", async (req, res, next) => {
  try {
    const messages = await Message.find();
    console.log("Messages fetched successfully");
    const sorted = messages.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    res.json(sorted);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post("/", async (req, res, next) => {
  const { user, message } = req.body;
  const date = new Date();
  try {
    const newMessage = new Message({ user, message, date });
    await newMessage.save();
    console.log("Message saved successfully");
    const messages = await Message.find({});
    const sorted = messages.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    res.json(sorted);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
