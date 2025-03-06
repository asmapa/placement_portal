import sendEmail from "../services/emailServices.js";
import { generateOTP, verifyOTP } from "../services/otpServices.js";

/**
 * Sends an OTP to the user's email
 * @param {Request} req
 * @param {Response} res
 */
const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: "Email is required" });

        const otp = generateOTP(email);
        await sendEmail(email, "Your OTP Code", `<p>Your OTP code is: <b>${otp}</b></p>`, true);

        res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Verifies the OTP entered by the user
 * @param {Request} req
 * @param {Response} res
 */
const verifyOTPController = (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ success: false, message: "Email and OTP are required" });

        const isValid = verifyOTP(email, otp);
        if (!isValid) return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

        res.json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { sendOTP, verifyOTPController };
