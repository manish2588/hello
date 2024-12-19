import React from 'react';
import ButtonList from './ButtonList';
import VideoContainer from './VideoContainer';
import { useSelector } from 'react-redux';

const Feed = () => {
  const open = useSelector((store) => store.app.open);

  return (
    <div className="flex flex-col">
      {/* Fixed ButtonList moved 15% from the left */}
      <div
        className={`fixed top-18 ${open ? "lg:left-[15%] " : "lg:left-[5%]"} sm:left-0 right-0 z-30 bg-white px-4 box-border sm:block hidden`}
      >
        <ButtonList />
      </div>
      {/* VideoContainer aligned with ButtonList */}
      <div className=" mt-4 lg:mt-20 px-4">
        <VideoContainer />
      </div>
    </div>
  );
};

export default Feed;
