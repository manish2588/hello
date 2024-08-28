import React from 'react';
import ButtonList from './ButtonList';
import VideoContainer from './VideoContainer';
import { useSelector } from 'react-redux';
const Feed = () => {
  const open = useSelector((store) => store.app.open);
  return (
    <div className='flex flex-col'>
      {/* Fixed ButtonList moved 15% from the left */}
      <div className={`fixed top-18 ${open?"left-[15%]":"left-[5%]"} right-0 z-30 bg-white px-4`}>
        <ButtonList />
      </div>
      {/* VideoContainer aligned with ButtonList */}
      <div className='mt-20 px-4'>
        <VideoContainer />
      </div>
    </div>
  );
};

export default Feed;
