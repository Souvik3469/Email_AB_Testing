import express from "express";
import {
  userController,
} from "../controllers";
import authMiddleware from "../middlewares/Auth.middleware";
import experimentController from "../controllers/experiment/experiment";


const router = express.Router();

router.get("/user-details", authMiddleware, userController.userDetails);
router.post("/create-exp", authMiddleware, experimentController.createExperiment);
router.get("/get-exp", authMiddleware, experimentController.getExperiments);
router.patch("/update-exp", authMiddleware, experimentController.updateExperiment);
router.delete("/delete-exp", authMiddleware, experimentController.deleteExperiment);

export default router;
