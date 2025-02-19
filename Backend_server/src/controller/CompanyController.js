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


export const getAllCompanies = async (req, res) => {
  try {
    // Get companies from the service layer
     const companies = await CompanyServices.getAllCompanies();
    res.status(200).json(companies); // Return companies in JSON format
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { company_id, ...companyData } = req.body; // Extract company_id from body and the rest as companyData
    const updatedCompany = await CompanyServices.updateCompany(company_id, companyData); // Call service function
    res.status(200).json({ message: "Company updated successfully", company: updatedCompany }); // Send success response
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ error: "Failed to update company" }); // Send error response
  }
};

export const deleteCompany = async (req, res) => {
    try {
        const { company_id } = req.params; // Get company_id from the route params
        const deletedCompany = await CompanyServices.deleteCompany(company_id);

        if (!deletedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }

        return res.status(200).json({
            message: 'Company deleted successfully',
            data: deletedCompany
        });
    } catch (error) {
        console.error('Error deleting company:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const getCompanies = async (req, res) => {
  try {
    const companies = await CompanyServices.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};