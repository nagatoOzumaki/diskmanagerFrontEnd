
import React, { useEffect, useState } from 'react'
import './Folders.css'
import { RiDeleteBinLine } from "react-icons/ri";
import OpenedFile from './OpenedFile';
const styles={
  container:{
   paddingTop:"14px"
},
  dropDown:{
    padding:"12px"
  },
  delete:{
   // padding:"2px"
  },
  open:{
    //padding:"2px"
  }
 }
const File = ({file,name,id}) => {
    const [dropDownisShown,setDropDownisShown]=useState(false)
    const [isFileOpened,setIsFileOpened]=useState(false)
    const [content,setContent]=useState(file.content)
    const [isDeleted,setIsDeleted]=useState(false)
    // const [refreshContent,setRefreshContent]=useState(false)
    // useEffect(()=>{

    // },[refreshContent])
   
   const handleDeleteFile=()=>{
        fetch("http://localhost:8081/manager/v1/userFile/remove_file/"+file.id).then(res=>
                setIsDeleted(true)
        )
   }
  return isDeleted?null:(
    <div style={styles.container} onClick={()=>{setDropDownisShown(!dropDownisShown)}} >
      
        <img alt='file' className='fileImage' width='18px' src={require("../Images/file.png")}/>
      <div  className='fileName'>{file.name}</div>
      {dropDownisShown?
          <div style={styles.dropDown} >
            <button style={styles.delete} onClick={handleDeleteFile}><RiDeleteBinLine/></button>
            <button style={styles.open} onClick={()=>setIsFileOpened(true)}>Open</button>
          </div>
        :null}
   {isFileOpened?<OpenedFile id={file.id} content={content} setIsFileOpened={setIsFileOpened} setContent={setContent} />:null}
    </div>
  )
}

export default File