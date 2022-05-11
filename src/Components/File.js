
import React from 'react'
import './Folders.css'
const File = ({name,id}) => {
  return (
    <div data-id={id}>
        <img alt='file' className='fileImage' width='18px' src={require("../Images/file.png")}/>
      <div  className='fileName'>{name}</div>
    </div>
  )
}

export default File