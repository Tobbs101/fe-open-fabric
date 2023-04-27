import user from "../models/user.js";

export const getUsers = (req, res) => {
  res.send("users");
};

export const createUser = async (req, res) => {
  const body = req.body;

  const newUser = new user(myUser);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
