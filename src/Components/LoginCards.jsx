import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import officer from '../assets/officer.png';
import student from '../assets/student.png';
import { useNavigate } from 'react-router-dom'; // Make sure this is imported

const LoginCards = () => {
  const [studentHover, setStudentHover] = useState(false); // Hover state for student button
  const [registerHover, setRegisterHover] = useState(false); // Hover state for register button
  const [placementHover, setPlacementHover] = useState(false); // Hover state for placement button

  const navigate = useNavigate(); // Navigate function

  const handleMouseEnter = (button) => {
    if (button === 'student') setStudentHover(true);
    if (button === 'register') setRegisterHover(true);
    if (button === 'placement') setPlacementHover(true);
  };

  const handleMouseLeave = (button) => {
    if (button === 'student') setStudentHover(false);
    if (button === 'register') setRegisterHover(false);
    if (button === 'placement') setPlacementHover(false);
  };

  const handleLogin = () => {
    navigate('/login'); // Navigate to login page
  };

  // Dynamic button styles
  const buttonStyle = (hover) => ({
    backgroundColor: hover ? 'gray' : 'navy', // Change color on hover
    color: 'white',
    borderRadius: '0.375rem',
    padding: '0.5rem 1.75rem',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer', // Optional: change cursor to pointer on hover
  });

  return (
    <div className='md:px-14 px-4 py-16 max-w-screen-2xl mx-auto'>
      <div className='flex justify-center gap-28'>
        {/* Student Card */}
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={student} />
          <Card.Body>
            <Card.Title style={{ fontSize: '1.5rem', color: 'navy', fontWeight: 'bold' }}>Student</Card.Title>
            <Card.Text style={{ fontSize: '1rem', color: '#696969', lineHeight: '1.5' }}>
              "Access your personalized placement updates and resources. Login to stay connected with opportunities tailored for you."
            </Card.Text>
            <div className="d-flex gap-4 justify-center">
              <Button
                style={buttonStyle(studentHover)}
                onMouseEnter={() => handleMouseEnter('student')}
                onMouseLeave={() => handleMouseLeave('student')}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                style={buttonStyle(registerHover)}
                onMouseEnter={() => handleMouseEnter('register')}
                onMouseLeave={() => handleMouseLeave('register')}
              >
                Register
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Placement Cell Card */}
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={officer} />
          <Card.Body>
            <Card.Title style={{ fontSize: '1.5rem', color: 'navy', fontWeight: 'bold' }}>Placement cell</Card.Title>
            <Card.Text style={{ fontSize: '1rem', color: '#696969', lineHeight: '1.5' }}>
              "Manage student profiles and placement activities effortlessly. Track company visits, interview schedules, and placement results."
            </Card.Text>
            <div className="d-flex gap-4 justify-center">
              <Button
                style={buttonStyle(placementHover)}
                onMouseEnter={() => handleMouseEnter('placement')}
                onMouseLeave={() => handleMouseLeave('placement')}
              >
                Login
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LoginCards;
