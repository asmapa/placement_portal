import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import officer from '../assets/officer.png'
import student from '../assets/student.png'

const LoginCards = () => {
  return (
    <div className='md:px-14 px-4 py-16 max-w-screen-2xl mx-auto'>
      {/* Flex container to center the cards */}
      <div className='flex justify-center gap-28'>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={student} />
          <Card.Body>
            <Card.Title style={{ fontSize: '1.5rem', color: 'navy', fontWeight: 'bold' }}>Student</Card.Title>
            <Card.Text style={{ fontSize: '1rem', color: '#696969', lineHeight: '1.5' }}>
            "Access your personalized placement updates and resources. Login to stay connected with opportunities tailored for you."
            </Card.Text>
            <div className="d-flex gap-4 justify-center">
            <Button 
               style={{ 
                   backgroundColor: 'navy', 
                   color: 'white', 
                   borderRadius: '0.375rem', 
                   padding: '0.5rem 1.75rem',
                   transition: 'all 0.3s ease-in-out' 
                  }}

                  
                  >
                         Login
            </Button>
            <Button 
               style={{ 
                   backgroundColor: 'navy', 
                   color: 'white', 
                   borderRadius: '0.375rem', 
                   padding: '0.5rem 1.75rem',
                   transition: 'all 0.3s ease-in-out' ,
                   
                  }}
                  >
                         Register
            </Button>
            </div>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={officer} />
          <Card.Body>
            <Card.Title style={{ fontSize: '1.5rem', color: 'navy', fontWeight: 'bold' }}>Placement cell</Card.Title>
            <Card.Text style={{ fontSize: '1rem', color: '#696969', lineHeight: '1.5' }}>
            "Manage student profiles and placement activities effortlessly. Track company visits, interview schedules, and placement results. Update job openings and notify eligible students instantly. Streamline the entire placement."
            </Card.Text>
            <div className="d-flex  gap-4 justify-center">
            <Button 
               style={{ 
                   backgroundColor: 'navy', 
                   color: 'white', 
                   borderRadius: '0.375rem', 
                   padding: '0.5rem 1.75rem',
                   transition: 'all 0.3s ease-in-out' 
                  }}
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
