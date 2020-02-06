const MailGen = require('mailgen')
const sgMail = require('@sendgrid/mail')

require('dotenv').config()

const mailGenerator = new MailGen({
  theme: 'salted',
  product: {
    name: 'Dev Desk',
    link: 'http://example.com',
  },
})

const email = {
  body: {
    name: '',
    intro: 'Welcome to email verification',
    action: {
      instructions: 'Please click the button below to verify your account',
      button: {
        color: '#33b5e5',
        text: 'Verify account',
        link: 'http://example.com/verify_account',
      },
    },
  },
}

const emailTemplate = mailGenerator.generate(email)
require('fs').writeFileSync('preview.html', emailTemplate, 'utf8')

const msg = {
    from: 'admin@devdeskteam.com',
    subject: 'Thanks for signing up, please verify your account!',
    html: emailTemplate,
  }
  
  const sendMail = async (email) => {
    try {
      sgMail.setApiKey("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")
      return sgMail.send({...msg, to: email})
    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  module.exports = sendMail
  