import { query } from "../db.js";

// Function to insert a new company into the database
// Function to insert a new company into the database
export const insertCompany = async (companyData) => {
    // Correctly mapping frontend data to database column names
    const { 
        companyName, 
        contactPerson, 
        phoneNumber, 
        email, 
        address, 
        website 
    } = companyData;

    const { rows } = await query(
        `
        INSERT INTO company (
            company_name, contact_person_name, phone_number, official_mail, address, website_link
        ) VALUES (
            $1, $2, $3, $4, $5, $6
        ) RETURNING *;
        `,
        [companyName, contactPerson, phoneNumber, email, address, website] // Corrected Mapping
    );

    return rows[0];  // Returns the newly inserted company
};


// Function to get all companies
export const getAllCompanies = async () => {
    const { rows } = await query(`SELECT * FROM company;`);
    return {count: rows.length,companies: rows};
};

// Function to get a company by ID
export const getCompanyById = async (company_id) => {
    const { rows } = await query(
        `SELECT * FROM company WHERE company_id = $1;`, 
        [company_id]
    );
    return rows[0]; // Returns the company if found
};

// Function to update a company by ID
export const updateCompany = async (company_id, companyData) => {
    const { 
        company_name, 
        contact_person_name, 
        phone_number, 
        official_mail, 
        address, 
        website_link 
    } = companyData;

    const { rows } = await query(
        `
        UPDATE company SET 
            company_name = $1,
            contact_person_name = $2,
            phone_number = $3,
            official_mail = $4,
            address = $5,
            website_link = $6
        WHERE company_id = $7
        RETURNING *;
        `,
        [company_name, contact_person_name, phone_number, official_mail, address, website_link, company_id]
    );

    return rows[0]; // Returns the updated company
};

// Function to delete a company by ID
export const deleteCompany = async (company_id) => {
    const { rows } = await query(
        `DELETE FROM company WHERE company_id = $1 RETURNING *;`, 
        [company_id]
    );
    return rows[0]; // Returns the deleted company if successful
};
