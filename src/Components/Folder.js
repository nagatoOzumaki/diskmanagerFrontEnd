
import React,{useEffect} from 'react'
import './Folders.css'
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios'
const Folder = ({setParentName,setParentId,id,setUsername,folder,setFolderId,openFolder}) => {
  
  
 useEffect(()=>{
  
 },[])

  return (
    <div onClick={()=>{setParentName(folder.name);setParentId(id);setUsername(folder.owner);setFolderId(id);openFolder(folder.owner,id)}} data-id={id} >
          <img alt='file' className='folderName' width='18px' src={require("../Images/folder.jpg")}/>
          <RiDeleteBinLine style={{padding:"8px"}}></RiDeleteBinLine>
          <div className='folderName'>{folder.name}</div>
    </div>
  )
}



export default Folder