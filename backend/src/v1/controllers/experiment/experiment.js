import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const experimentController = {
  async createExperiment(req, res) {
    try {
      const { name } = req.body;
      const userId = req.user.id;
      const experiment = await prisma.experiment.create({
        data: {
          name,
          userId,
          variants: { create: [] }, // Initially, no variants
        },
      });
      res.json(customResponse(200, experiment));
    } catch (error) {
      console.error("Error creating experiment:", error);
      res.json(customResponse(500, "Internal server error"));
    }
  },

  async getExperiments(req, res) {
    try {
      const userId = req.user.id;
      const experiments = await prisma.experiment.findMany({
        where: {
          userId,
        },
      });
      res.json(customResponse(200, experiments));
    } catch (error) {
      console.error("Error fetching experiments:", error);
      res.json(customResponse(500, "Internal server error"));
    }
  },

  async getExperimentDetails(req, res) {
    try {
      const { experimentId } = req.params;
      const userId = req.user.id;
      const experiment = await prisma.experiment.findUnique({
        where: {
          id: experimentId,
          userId,
        },
      });
      if (!experiment) {
        return res.json(customResponse(404, "Experiment not found"));
      }
      res.json(customResponse(200, experiment));
    } catch (error) {
      console.error("Error fetching experiment details:", error);
      res.json(customResponse(500, "Internal server error"));
    }
  },

  async updateExperiment(req, res) {
    try {
      const { experimentId } = req.params;
      const { name } = req.body;
      const userId = req.user.id;
      const updatedExperiment = await prisma.experiment.update({
        where: {
          id: experimentId,
          userId,
        },
        data: {
          name,
        },
      });
      res.json(customResponse(200, updatedExperiment));
    } catch (error) {
      console.error("Error updating experiment:", error);
      res.json(customResponse(500, "Internal server error"));
    }
  },

  async deleteExperiment(req, res) {
    try {
      const { experimentId } = req.params;
      const userId = req.user.id;
      await prisma.experiment.delete({
        where: {
          id: experimentId,
          userId,
        },
      });
      res.json(customResponse(200, "Experiment deleted successfully"));
    } catch (error) {
      console.error("Error deleting experiment:", error);
      res.json(customResponse(500, "Internal server error"));
    }
  },
};

export default experimentController;
