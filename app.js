const express = require("express");
const cors = require("cors");

const messagesRouter = require("./routes/api/v1/messages");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // nodig zodat de online tester (andere domeinnaam) je API mag aanspreken
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "success", message: "Chat API is running", data: null });
});

app.use("/api/v1/messages", messagesRouter);

// onbekende routes -> 404 in JSend-formaat
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Route ${req.method} ${req.originalUrl} not found`,
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`Chat API listening on port ${PORT}`);
});
