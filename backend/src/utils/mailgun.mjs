


import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key:process.env.MAILGUN_API_KEY
});


mg.messages.create(MAILGUN_DOMAIN, {
	from: process.env.COMPANY_EMAIL,
	to: ["Sender email"],
	subject: "Hello1",
	text: "Testing some Mailgun awesomeness1!",
	html: "<h1>Testing some Mailgun awesomeness1!</h1>"
})
.then(msg => console.log(msg)) 
.catch(err => console.log(err)); 