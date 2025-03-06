import crypto from "crypto";

// Store OTPs temporarily (Consider using Redis for scalability)
const otpStore = {};

/**
 * Generates and stores OTP for an email
 * @param {string} email - User email
 * @returns {number} - Generated OTP
 */
const generateOTP = (email) => {
    const otp = crypto.randomInt(100000, 999999); // 6-digit OTP
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // Expires in 5 minutes
    return otp;
};

/**
 * Verifies OTP for an email
 * @param {string} email - User email
 * @param {number} otp - OTP entered by the user
 * @returns {boolean} - Whether OTP is valid
 */
const verifyOTP = (email, otp) => {
    const record = otpStore[email];
    if (!record) return false;

    const isValid = record.otp == otp && Date.now() < record.expiresAt;
    if (isValid) delete otpStore[email]; // Remove OTP after successful verification
    return isValid;
};

export { generateOTP, verifyOTP };
