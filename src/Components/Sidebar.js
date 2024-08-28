import React from "react";
import { useSelector } from "react-redux";
import home from "../assets/home.png";
import game from "../assets/game_icon.png";
import automobiles from "../assets/automobiles.png";
import sports from "../assets/sports.png";
import entertainment from "../assets/entertainment.png";
import music from "../assets/music.png";
import tech from "../assets/tech.png";
import blogs from "../assets/blogs.png";
import news from "../assets/news.png";
import tom from "../assets/tom.png";
import cameron from "../assets/cameron.png";
import megan from "../assets/megan.png";
import jack from "../assets/jack.png";

function Sidebar() {
  const open = useSelector((store) => store.app.open);

  return (
    <div
      className={`bg-gray-100 h-screen fixed top-24 left-0 transition-width duration-300 ${
        open ? "w-[15%]" : "w-[5%]"
      }`}
    >
      <div className="space-y-6 ml-6 mt-6">
        <SidebarItem src={home} label="Home" isOpen={open} />
        <SidebarItem src={game} label="Game" isOpen={open} />
        <SidebarItem src={automobiles} label="Automobiles" isOpen={open} />
        <SidebarItem src={sports} label="Sports" isOpen={open} />
        <SidebarItem src={entertainment} label="Entertainment" isOpen={open} />
        <SidebarItem src={music} label="Music" isOpen={open} />
        <SidebarItem src={blogs} label="Blogs" isOpen={open} />
        <SidebarItem src={news} label="News" isOpen={open} />
        <SidebarItem src={tech} label="Technology" isOpen={open} />
        {open && <p className="text-2xl font-semibold">Subscription</p>}
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
    <div className="flex items-center space-x-8">
      <img
        src={src}
        alt={label}
        className={`w-8 h-8 ${isRounded ? "rounded-full w-10 h-10" : ""}`}
      />
      {isOpen && <span className="text-lg font-medium">{label}</span>}
    </div>
  );
}

export default Sidebar;
