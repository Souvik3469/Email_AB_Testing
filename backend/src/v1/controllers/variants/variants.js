import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import axios from 'axios';
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
  .then(msg => {
    const messageId = msg.id.replace(/[<>]/g, ''); // Remove < and > characters

    return prisma.variant.update({
      where: { id: variant.id },
      data: { messageId }
    });
  })
 
        .catch(err => console.log(err));

      res.json(customResponse(200, variant));
    } catch (error) {
      console.error("Error creating variant:", error);
      res.json(customResponse(500, "Internal server error"));
    }
  },
 async getVariantAnalytics(req, res) {
    try {
      const { variantId } = req.params;
      const variant = await prisma.variant.findUnique({
        where: { id: variantId },
        include: {
          interactions: true // Include interactions related to this variant
        }
      });
      
      if (!variant) {
        return res.status(404).json({ error: 'Variant not found' });
      }

      // Calculate analytics data (e.g., count email opens, link clicks)
      const emailOpens = variant.interactions.filter(interaction => interaction.event === 'email_opened').length;
      const linkClicks = variant.interactions.filter(interaction => interaction.event === 'link_clicked').length;

      // Construct response object with analytics data
      const analyticsData = {
        variantId: variant.id,
        emailOpens,
        linkClicks
        // Add more analytics data as needed
      };

      res.json(analyticsData);
    } catch (error) {
      console.error('Error fetching variant analytics:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAllVariantsAnalytics(req, res) {
 try {
    const { experimentId } = req.query;

    // Fetch analytics data from Mailgun
    const mailgunDomain=process.env.MAILGUN_DOMAIN.replace(/['"]+/g, '')
    const response = await axios.get(`https://api.mailgun.net/v3/${mailgunDomain}/events?limit=20`, {
      auth: {
        username: 'api',
        password: process.env.MAILGUN_API_KEY
      }
    });

    // Get all variants for the specific experiment ID
    const variants = await prisma.variant.findMany({
      where: {
        experimentId: experimentId// Assuming experimentId is a number
      }
    });

    // Filter analytics data based on the message ID stored in each variant
    const filteredAnalytics = response.data.items.filter(item => {
      return variants.some(variant => variant.messageId === item.message.headers['message-id']);
    });

    res.json(filteredAnalytics);
  } catch (error) {
    console.error("Error fetching and filtering analytics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
  },
  
};

export default variantController;
