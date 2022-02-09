const {API_KEY,EMAIL_SENDGRID} = process.env;
const sgMail= require('@sendgrid/mail');
 
sgMail.setApiKey(API_KEY);

async function sendEmail (email){
  const msg = {
    to: `${email}`, // Change to your recipient
    from: `${EMAIL_SENDGRID}`, // Change to your verified sender
    subject: 'Enviado con SendGrid desde api challenge-backend-alkemy',
    text: 'Bienvenido a la platafarma challenge-backend alkemy',
    html: '<strong>Bienvenido a la platafarma challenge-backend alkemy</strong>',
  }
  /* sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    }) */
    try {
      const sendMessage=await sgMail.send(msg);  
    } catch (error) {
      console.log(error)
    }
}


module.exports=sendEmail