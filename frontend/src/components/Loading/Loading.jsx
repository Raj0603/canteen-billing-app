import React from 'react'
import "./Loading.css"
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className='loading-main'>
        <HashLoader color="#E74C3C" size={200} />
    </div>
  )
}

export default Loading