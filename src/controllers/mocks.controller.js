import { usersService } from "../services/index.js";
import { petsService } from "../services/index.js";
import { generateUsers, generatePets } from "../utils/mocks.js";

const generateMockingData = async (req, res) => {
  const { users = 0, pets = 0 } = req.params;
  try {
    const petsList = [];

    for (let i = 0; i < Number(pets); i++) {
      const pet = await generatePets();
      petsList.push(pet);
    }

    const savedPets = await petsService.insert(petsList);

    const usersList = [];

    for (let i = 0; i < Number(users); i++) {
      const user = await generateUsers();
      usersList.push(user);
    }

    const savedUsers = await usersService.insert(usersList);

    const result = {
      users: savedUsers.length,
      pets: savedPets.length,
    };

    res.status(200).json({ status: "success", payload: result });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", code: 500, message: error.message });
  }
};

const generateMockingUsers = async (req, res) => {
  const { users } = req.params;
  try {
    const usersList = [];

    for (let i = 0; i < Number(users); i++) {
      const user = await generateUsers();
      usersList.push(user);
    }

    res.status(200).json({ status: "success", payload: usersList });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", code: 500, message: error.message });
  }
};

const generateMockingPets = async (req, res) => {
  const { pets } = req.params;
  try {
    const petsList = [];

    for (let i = 0; i < Number(pets); i++) {
      const pet = await generatePets();
      petsList.push(pet);
    }

    res.status(200).json({ status: "success", payload: petsList });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", code: 500, message: error.message });
  }
};

export default {
  generateMockingData,
  generateMockingUsers,
  generateMockingPets,
};
