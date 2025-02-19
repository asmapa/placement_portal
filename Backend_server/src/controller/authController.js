import { loginUser } from "../services/authServices.js";

export const login = async (req, res) => {
  const { rit_email, password } = req.body;

  if (!rit_email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const result = await loginUser(rit_email, password);
    
    if (!result.success) {
      return res.status(401).json({ message: result.message });
    }

    res.status(200).json({ message: "Login successful", token: result.token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
