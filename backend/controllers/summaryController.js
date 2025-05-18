import { sendEmail } from "../utils/email.js";

export const sendSessionSummary = async (req, res) => {
  try {
    const { clientEmail, subject, htmlContent } = req.body;
    await sendEmail(clientEmail, subject, htmlContent);
    res.status(200).json({ message: "Summary sent to client" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error sending summary", error: err.message });
  }
};
