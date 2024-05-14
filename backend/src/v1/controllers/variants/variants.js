import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";
import formData from 'form-data';
import Mailgun from 'mailgun.js';


const prisma = new PrismaClient();

const variantController = {
  async createVariant(req, res) {
    try {
      const { experimentId } = req.query;
      const { subject, sender, contentLine1, contentLine2 } = req.body;
      const userId = req.user.id; 

     
      const variant = await prisma.variant.create({
        data: {
          subject,
          sender,
          contentLine1,
          contentLine2,
          experimentId,
          userId, 
        },
      });

  
      const mailgun = new Mailgun(formData);
      const mg = mailgun.client({
        username: 'api',
        key: process.env.MAILGUN_API_KEY
      });

      const emailData = {
        from: process.env.COMPANY_EMAIL,
        to: sender, 
        subject,
        text: `${contentLine1}\n${contentLine2}`,
        html: `<h1>${contentLine1}</h1><p>${contentLine2}</p>`
      };

      mg.messages.create(process.env.MAILGUN_DOMAIN, emailData)
        .then(msg => console.log(msg))
        .catch(err => console.log(err));

      res.json(customResponse(200, variant));
    } catch (error) {
      console.error("Error creating variant:", error);
      res.json(customResponse(500, "Internal server error"));
    }
  },
};

export default variantController;
