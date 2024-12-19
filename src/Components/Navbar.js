import React, { useState, useEffect } from "react";
import upload from "../assets/upload.png";
import { CiSearch } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import notify from "../assets/notification.png";
import pp from "../assets/jack.png";
import { useDispatch, useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import {
  toggleSidebar,
  setCategory,
  setSearchSuggestion,
} from "../utils/appSlice";
import { SEARCH_SUGGESTIONS_API } from "../constant/Youtube";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Navbar() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState(false);
  const dispatch = useDispatch();
  const { searchSuggestion } = useSelector((store) => store.app);
  const [isMicOn, setIsMicOn] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
      searchVideo();
    }
  }, [transcript]);

  const searchVideo = () => {
    if (input.trim()) {
      dispatch(setCategory(input));
      setSuggestion(false);
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    dispatch(setCategory(suggestionText));
    setSuggestion(false);
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchVideo();
    }
  };

  const toggleHandler = () => {
    dispatch(toggleSidebar());
  };

  const showSuggestion = async () => {
    try {
      const res = await axios.get(SEARCH_SUGGESTIONS_API + input);
      dispatch(setSearchSuggestion(res?.data[1]));
    } catch (error) {
      console.log(error);
    }
  };

  const openSuggestion = () => {
    setSuggestion(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      showSuggestion();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  const handleVoiceSearch = () => {
    if (isMicOn) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsMicOn(!isMicOn);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-24 flex items-center px-6 bg-white z-50 ">
        {/* Small Screen Layout */}
        <div className="flex justify-between  w-full lg:hidden">
          {/* YouTube Logo */}{" "}
          <div className="flex items-center space-x-2">
            
            <FaYoutube size={40} color="red" />
            <span className="text-3xl font-semibold">Youtube</span>
          </div>
          {/* Profile Icon */}
          <img
            src={pp}
            alt="profile"
            className="rounded-full cursor-pointer w-12 h-12"
          />
        </div>

        {/* Large Screen Layout */}
        <div className="hidden lg:flex justify-between items-center w-full">
          {/* Left Section */}
          <div className="flex items-center space-x-10 basis-1/4">
            <RxHamburgerMenu size={32} onClick={toggleHandler} />
            <div className="flex items-center space-x-2">
              <FaYoutube size={36} color="red" />
              <span className="text-2xl font-semibold">Youtube</span>
            </div>
          </div>

          {/* Middle Section */}
          <div className="relative flex items-center basis-2/4">
            <input
              onFocus={openSuggestion}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              value={input}
              placeholder="Search"
              className="border border-gray-200 rounded-l-full w-full px-4 py-2 text-2xl h-10"
            />
            <CiSearch
              className="px-2 py-1 cursor-pointer bg-gray-100 rounded-r-full w-20 border border-gray-200"
              onClick={searchVideo}
              size={40}
            />
            <FaMicrophone
              className={`px-2 py-1 mt-1 cursor-pointer rounded-r-full w-20 ${
                isMicOn ? "text-red-500" : ""
              }`}
              onClick={handleVoiceSearch}
              size={36}
            />
            {suggestion && searchSuggestion.length !== 0 && (
              <div className="absolute top-1 z-50 w-[82%] py-5 bg-white shadow-lg mt-12 rounded-lg border border-gray-200">
                <ul>
                  {searchSuggestion.map((text, idx) => (
                    <div
                      key={idx}
                      className="flex items-center px-4 hover:bg-gray-100"
                      onClick={() => handleSuggestionClick(text)}
                    >
                      <CiSearch size="24px" />
                      <li className="px-2 py-1 cursor-pointer text-lg font-semibold">
                        {text}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-8 basis-1/4 justify-end mr-8">
            <img
              src={upload}
              alt="upload"
              className="cursor-pointer p-1 w-10 h-10"
            />
            <img
              src={notify}
              alt="notification"
              className="cursor-pointer p-1 w-10 h-10"
            />
            <img
              src={pp}
              alt="profile"
              className="rounded-full cursor-pointer p-1 w-10 h-10"
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
