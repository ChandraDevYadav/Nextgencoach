import asyncHandler from "express-async-handler";
import Client from "../models/client.Model.js";
import User from "../models/user.Model.js";

const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({ user: req.user._id });
  res.json(clients);
});

const createClient = asyncHandler(async (req, res) => {
  const { name, email, phone, profession, goals, challenges, notes } = req.body;

  const client = new Client({
    user: req.user._id,
    name,
    email,
    phone,
    profession,
    goals,
    challenges,
    notes,
  });

  const createdClient = await client.save();

  await User.findByIdAndUpdate(
    req.user._id,
    { $push: { clients: createdClient._id } },
    { new: true }
  );

  res.status(201).json(createdClient);
});

const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findOne({
    _id: req.params.id,
    user: req.user._id,
  })
    .populate("sessions")
    .populate("questionnaires");

  if (client) {
    res.json(client);
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});

const updateClient = asyncHandler(async (req, res) => {
  const { name, email, phone, profession, goals, challenges, notes } = req.body;

  const client = await Client.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (client) {
    client.name = name || client.name;
    client.email = email || client.email;
    client.phone = phone || client.phone;
    client.profession = profession || client.profession;
    client.goals = goals || client.goals;
    client.challenges = challenges || client.challenges;
    client.notes = notes || client.notes;

    const updatedClient = await client.save();
    res.json(updatedClient);
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});

const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (client) {
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { clients: client._id } },
      { new: true }
    );

    await client.deleteOne();
    res.json({ message: "Client removed" });
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});

const uploadClientAvatar = asyncHandler(async (req, res) => {
  const client = await Client.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (client) {
    if (req.file) {
      client.avatar = req.file.path;
      await client.save();
      res.json({
        message: "Avatar uploaded successfully",
        avatar: client.avatar,
      });
    } else {
      res.status(400);
      throw new Error("No file uploaded");
    }
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});

export {
  getClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
  uploadClientAvatar,
};
