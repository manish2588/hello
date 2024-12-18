import React from "react";
import { useDispatch, useSelector } from "react-redux";
import tom from "../assets/tom.png";
import cameron from "../assets/cameron.png";
import megan from "../assets/megan.png";
import jack from "../assets/jack.png";
import { SiYoutubeshorts } from "react-icons/si";
import { TbTrendingUp } from "react-icons/tb";
import { SiYoutubegaming } from "react-icons/si";
import { GiTrophyCup } from "react-icons/gi";
import { IoMdMusicalNote } from "react-icons/io";
import { MdOutlineSubscriptions } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";
import { setCategory } from "../utils/appSlice";
function Sidebar() {
  const open = useSelector((store) => store.app.open);

  return (
    <div
      className={`bg-gray-100 h-screen fixed top-24 left-0 transition-all duration-300 
      ${open ? "w-[15%]" : "w-[5%]"} 
      md:block hidden`} // Sidebar is hidden on small screens and takes no space
    >
      <div className="space-y-6 ml-6 mt-6">
        <NavLink to="/">
          {" "}
          <SidebarItem1
            avatar={<GoHome size={25} />}
            label="Home"
            isOpen={open}
          />
        </NavLink>
        <SidebarItem1
          avatar={<SiYoutubeshorts size={25} />}
          label="Shorts"
          isOpen={open}
        />
        <SidebarItem1
          avatar={<MdOutlineSubscriptions size={25} />}
          label="Subscriptions"
          isOpen={open}
        />
        {open && <p className="text-xl font-medium">Exploree</p>}
        <SidebarItem2
          avatar={<SiYoutubegaming size={25} />}
          label="Gaming"
          isOpen={open}
        />
        <SidebarItem2
          avatar={<IoMdMusicalNote size={25} />}
          label="Music"
          isOpen={open}
        />
        <SidebarItem2
          avatar={<TbTrendingUp size={25} />}
          label="Trending"
          isOpen={open}
        />
        <SidebarItem2
          avatar={<GiTrophyCup size={25} />}
          label="Sport"
          isOpen={open}
        />
        {open && <p className="text-xl font-medium">Subscription</p>}
        <SidebarItem src={tom} label="BBK Vines" isOpen={open} isRounded />
        <SidebarItem src={megan} label="ICC" isOpen={open} isRounded />
        <SidebarItem src={jack} label="Cr7 Hora" isOpen={open} isRounded />
        <SidebarItem src={cameron} label="Mafianinja" isOpen={open} isRounded />
      </div>
    </div>
  );
}

function SidebarItem({ src, label, isOpen, isRounded = false }) {
  return (
    <div>
      {isOpen && (
        <div className="flex items-center space-x-8">
          <img
            src={src}
            alt={label}
            className={`w-8 h-8 ${isRounded ? "rounded-full w-10 h-10" : ""}`}
          />
          <span className="text-medium font-normal">{label}</span>
        </div>
      )}
    </div>
  );
}

function SidebarItem1({ label, isOpen, avatar }) {
  return (
    <div
      className={`flex items-center ${
        isOpen ? "flex-row space-x-8" : "flex-col space-y-1"
      }`}
    >
      <div>{avatar}</div>
      <span
        className={isOpen ? "text-medium font-normal" : "text-xs text-center"}
      >
        {label}
      </span>
    </div>
  );
}

function SidebarItem2({ label, isOpen, avatar }) {
  const dispatch = useDispatch();

  const handleClick = (label) => {
    dispatch(setCategory(label));
  };
  return (
    <div>
      {isOpen && (
        <div
          className="flex items-center space-x-8"
          onClick={() => handleClick({ label })}
        >
          <div> {avatar}</div>
          <span className="text-medium font-normal">{label}</span>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
