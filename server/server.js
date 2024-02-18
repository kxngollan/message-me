const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());

const databaseConnect = require("./database/databaseConnect");

databaseConnect();

const Message = require("./database/messageSchema");

app.get("/", async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post("/", async (req, res, next) => {
  const { user, message } = req.body;
  const date = new Date();
  try {
    const newMessage = new message({ user, message, date });
    await newMessage.save();
    console.log("Message saved successfully");

    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
