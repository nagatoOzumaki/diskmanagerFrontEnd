
import React,{useEffect} from 'react'
import './Folders.css'
import axios from 'axios'
const Folder = ({name,id,username,setRootDirName,setUsername,folder,setParentDirectory,setFolderId}) => {
  
  
 useEffect(()=>{
  setParentDirectory([folder.parentFolder.name,folder.parentFolder.id]);
 },[])

  return (
    <div onClick={setUsername(folder.owner)} data-id={id} onClick={()=>setFolderId(id)}>
        <img alt='file' className='folderName' width='18px' src={require("../Images/folder.jpg")}/>
      <div className='folderName'>{name}</div>

      
    </div>
  )
}



export default Folder