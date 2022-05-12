
import React,{useEffect} from 'react'
import './Folders.css'
import axios from 'axios'
const Folder = ({setParentName,id,setUsername,folder,setFolderId,openFolder}) => {
  
  
 useEffect(()=>{
  //setParentDirectory([folder.parentFolder.name,folder.parentFolder.id]);
 },[])

  return (
    <div onClick={()=>{setParentName(folder.name);setUsername(folder.owner);setFolderId(id);openFolder(folder.owner,id)}} data-id={id} >
          <img alt='file' className='folderName' width='18px' src={require("../Images/folder.jpg")}/>
          <div className='folderName'>{folder.name}</div>
    </div>
  )
}



export default Folder