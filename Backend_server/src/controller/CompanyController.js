import * as CompanyServices from "../services/CompanyServices.js"

// Controller function to handle student insertion
export const addCompany = async (req, res) => {
  try {
    const companyData = req.body; // JSON object received from frontend
    const newCompany = await CompanyServices.insertCompany(companyData);
    res.status(201).json({ message: "Company added successfully", company: newCompany });
  } catch (error) {
    console.error("Error inserting drive:", error);
    res.status(500).json({ error: "Failed to add drive" });
  }
};