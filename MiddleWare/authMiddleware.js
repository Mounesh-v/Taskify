import jwt from "jsonwebtoken";
import User from "../Model/User.js";

const protect = async (req, res, next) => {
  let token = req.headers.authorization;
   token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // FIXED

    // attach user to request
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default protect;
