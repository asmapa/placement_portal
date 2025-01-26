import React from 'react';
import { Carousel } from 'flowbite-react';
import Rit from '../assets/placement2.png';
import homeimage1 from '../assets/homeimage1.png';
import homeimage2 from '../assets/hi2.png';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

const Home = () => {
  return (
    <div>
      <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen'>
        <Carousel className='w-full mx-auto'>
          <div className='my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between'>
            <motion.div
              initial='hidden'
              whileInView='show'
              viewport={{ once: false, amount: 0.3 }} // Trigger animation when 30% of the div is visible
              variants={fadeIn('right', 0.2)} // Optional transition duration for fade-in
            >
              <img src={Rit} alt='RIT Placement' />
            </motion.div>

            <div className='md:w-1/2'>
              <motion.h1
                className='text-5xl mb-4 text-[#696969] md:w-3/4 leading-snug'
                initial='hidden'
                whileInView='show'
                viewport={{ once: false, amount: 0.3 }} // Trigger animation when 30% of the div is visible
                variants={fadeIn('right', 0.2)}
              >
                <span className='block text-Navy'>WELCOME TO</span>
                <span className='block'>RIT CAREER CONNECT</span>
              </motion.h1>

              <p className='text-[#696969] text-2xl mb-8 font-dancing'>
                Your bridge to success! Simplifying placements with streamlined updates, personalized profiles, and exclusive
                opportunities—step into your future with confidence.
              </p>
              <button className='px-7 py-2 bg-Navy text-white rounded hover:bg-[#696969] transition-all duration-300 hover:-translate-y-4'>
                Contact
              </button>
            </div>
          </div>

          {/* <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row items-center justify-between">
               <div>
                  <img src={homeimage1} alt="" />
               </div>

              <div className="md:w-1/2">
                  <h1 className="text-5xl font-itim mb-4 text-delft md:w-3/4 leading-snug">
                   Your Pathway to Excellence
                  </h1>
                  <p className="text-[#696969] text-2xl mb-8 font-dancing">Empowering students with tools for growth and success—connect, learn, and achieve your career goals with ease.</p>
                    <button className="px-7 py-2 bg-Navy text-white rounded hover:bg-[#696969] transition-all duration-300 hover:-translate-y-4">Learn More</button>
               </div>
          </div>

          <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between">
              <div>
                  <img src={homeimage2} alt="" />
              </div>

              <div className="md:w-1/2">
                  <h1 className="text-5xl font-itim mb-4 text-dolphins md:w-3/4 leading-snug">
                      From Campus to Corporate
                  </h1>
                  <p className="text-[#696969] text-2xl mb-8 font-dancing">Seamlessly transition from academics to industry with our efficient placement management system designed for your success.</p>
                  <button className="px-7 py-2 bg-Navy text-white rounded hover:bg-[#696969] transition-all duration-300 hover:-translate-y-4">Explore</button>
              </div>
          </div> */}
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
