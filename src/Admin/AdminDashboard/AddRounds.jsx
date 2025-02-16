import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddRounds = ({ driveId }) => {
    const navigate = useNavigate();
    const [numRounds, setNumRounds] = useState(1);
    const [rounds, setRounds] = useState([]);

    // Handle number of rounds change
    const handleRoundsChange = (e) => {
        const count = parseInt(e.target.value);
        setNumRounds(count);
        setRounds(Array(count).fill().map(() => ({
            roundNo: "", roundType: "", mode: "", date: "", location: "", duration: ""
        })));
    };

    // Handle input change
    const handleInputChange = (index, field, value) => {
        const newRounds = [...rounds];
        newRounds[index][field] = value;
        setRounds(newRounds);
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/rounds", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ driveId, rounds }),
        })
        .then(res => res.json())
        .then(data => console.log("Rounds saved!", data))
        .catch(err => console.error("Error saving rounds", err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-[#005f69] font-bold text-2xl text-center mb-4">Add Rounds for Drive ID: {driveId}</h2>

            <div className="mb-6">
                <label className="text-lg font-bold text-[#005f69] block mb-2 text-2xl">Number of Rounds:</label>
                <input 
                    className="border-[#005f69] rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#005f69]"
                    type="number" 
                    min="1" 
                    value={numRounds} 
                    onChange={handleRoundsChange} 
                />
            </div>

            {/* Dynamic Round Fields */}
            <form onSubmit={handleSubmit}>
                {rounds.map((round, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md my-4">
                        <h3 className="text-lg font-semibold text-[#005f69] mb-2">Round {index + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Round Type" className="input-field" onChange={(e) => handleInputChange(index, "roundType", e.target.value)} />
                            <input type="text" placeholder="Mode" className="input-field" onChange={(e) => handleInputChange(index, "mode", e.target.value)} />
                            <input type="date" className="input-field" onChange={(e) => handleInputChange(index, "date", e.target.value)} />
                            <input type="text" placeholder="Location" className="input-field" onChange={(e) => handleInputChange(index, "location", e.target.value)} />
                            <input type="text" placeholder="Duration" className="input-field" onChange={(e) => handleInputChange(index, "duration", e.target.value)} />
                        </div>
                    </div>
                ))}
                <div className="flex justify-center my-6">
                    <button type="submit" onClick={()=>navigate("/Admin-dashboard")} className="bg-[#005f69] text-white font-bold rounded-lg px-6 py-2 hover:bg-[#004f58] transition duration-300 w-1/2">Save Rounds</button>
                </div>
            </form>

            {/* Tailwind CSS for input fields */}
            <style jsx>{`
                .input-field {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #005f69;
                    border-radius: 8px;
                    outline: none;
                    transition: 0.3s;
                }
                .input-field:focus {
                    border-color: #004f58;
                    box-shadow: 0 0 5px #004f58;
                }
            `}</style>
        </div>
    );
};

export default AddRounds;
