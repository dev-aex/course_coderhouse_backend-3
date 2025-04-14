import { Router } from "express";
import mocksController from "../controllers/mocks.controller.js";

const router = Router();

router.post("/generatemockingdata/:users/:pets", async (req, res) => {
  try {
    const { users, pets } = req.params;

    const mocks = await mocksController.generateMockingData(users, pets);

    res.status(200).json({ status: "success", payload: mocks });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", code: 500, message: error.message });
  }
});

router.get("/mockingusers/:users", async (req, res) => {
  try {
    const { users } = req.params;

    const usersList = await mocksController.generateMockingUsers(users);

    res.status(200).json({ status: "success", payload: usersList });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", code: 500, message: error.message });
  }
});

router.get("/mockingpets/:pets", async (req, res) => {
  try {
    const { pets } = req.params;

    const petsList = await mocksController.generateMockingPets(pets);

    res.status(200).json({ status: "success", payload: petsList });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", code: 500, message: error.message });
  }
});

export default router;
