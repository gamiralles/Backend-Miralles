import express from "express";
import generatePets from "../mocks/mockingPets.js";
import generateUsers from "../mocks/mockingUser.js";
import { userModel } from "../models/user.model.js"; 
import { petModel } from "../models/pets.model.js"; 
const router = express.Router();


router.get("/mockingpets", (req, res) => {
  const count = parseInt(req.query.count) || 100;
  const pets = generatePets(count);
  res.status(200).json(pets);
});

router.get("/mockingusers", (req, res) => {
  const users = generateUsers(50);
  res.status(200).json(users);
});

router.post("/generateData", async (req, res) => {
  const { users, pets } = req.body;
  try {
    const userMocks = generateUsers(users);
    const petMocks = generatePets(pets);

    await userModel.insertMany(userMocks);
    await petModel.insertMany(petMocks);

    res
      .status(201)
      .json({ message: `Inserted ${users} users and ${pets} pets` });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al insertar datos en la base de datos",
        details: error.message,
      });
  }
});

export default router;
