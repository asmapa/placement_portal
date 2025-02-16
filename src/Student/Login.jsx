import React from 'react';
import LoginWelcome from "../assets/LoginWelcome.avif";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <section className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className='bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl p-5'>
        <div className='sm:w-1/2 px-16'>
          <h1 className='font-bold text-2xl text-Navy'>Login</h1>
          <p className='text-sm mt-4 text-Navy'>Only Registered Students Can Login</p>

          <form className='flex flex-col gap-6' >
            <input 
              className='p-2 mt-4 rounded-xl border' 
              type="text" 
              name="college Mail" 
              placeholder='College Email' 
            />
            <input 
              className='p-2 mt-4 rounded-xl border' 
              type="password" 
              name="password" 
              placeholder='Password' 
            />
            <button 
              type="submit" 
              className='bg-Navy text-white py-2 rounded-xl mt-4 mb-2 hover:bg-red-950'
            >
              Login
            </button>
          </form>
          

          <div className='mt-10 grid grid-cols-3 items-center text-gray-400'>
            <hr className='border-gray-500'/>
            <p className='text-center'>OR</p>
            <hr className='border-gray-500'/>
          </div>
          <button className='bg-Navy text-white py-2 rounded-xl mt-4 mb-4 w-full hover:bg-green-600'
            onClick={() => navigate('/Register')}
          >Register</button>
        </div>
        <div className='sm:block hidden w-1/2'>
          <img className='rounded-2xl h-full' src={LoginWelcome} alt="Welcome" />
        </div>
      </div>
    </section>
  );
};

export default Login;
