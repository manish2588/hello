import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../constant/Youtube";

function VideoCart({ video }) {
  const [icon, seticon] = useState("");

  const getChannelName = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${video.snippet.channelId}&key=${API_KEY}`
      );
      seticon(res.data.items[0].snippet.thumbnails.high.url);
    } catch (error) {
      console.error("Error fetching YouTube Video", error);
    }
  };

  useEffect(() => {
    getChannelName();
  }, []);

  return (
    <div className="flex flex-col space-y-4 cursor-pointer mt-4 mb-6 w-full">
      {/* Thumbnail Image */}
      <img
        src={video.snippet.thumbnails.high.url}
        alt={video.title}
        className="w-full h-auto object-cover rounded-lg"
      />

      {/* Channel Icon and Video Info */}
      <div className="flex flex-row space-x-4 items-start w-full">
        {/* Channel Icon */}
        <div className="mb-2 sm:mb-0">
          <img
            src={icon}
            alt="icon"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        {/* Title and Channel */}
        <div className="flex flex-col justify-between sm:h-[80px]">
          <span className="text-medium font-medium">
            {video.snippet.title}
          </span>
          <span className="text-gray-500 text-medium font-medium">
            {video.snippet.channelTitle}
          </span>
        </div>
      </div>
    </div>
  );
}

export default VideoCart;
