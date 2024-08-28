import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../constant/Youtube";

function VideoCart({ video }) {
  const [icon, seticon] = useState("");

  const getChannelName = async () => {
    try {
      const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${video.snippet.channelId}&key=${API_KEY}`);
      console.log(res);
      seticon(res.data.items[0].snippet.thumbnails.high.url);
    } catch (error) {
      console.error("Error fetching YouTube Video", error);
    }
  };

  useEffect(() => {
    getChannelName();
  }, []);

  return (
    <div className="flex flex-col space-y-4 cursor-pointer mt-4 mb-6">
      <img
        src={video.snippet.thumbnails.high.url} // Replace with the actual video thumbnail URL
        alt={video.title} // Replace with the actual video title for alt text
        className="w-[25vw] h-[15vw] object-cover rounded-lg"
      />

      <div className="flex space-x-4 items-start w-[25vw]">
        <div>
          <img src={icon} alt="icon" className="w-[45px] h-[45px] rounded-full object-cover"/>
        </div>
        <div className="flex flex-col justify-between h-[75px]">
          <span className="text-lg font-bold">
            {video.snippet.title}
          </span>
          <span className="text-gray-500 text-lg">{video.snippet.channelTitle}</span>
        </div>
      </div>
    </div>
  );
}

export default VideoCart;
