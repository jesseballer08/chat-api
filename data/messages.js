// Nep-databank: een statische array die in het geheugen blijft zolang de server draait.
const crypto = require("crypto");

const createId = () => crypto.randomBytes(12).toString("hex"); // 24 tekens, zoals een MongoDB _id

const messages = [
  { _id: "66fa85b6ad5aaee2d047fa28", user: "pikachu", text: "Hi! I'm a message", __v: 0 },
  { _id: "66fa85b6ad5aaee2d047fa29", user: "John", text: "Hello", __v: 0 },
  { _id: "66fa85b6ad5aaee2d047fa30", user: "Jane", text: "Hi", __v: 0 },
  { _id: "66fa85b6ad5aaee2d047fa31", user: "pikachu", text: "Hi! I'm another message", __v: 0 },
];

module.exports = { messages, createId };
