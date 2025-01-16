import React from 'react';
import Female from '../../../assets/FemaleAvatar.png';
import { DASHBOARD_SIDEBAR_LINKS } from '../../../lib/consts/navigation';

const SideBar = () => {
  return (
    <div className='bg-Navy w-60 p-3 flex flex-col text-white'>
      <div className='flex flex-col items-center'>
        <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
          <img src={Female} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <p className='text-white text-center'>ANJANA K SANTOSH</p>
        <p className='text-white text-center'>LKTE22CS068</p>
        <hr className='bg-white w-full my-2' />
      </div>
      <div className='flex-1'>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
            <div key={item.key}>
                {item.label}
            </div>
        ))}

        
      </div>
      <div className='border-t border-white pt-2 text-center'>Bottom div</div>
    </div>
  );
}

export default SideBar;
