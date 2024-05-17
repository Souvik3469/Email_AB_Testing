# MailClique
MailClique is a robust A/B testing platform designed to enhance email engagement metrics for marketing campaigns. It allows marketers to test various elements of their email newsletters, such as subject lines and sender names, to determine the best-performing variants. The platform provides actionable insights to optimize future email campaigns, aiming to improve open rates, click-through rates (CTR), and overall engagement.

## Features:
### Frontend Features
- User-friendly Interface:
Intuitive forms and interfaces for setting email template variants.
Users can create multiple variants of an email, such as different subject lines and sender names.

- Validation to ensure accurate data entry.
- Real-time Dashboard:
Dashboard displays performance of each email version.
Charts and graphs for easy understanding of metrics such as the number of emails sent and the number of users who opened the email.

### Backend Features
- Experiment Management:
Create, update, and delete A/B tests.
- Secure storage of experiment configurations and results in a database.
- Integration with Email Service Provider:
Email-sending process integrated with Mailgun service.
- APIs to trigger email sends and track engagement metrics.

## WorkFlow
- Firstly the user should signup and login with valid credentials.
- User will create one experiment (like Subject/ContentLine meaning he/she can create an experiment testing various subjects and contentLines).
- User will now create variants on his specific experiment and whenever he/she creates a specific variant the mail will automatically be sent to the sender.
- Now the user will choose which experiments' analytics to be shown and all the graphs and analytics of all variants under that experiment will be shown.
(Note: If free tier of mailgun is used only logs of past 24 hours will be shown and only analytics like email clicks and opened will be shown.

## Technologies Used
### Frontend:
- Reactjs with Vite
- TailwindCss
- Chart.js
- React query
### Backend
- Nodejs with Express
- Prisma as ORM
- Mongodb
- Mailgun

## Getting Started
### Prerequisites
- Node.js (for a Node.js backend)
- MongoDB
- Mailgun account

### Installation
- Clone the repository:

      git clone https://github.com/yourusername/EmailOptimizer.git
      cd
- Install frontend dependencies:
  
      cd frontend
      npm install
- Install backend dependencies:

      cd ../backend
      npm install
- Set up environment variables:
Create a .env file in the root of the backend directory with the necessary configurations

      PORT = YOUR PORT
      USER_ACCESS_SECRET = YOUR USER_ACCESS_SECRET
      DATABASE_URL = YOUR DATABASE_URL
      MAILGUN_API_KEY = YOUR MAILGUN_API_KEY
      MAILGUN_DOMAIN = YOUR MAILGUN_DOMAIN
      COMPANY_EMAIL = YOUR COMPANY_EMAIL
- Run the application:

      cd frontend
      npm run dev

  In another terminal window:

      cd backend
      npm run dev

## Future Advancements:

### Frontend Features:

Reporting Module:

- To design a reporting module to generate comprehensive reports summarizing A/B test results and insights.
- To enable exporting of reports in various formats (e.g., PDF, CSV) for sharing with stakeholders.

### Backend Features:

- To examine past user activity data to discover the most effective times for sending future emails to users, which will enhance engagement rates.
- To set up scheduled tasks or cron jobs for automating processes like sending test emails and data analysis.

## License

[MIT](https://choosealicense.com/licenses/mit/)
