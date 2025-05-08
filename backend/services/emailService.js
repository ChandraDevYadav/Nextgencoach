import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendQuestionnaireEmail = async (questionnaire, coach) => {
  try {
    const mailOptions = {
      from: `"NextGen Coach" <${process.env.EMAIL_FROM}>`,
      to: questionnaire.client.email,
      subject: `${questionnaire.title} - Action Required`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #33C9A7;">${questionnaire.title}</h2>
          <p>Dear ${questionnaire.client.name},</p>
          <p>Your coach, ${coach.name}, has requested you complete the following questionnaire:</p>
          <p><strong>Questionnaire Type:</strong> ${questionnaire.type}</p>
          <p>Please click the button below to complete the questionnaire:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.APP_URL}/questionnaire/${questionnaire._id}" 
               style="background: linear-gradient(to right, #33C9A7, #3BA7F5); 
                      color: white; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 30px; 
                      font-weight: bold;">
              Complete Questionnaire
            </a>
          </div>
          <p>If you have any questions, please contact your coach directly.</p>
          <p>Best regards,</p>
          <p>The NextGen Coach Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending questionnaire email:', error);
    throw error;
  }
};

const sendSessionSummaryEmail = async (session, coach) => {
  try {
    const mailOptions = {
      from: `"NextGen Coach" <${process.env.EMAIL_FROM}>`,
      to: session.client.email,
      subject: `Session Summary: ${session.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #33C9A7;">Session Summary</h2>
          <h3>${session.title}</h3>
          <p>Date: ${new Date(session.date).toLocaleDateString()}</p>
          <p>Coach: ${coach.name}</p>
          
          ${session.summary.keyBreakthroughs ? `
            <h4 style="color: #3BA7F5; margin-top: 20px;">Key Breakthroughs</h4>
            <ul>
              ${session.summary.keyBreakthroughs.split('\n').filter(Boolean).map(item => `
                <li>${item.replace(/^- /, '').trim()}</li>
              `).join('')}
            </ul>
          ` : ''}
          
          ${session.summary.topicsCovered ? `
            <h4 style="color: #3BA7F5; margin-top: 20px;">Topics Covered</h4>
            <ul>
              ${session.summary.topicsCovered.split('\n').filter(Boolean).map(item => `
                <li>${item.replace(/^- /, '').trim()}</li>
              `).join('')}
            </ul>
          ` : ''}
          
          ${session.summary.clientCommitments ? `
            <h4 style="color: #3BA7F5; margin-top: 20px;">Action Items</h4>
            <ul>
              ${session.summary.clientCommitments.split('\n').filter(Boolean).map(item => `
                <li>${item.replace(/^- /, '').trim()}</li>
              `).join('')}
            </ul>
          ` : ''}
          
          ${session.summary.reflectiveQuestions ? `
            <h4 style="color: #3BA7F5; margin-top: 20px;">Reflective Questions</h4>
            <ul>
              ${session.summary.reflectiveQuestions.split('\n').filter(Boolean).map(item => `
                <li>${item.replace(/^- /, '').trim()}</li>
              `).join('')}
            </ul>
          ` : ''}
          
          <p style="margin-top: 30px;">You can view this summary anytime in your NextGen Coach portal.</p>
          <p>Best regards,</p>
          <p>${coach.name}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending session summary email:', error);
    throw error;
  }
};

export {
  sendQuestionnaireEmail,
  sendSessionSummaryEmail
};