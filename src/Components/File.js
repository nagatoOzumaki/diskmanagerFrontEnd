
import React, { useState } from 'react'
import './Folders.css'
const File = ({file,name,id}) => {
    const [dropDownisShown,setDropDownisShown]=useState(false)
    const [contentIsShown,setContentIsShown]=useState(false)
  return (
    <div data-id={file.id} onClick={()=>setDropDownisShown(!dropDownisShown)} >
      
        <img alt='file' className='fileImage' width='18px' src={require("../Images/file.png")}/>
      <div  className='fileName'>{file.name}</div>
      {dropDownisShown?<div className='dropDown'>
        <button onClick={()=>setContentIsShown(true)}>Open</button>
        <button>Delete</button>
      </div>:null}
      {contentIsShown?<div className='dropDown' >
            <button onClick={()=>setContentIsShown(false)}>X</button>
        <p className='fileContent'>
          {file.content}
        </p>
      </div>:null}
    </div>
  )
}

export default File