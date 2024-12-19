import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../utils/appSlice";

function ButtonList() {
  const [active, setActive] = useState("All");
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);

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
    "Crime",
    "Thriller",
    "Football",
    "Movie",
    "Comedy",
  ];

  const open = useSelector((store) => store.app.open);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 300; // Adjust scroll step
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else if (direction === "right") {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="mt-6 px-4 relative mb-4">
      {/* Button List Container */}
      <div className={`flex items-center relative ${open ? "space-x-8" : "space-x-8"}`}>
        {/* Left Arrow for Large Screens */}
        {buttonlist.length > 10 && (
          <button
            className="hidden lg:flex absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-10 p-2  rounded-full shadow-md hover:scale-110"
            onClick={() => handleScroll("left")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        )}

        {/* Scrollable Button Container */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-2 overflow-x-auto lg:overflow-hidden lg:flex-nowrap w-full scrollbar-hide`}
          style={{
            WebkitOverflowScrolling: "touch",
            minWidth: "100%",  // Make sure container is large enough
          }}
        >
          {buttonlist.map((button, index) => (
            <button
              key={index}
              onClick={() => videoByTag(button)}
              className={`${
                active === button ? "bg-slate-900 text-white" : "bg-gray-200"
              } flex-shrink-0 px-4 py-0.5 text-medium font-medium border rounded-lg`}
              style={{ minWidth: "80px" }} // Ensure button width is large enough
            >
              {button}
            </button>
          ))}
        </div>

        {/* Right Arrow for Large Screens */}
        {buttonlist.length > 10 && (
          <button
            className="hidden lg:flex absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110"
            onClick={() => handleScroll("right")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default ButtonList;
