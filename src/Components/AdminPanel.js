import React,{useState} from 'react'
import AddUser from './AddUser';
import './Navigator.css';
import RemoveUser from './RemoveUser';
import axios from 'axios'
function AdminPanel({setAuthenticatedUser,openFolder}) {
  const [addUser,setAddUser] = useState(false);
  const [removeUser,setRemoveUser] = useState(false);
  const [changeAdmin,setChangeAdmin] = useState(false);
  const logout=()=>{
    setAuthenticatedUser({username:"all",password:"all"})
   
    const init = {
        mode: 'no-cors',  
        credentials: 'include'
        }
    axios.get(`http://localhost:8081/manager/v1/logout`,init)
    .then((res)=>{ 
            console.log("you loged out")
        })
      console.log("hooo")
  }
  return (
    <>
        <button className='adminPanelField' onClick={()=>setAddUser(true)}>Add user</button>
        <button className='adminPanelField' onClick={()=>setRemoveUser(true)}>Remove user</button>
        <button className='adminPanelField' onClick={logout}>Log out from Admin</button>
        <div className='toolsWindow'>
             {
               addUser?<AddUser openFolder={openFolder} close={()=>setAddUser(false)}/>:null
             } 
             {
                removeUser?<RemoveUser close={()=>setRemoveUser(false)}/>:null
             }
        </div>
    </>
  )
}



export default AdminPanel