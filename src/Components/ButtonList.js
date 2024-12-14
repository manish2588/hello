import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../utils/appSlice";

function ButtonList() {
  const [active, setActive] = useState("All");
  const dispatch = useDispatch();

  const videoByTag = (tag) => {
    if (active !== tag) {
      dispatch(setCategory(tag));
      setActive(tag);
    }
  };

  const buttonlist = [
    "All",
    "JavaScript",
    "Music",
    "Video",
    "Live",
    "Song",
    "Blogs",
    "Cricket",
    "Crime",
    "Thriller",
    "Football",
    "Movie",
    "Comedy",
  ];

  const open = useSelector((store) => store.app.open);

  return (
    <div
      className={`flex flex-row ${
        open ? "space-x-6" : "space-x-6"
      }   px-2 py-2  mt-6`}
    >
      {buttonlist.map((button, index) => (
        <button
          key={index}
          onClick={() => {
            videoByTag(button);
          }}
          className={`${
            active === button ? "bg-slate-900 text-white" : "bg-gray-200"
          } px-2  text-lg font-medium border rounded-lg`}
        >
          {button}
        </button>
      ))}
    </div>
  );
}

export default ButtonList;
