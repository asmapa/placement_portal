import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AddRounds = () => {
  const { round } = useParams(); // Get 'round' from URL
  const navigate = useNavigate();
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    if (!isNaN(round) && round > 0) {
      setRounds(
        Array(parseInt(round)).fill().map(() => ({
          roundNo: "", roundType: "", mode: "", date: "", location: "", duration: "",
        }))
      );
    } else {
      MySwal.fire({
        title: "Error",
        text: "Invalid number of rounds provided!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [round]);

  const handleInputChange = (index, field, value) => {
    const newRounds = [...rounds];
    newRounds[index][field] = value;
    setRounds(newRounds);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show success alert
    MySwal.fire({
      title: "Good Job!",
      text: `You have successfully registered ${round} rounds!`,
      icon: "success",
      confirmButtonText: "OK",
      timer: 2000,
    });

    console.log(rounds);
    navigate("/Admin-dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-[#005f69] font-bold text-2xl text-center mb-4">
        Add Rounds for {round} Rounds
      </h2>

      <form onSubmit={handleSubmit}>
        {rounds.map((round, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md my-4">
            <h3 className="text-lg font-semibold text-[#005f69] mb-2">Round {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Round Type"
                className="input-field"
                onChange={(e) => handleInputChange(index, "roundType", e.target.value)}
              />
              <input
                type="text"
                placeholder="Mode"
                className="input-field"
                onChange={(e) => handleInputChange(index, "mode", e.target.value)}
              />
              <input
                type="date"
                className="input-field"
                onChange={(e) => handleInputChange(index, "date", e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                className="input-field"
                onChange={(e) => handleInputChange(index, "location", e.target.value)}
              />
              <input
                type="text"
                placeholder="Duration"
                className="input-field"
                onChange={(e) => handleInputChange(index, "duration", e.target.value)}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-center my-6">
          <button
            type="submit"
            className="bg-[#005f69] text-white font-bold rounded-lg px-6 py-2 hover:bg-[#004f58] transition duration-300 w-1/2"
          >
            Save Rounds
          </button>
        </div>
      </form>

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
