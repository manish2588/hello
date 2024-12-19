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
        className={`transition-all duration-300 box-border ${
          open
            ? "lg:ml-[15%] w-[80%] sm:w-full"
            : "lg:ml-[5%] w-[90%] sm:w-full"
        } p-2`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Body;
