import { faker } from "@faker-js/faker";

const generatePets = (count = 100) => {
  const pets = [];
  for (let i = 0; i < count; i++) {
    pets.push({
      name: faker.animal.type(),
      age: faker.number.int({ min: 1, max: 15 }),
      breed: faker.animal.dog(),
      adopted: false,
      owner: "user",
    });
  }
  return pets;
};

export default generatePets;
