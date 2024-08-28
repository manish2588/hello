import React from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function Body() {
  const open = useSelector((store) => store.app.open);

  return (
    <div className="flex pt-16">
      <Sidebar />
      <div
        className={`transition-all duration-300 ${
          open ? "ml-[15%] w-[85%]" : "ml-[5%] w-[95%]"
        } p-4`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Body;
