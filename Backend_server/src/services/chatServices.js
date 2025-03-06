import axios from "axios";
import { query } from "../db.js";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Function to interact with the chatbot API
export const getChatbotResponse = async (userQuery, user) => {
    try {
        // Fetch relevant placement details from the database
        const placementQuery = `
            SELECT pd.job_role, c.company_name, pd.start_date, pd.work_location, pd.permanent_package 
            FROM placement_drive pd
            JOIN company c ON pd.company_id = c.company_id
            WHERE pd.start_date > CURRENT_DATE
            ORDER BY pd.start_date ASC
            LIMIT 5;
        `;
        const placementResult = await query(placementQuery);
        const placementData = placementResult.rows;

        let placementInfo = "Here are some upcoming placements:\n";
        if (placementData.length > 0) {
            placementData.forEach((drive, index) => {
                placementInfo += `${index + 1}. **${drive.job_role}** at **${drive.company_name}** (Start Date: ${drive.start_date}, Location: ${drive.work_location}, Package: ₹${drive.permanent_package} LPA)\n`;
            });
        } else {
            placementInfo = "No upcoming placements found at the moment.";
        }

        // Construct prompt with user info & placement details
        const finalPrompt = `
        User Query: "${userQuery}"
        User Info - Name: ${user.student_name}, KTU ID: ${user.ktu_id}, Gender: ${user.gender}
        ${placementInfo}
        `;

        // Make API request to Gemini
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: finalPrompt }]
                    }
                ]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        return response.data?.candidates?.[0]?.content || "Sorry, I couldn't understand.";
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch chatbot response");
    }
};
