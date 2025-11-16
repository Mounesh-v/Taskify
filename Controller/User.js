import bcrypt from "bcryptjs";
import User from "../Model/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ msg: "User already Exist" });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: jwt.sign({ id: user._id }, process.env.JWT_SECRET),
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "No user found" });

  const correct = await bcrypt.compare(password, user.password);

  if (!correct) return res.status(400).json({ message: "Incorrect password" });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: jwt.sign({ id: user._id }, process.env.JWT_SECRET),
  });
};

export const dashboard = async (req, res) => {
  res.json({ message: "Welcome to dashboard", user: req.user });
};
