import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const Layout = () => {
  return (
    <div className='flex flex-row bg-slate-300 h-screen w-screen overflow-hidden'>
      <SideBar/>
     
     
    </div>
  );
};

export default Layout;
