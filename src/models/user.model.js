import { Schema, model } from "mongoose";
import { hashCreated } from "../utils/hashFunction.js";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  const newPassword = await hashCreated(this.password);
  this.password = newPassword;
  next();
});

export const userModel = model("User", userSchema);
