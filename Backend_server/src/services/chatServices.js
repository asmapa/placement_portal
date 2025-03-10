import axios from "axios";
import { query } from "../db.js";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const getChatbotResponse = async (userQuery, user) => {
    try {
        // ✅ Fetch the student's details from the database securely
        const studentQuery = `
            SELECT *
            FROM student 
            WHERE ktu_id = $1;
        `;
        const studentResult = await query(studentQuery, [user.ktu_id]);

        if (studentResult.rows.length === 0) {
            throw new Error("Student not found");
        }

        const student = studentResult.rows[0];

        // ✅ Fetch upcoming placement drives
        const placementQuery = `
            SELECT pd.job_role, c.company_name, pd.start_date, pd.work_location, pd.permanent_package, 
                   pd.no_of_backlogs_permitted, pd.supply_history_allowed, pd.min_cgpa_required, pd.focused_branches
            FROM placement_drive pd
            JOIN company c ON pd.company_id = c.company_id
            WHERE pd.start_date > CURRENT_DATE
            ORDER BY pd.start_date ASC
            LIMIT 5;
        `;
        const placementResult = await query(placementQuery);
        const placementData = placementResult.rows;

        // ✅ Format placement information and check eligibility
        let placementInfo = "Here are some upcoming placement opportunities:\n";
        if (placementData.length > 0) {
            placementData.forEach((drive, index) => {
                const isEligible = checkEligibility(student, drive);
                placementInfo += `${index + 1}. **${drive.job_role}** at **${drive.company_name}**  
                - **Start Date:** ${drive.start_date}  
                - **Location:** ${drive.work_location}  
                - **Package:** ₹${drive.permanent_package} LPA  
                - **Eligibility:** ${isEligible ? 'Eligible' : 'Not Eligible'}\n\n`;
            });
        } else {
            placementInfo = "Currently, there are no upcoming placement drives.";
        }

        // ✅ Generate personalized recommendations based on student skills and eligibility
        let recommendation = "";
        if (student.skills) {
            const skillsArray = student.skills.split(",").map(skill => skill.trim());
            recommendation = "Based on your skills (" + skillsArray.join(", ") + "), here are some recommendations:\n";
            
            placementData.forEach((drive) => {
                const jobKeywords = drive.job_role.toLowerCase().split(" ");
                const match = skillsArray.some(skill => jobKeywords.includes(skill.toLowerCase()));
                const isEligible = checkEligibility(student, drive);
                
                if (match && isEligible) {
                    recommendation += `- The **${drive.job_role}** role at **${drive.company_name}** aligns with your skills and you are eligible.\n`;
                } else if (match) {
                    recommendation += `- The **${drive.job_role}** role at **${drive.company_name}** aligns with your skills but you are not eligible.\n`;
                }
            });

            if (!recommendation.includes("- ")) {
                recommendation += "You may want to explore roles that match your skill set or consider enhancing your skills based on industry trends.\n";
            }
        } else {
            recommendation = "It looks like your skills haven't been updated. Keeping your skills updated will help in receiving better recommendations.";
        }

        // ✅ Construct a better prompt for Gemini
        const finalPrompt = `
        You are a placement chatbot assisting students at Rajiv Gandhi Institute of Technology(RIT).
        A student has asked: "${userQuery}"

        **Student Details:**
        - Name: ${user.student_name}
        - KTU ID: ${user.ktu_id}
        - Department: ${student.department}
        - Program: ${student.program}
        - Semester: ${student.semester}
        - Graduation Year: ${student.year_of_graduation}
        - CGPA: ${student.cgpa}
        - No. of Backlogs: ${student.no_of_backlogs}
        - Supply History: ${student.supply_history ? 'Yes' : 'No'}
        - Skills: ${student.skills || "Not updated"}

        **Placement Drives Information:**
        ${placementInfo}

        **Personalized Recommendation:**
        ${recommendation}

        **Placement Guidelines:**
        1. All final year students from the Institute have to register with CGPC to be eligible for placement drive for the corresponding passout year. Placement Registration is for one academic year only and will be done during the month of July.

        2. Registration is not compulsory. Students not interested in placement are advised not to register for placement. Due to the current pandemic situation if all placements are carried out virtually, 50% of fees will be refunded at the end of academic year.

        3. It is mandatory that there be 75% attendance for the Placement training conducted during the previous year by CGPC to be eligible for Placement registration in the subsequent year.

        4. For each placement drive students are required to apply in the CGPC portal to express their interest in the job offer. The portal shall be kept open for a stipulated time of 2 days.

        5. The following guideline shall be followed for applying :

        Companies are divided into four categories i.e., Open, IT, Core, Dream.

        A student who is placed in ‘Dream’ company can only appear for a Core company

        A student who is placed in ‘Core’ company can appear for a Dream company placement drive.

        A student who is placed in 'IT' company can appear either for Core or Dream

        A student placed in a 'Open' company can appear for any of the other placement drives.

        A student is eligible to get a maximum of two placement offers through CGPC except for Open drives.

        6. A student who applies/registers for a drive is bound to go through the entire selection process unless rejected midway by the company. Students abstaining from placement drive would automatically be de-registered from CGPC and would become ineligible for all subsequent drives.

        7. All students shall be encouraged to do volunteering for CGPC, but volunteering that affects student’s academics/exams shall not be encouraged. Volunteering points shall be one of the yardsticks for recommendation for 2nd placement opportunity or for off-campus drives. A student getting placed shall have to render at the least a day’s volunteering service for CGPC.

        8. CGPC is run by volunteering services of Staff and Students. All CGPC registered students are required to be courteous Team CGPC at all times and must ensure they don't waste the opportunities provided.

        9. Any clarification regarding salary break-up, job profile, place of work, bond details etc. must be sought from the companies during pre-placement presentation or interview process.

        10. Notices of the pre-placement talk (PPT) will be published in the placement website well in advance. Students should be seated in the venue 15 minutes before the scheduled start of the PPT.

        11. Students must be formally dressed whenever they participate in any interaction with a company.

        12. It is the responsibility of the student to check announcements / notices / updated information / shortlisted names etc. in the notice boards of Placement Office / Website. Students are expected to be punctual. Late comers for aptitude test / GD / interview may not be allowed to appear for the selection process.

        13. Students should maintain discipline and show ethical behaviour during the placement process. Any student found violating the discipline rules set by the company or defaming the institute name will be disallowed from the placements for the rest of the academic year.

        14. The Placement offer (by the company) and its acceptance (by the student) shall be through placement office only.

        15. Each student is eligible for only one job offer. If a student receives more than one offer and if there is a delay in the announcement of results by some companies, the student is bound to accept the job offer of the company whose results are declared in time.

        16. Students who go for higher studies and who decide not to join a company, should inform the company in writing at the earliest with the copy to Placement Office.

        17. For all matters not covered by the above guidelines, CGPC will use its discretion to take appropriate decisions. The decision taken by this office shall be binding on all students.

        Answer the student's query in a friendly and helpful way. Use 'you' instead of 'he'/'she' since the student is asking personally. Ensure your response is clear and engaging.
        `;

        // ✅ Make API request to Gemini
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: finalPrompt }] }]
            },
            { headers: { "Content-Type": "application/json" } }
        );

        return response.data?.candidates?.[0]?.content || "Sorry, I couldn't understand your query.";
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch chatbot response: " + (error.response?.data?.error?.message || error.message));
    }
};

// ✅ Helper function to check eligibility
const checkEligibility = (student, drive) => {
    const isCgpaEligible = student.cgpa >= drive.min_cgpa_required;
    const isBacklogsEligible = student.no_of_backlogs <= drive.no_of_backlogs_permitted;
    const isSupplyHistoryEligible = drive.supply_history_allowed || !student.supply_history;
    const isDepartmentEligible = drive.focused_branches.includes(student.department);

    return isCgpaEligible && isBacklogsEligible && isSupplyHistoryEligible && isDepartmentEligible;
};