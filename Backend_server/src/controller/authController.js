import { loginUser } from "../services/authServices.js";
import logger from "../utils/logger.js"; // Ensure you have a logger

export const login = async (req, res) => {
  const { rit_email, password } = req.body;

  if (!rit_email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const result = await loginUser(rit_email, password);

    if (!result.success) {
      logger.warn(`Login failed for email: ${rit_email}`);
      return res.status(401).json({ message: result.message });
    }

    logger.info(`User logged in: ${rit_email}`);
    res.status(200).json({ message: "Login successful", token: result.token });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
