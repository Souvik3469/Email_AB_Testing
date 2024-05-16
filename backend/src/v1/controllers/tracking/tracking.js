// trackingController.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const trackingController = {
  async trackEvent(req, res) {
    try {
      
      const { event, variantId } = req.body;

    
      const updatedVariant = await prisma.variant.update({
        where: { id: variantId },
        data: {
          [event]: true, 
        },
      });

      res.status(200).json({ message: "Event tracked successfully", variant: updatedVariant });
    } catch (error) {
      console.error("Error tracking event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default trackingController;
