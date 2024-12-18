import React from 'react'
import { useParams } from 'react-router-dom';

function Category() {
    const params=useParams();
    console.log("Params",params)
    const category=params.category;
  return (
    <>
 <div className='w-full h-screen bg-slate-300 mt-8'>
 <h1 > This is video by sidebar category:{category}</h1>
 </div>
    
    </>
  )
}

export default Category;