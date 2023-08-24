import { useState } from "react";

import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

import { logo } from "../assets";
import { links } from "../assets/constants";

const NavLinks = ({ handleClick }) => {
  return (
    <div className="mt-8">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.to}
          onClick={() => handleClick && handleClick()}
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        >
          <link.icon className="w-6 h-6 mr-3" />
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const iconClass =
    "w-6 h-6 text-white mr-2 cursor-pointer hover:text-cyan-200";
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-3 right-3">
        {mobileMenu ? (
          <RiCloseLine
            className={iconClass}
            onClick={() => setMobileMenu(false)}
          />
        ) : (
          <HiOutlineMenu
            className={iconClass}
            onClick={() => setMobileMenu(true)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-1/2 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenu ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenu(false)} />
      </div>
    </>
  );
};

export default Sidebar;
