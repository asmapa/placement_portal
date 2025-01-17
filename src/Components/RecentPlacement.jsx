import React from 'react'
import Rit from '../assets/placed_1.png'
import homeimage1 from '../assets/placed_2.png'
import homeimage2 from '../assets/placed_3.png'
import { Carousel } from 'flowbite-react';
const RecentPlacement = () => {
  return (
    <div>
       {/* Carousel Section */}
       <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto h-80">
        <Carousel className="w-full mx-auto">
          <div className="h-80">
            <img
              src={Rit}
              alt="Image 1"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="h-80">
            <img
              src={homeimage1}
              alt="Image 2"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="h-80">
            <img
              src={homeimage2}
              alt="Image 3"
              className="h-full w-full object-cover"
            />
          </div>
        </Carousel>
      </div>
    </div>
  )
}

export default RecentPlacement
