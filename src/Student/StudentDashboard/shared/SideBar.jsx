import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Female from '../../../assets/FemaleAvatar.png';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../../lib/consts/navigation';
import { HiOutlineLogout, HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false); // State to toggle sidebar collapse

  return (
    <div
      className={`bg-Navy ${collapsed ? 'w-20' : 'w-60'} p-3 flex flex-col text-white h-screen transition-all duration-300`}
    >
      {/* Collapse Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white text-2xl focus:outline-none transition-all"
        >
          {collapsed ? <HiChevronDoubleRight /> : <HiChevronDoubleLeft />}
        </button>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
            <img src={Female} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <p className="text-white text-center font-bold">ANJANA K SANTOSH</p>
          <p className="text-white text-center font-semibold">LKTE22CS068</p>
          <hr className="border-white w-full my-2" />
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} collapsed={collapsed} />
        ))}
      </div>
      <hr className="border-white w-full my-2" />

      {/* Bottom Links */}
      <div>
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} collapsed={collapsed} />
        ))}

        <div className="flex items-center text-red-500 gap-4 font-extrabold mt-2 px-3 py-2 no-underline rounded-sm text-base transition-colors duration-200">
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

function SidebarLink({ item, collapsed }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={`flex items-center gap-4 font-extrabold mt-4 px-3 py-2 no-underline rounded-sm text-base text-white hover:bg-blue-400 transition-colors duration-200 ${
        collapsed ? 'justify-center' : ''
      }`}
    >
      <span className="text-2xl">{item.icon}</span>
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

export default SideBar;
