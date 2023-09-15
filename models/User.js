import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter an name"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
