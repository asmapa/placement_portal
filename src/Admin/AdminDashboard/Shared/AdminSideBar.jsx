import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Female from '../../../assets/Ritktym.png';
import {DASHBOARD_SIDEBAR_LINKS } from '../../../lib/consts/AdminNavigation';
import classNames from 'classnames';
import { HiOutlineLogout,HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

const AdminSideBar = () => {

  const [Touch, setTouch] = useState(false);

  return (
    <div className={`bg-[#005f69] ${Touch ? 'w-30' : 'w-60'} p-3 flex flex-col text-white h-screen`}>
     
      <div className='flex justify-end'>
        <button
          className='text-2xl'
          onClick={() => setTouch(!Touch)}
        >
          {Touch ? <HiChevronDoubleRight /> : <HiChevronDoubleLeft />}
        </button>
     </div>
     
    

      {!Touch && (
          <div className='flex flex-col items-center'>
        <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
          <img src={Female} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <p className='text-white text-center font-bold'>ADMIN PANEL</p>
        <hr className='border-white w-full my-2' />
      </div>
      )}
      <div className='flex-1 '>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} Touch={ Touch} />
        ))}
      </div>
      <hr className='border-white w-full my-2' />
      <div >
       
        <div className=' flex items-center text-red-500 gap-4 font-extrabold mt-2 px-3 py-2 no-underline rounded-sm text-base transition-colors duration-200'>
          <span className='text-xl'>< HiOutlineLogout/></span>
          {!Touch && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

function SidebarLink({ item ,Touch}) {
  const { pathname } = useLocation();

  return (
    <Link
    to={item.path}
    className="flex items-center gap-4 font-extrabold mt-4 px-3 py-2 no-underline rounded-sm text-base text-white hover:bg-blue-400 transition-colors duration-200"
  > 
    <span className="mr-3 text-2xl">{item.icon}</span>
     
      {!Touch &&  <span>{item.label}</span>}
  </Link>
  
  );
}



export default AdminSideBar;
