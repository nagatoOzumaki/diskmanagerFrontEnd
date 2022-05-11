
import React,{useEffect} from 'react'
import './Folders.css'
import axios from 'axios'
const Folder = ({name,id,username,setRootDirName,setUsername,folder,setParentDirectory}) => {
  const openFolder=()=>{
            const init = {
              mode: 'no-cors',
              methode: 'GET'
             }
          axios.get(`http://localhost:8081/manager/v1/folder/${username}/${id}`,{
              method: 'HEAD',
              mode: 'no-cors',
              headers: {
                  'Access-Control-Allow-Origin': '*',
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              crossdomain: true,
          })
          .then(
              res=>{
                  console.log(res.data)
                  setRootDirName(res.data);
          }
          )
  }
  
 useEffect(()=>{
  setParentDirectory([folder.parentFolder.name,folder.parentFolder.id]);
 },[])

  return (
    <div onClick={setUsername(username)} data-id={id} onClick={()=>openFolder()}>
        <img alt='file' className='folderName' width='18px' src={require("../Images/folder.jpg")}/>
      <div className='folderName'>{name}</div>

      
    </div>
  )
}



export default Folder