const { messages, createId } = require("../../../data/messages");

// Zoek een bericht op _id, of op array-index (0, 1, ...) als fallback.
const findIndex = (id) => {
  const index = messages.findIndex((m) => m._id === id);
  if (index !== -1) return index;
  if (/^\d+$/.test(id) && Number(id) < messages.length) return Number(id);
  return -1;
};

const notFound = (res, id) =>
  res.status(404).json({
    status: "fail",
    message: `Message ${id} not found`,
    data: { message: null },
  });

// GET /api/v1/messages  en  GET /api/v1/messages?user=username
const getAll = (req, res) => {
  const { user } = req.query;

  if (user) {
    const userMessages = messages.filter(
      (m) => m.user.toLowerCase() === user.toLowerCase()
    );
    return res.json({
      status: "success",
      message: `Messages from user ${user}`,
      data: { messages: userMessages },
    });
  }

  res.json({
    status: "success",
    message: "GETTING messages",
    data: { messages },
  });
};

// GET /api/v1/messages/:id
const getById = (req, res) => {
  const { id } = req.params;
  const index = findIndex(id);
  if (index === -1) return notFound(res, id);

  res.json({
    status: "success",
    message: `GETTING message ${id}`,
    data: { message: messages[index] },
  });
};

// POST /api/v1/messages   body: { "message": { "user": "...", "text": "..." } }
const create = (req, res) => {
  const { user, text } = req.body?.message || {};

  if (!user || !text) {
    return res.status(400).json({
      status: "fail",
      message: "Message not saved",
      data: { message: "Both message.user and message.text are required" },
    });
  }

  const newMessage = { user, text, _id: createId(), __v: 0 };
  messages.push(newMessage);

  res.status(201).json({
    status: "success",
    message: "Message saved",
    data: { message: newMessage },
  });
};

// PUT /api/v1/messages/:id   body: { "message": { "user"?: "...", "text"?: "..." } }
const update = (req, res) => {
  const { id } = req.params;
  const index = findIndex(id);
  const { user, text } = req.body?.message || {};

  // Bestaat het bericht niet? Dan faken we de update (zoals de opdracht toelaat).
  if (index === -1) {
    return res.json({
      status: "success",
      message: "Message updated",
      data: {
        message: {
          user: user || "unknown",
          text: text || "",
          _id: id,
          __v: 0,
        },
      },
    });
  }

  if (user) messages[index].user = user;
  if (text) messages[index].text = text;

  res.json({
    status: "success",
    message: "Message updated",
    data: { message: messages[index] },
  });
};

// DELETE /api/v1/messages/:id
const remove = (req, res) => {
  const { id } = req.params;
  const index = findIndex(id);

  // Bestaat het bericht niet? Dan faken we de delete (zoals de opdracht toelaat).
  if (index !== -1) messages.splice(index, 1);

  res.json({
    status: "success",
    message: "Message deleted",
    data: { message: { _id: id } },
  });
};

module.exports = { getAll, getById, create, update, remove };
