import { usersService } from "../services/index.js";
import { petsService } from "../services/index.js";
import { generateUsers, generatePets } from "../utils/mocks.js";

// GenerateData
const generateMockingData = async (users = 0, pets = 0) => {
  try {
    const petsList = await generateMockingPets(pets);

    const savedPets = await petsService.insert(petsList);

    const usersList = await generateMockingUsers(users);

    const savedUsers = await usersService.insert(usersList);

    return {
      users: savedUsers.length,
      pets: savedPets.length,
    };
  } catch (error) {
    console.error("Error generating mocks:", error);
  }
};

const generateMockingUsers = async (users) => {
  try {
    const usersList = [];

    for (let i = 0; i < Number(users); i++) {
      const user = await generateUsers();
      usersList.push(user);
    }

    return usersList;
  } catch (error) {
    console.error("Failed generating mocked users:", error);
  }
};

const generateMockingPets = async (pets) => {
  try {
    const petsList = [];

    for (let i = 0; i < Number(pets); i++) {
      const pet = await generatePets();
      petsList.push(pet);
    }

    return petsList;
  } catch (error) {
    console.error("Failed generating mocked pets:", error);
  }
};

export default {
  generateMockingData,
  generateMockingUsers,
  generateMockingPets,
};
