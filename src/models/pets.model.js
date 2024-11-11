import { Schema, model } from "mongoose";


const petSchema = new Schema({
 name: { type: String, required: true },
 age: { type: Number, required: true },
 breed: { type: String, required: true },
 adopted: { type: Boolean, required: true, default: false },
 owner: { type: String, required: true },
});

export const petModel = model("Pets", petSchema);