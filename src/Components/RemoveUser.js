import React, { useEffect, useState } from 'react'
import axios from 'axios'
var userStyle={
    padding:'12px',
    border:'1px solid '
}
function RemoveUser({close}) {
    const [users,setUsers]=useState(null)
const getUsers=()=>{
    var credentials = btoa(`admin:admin`);
    var auth = { "Authorization" : `Basic ${credentials}` };
    const init = {
        mode: 'no-cors',  
        headers:auth,
        credentials: 'include'
        }
    axios.get(`http://localhost:8081/manager/v1/admin/users`,init)
    .then((res)=>{ 
            setUsers(res.data);
            console.log(res.data)
        })
}           
const removeUsers=(username,password)=>{
    var credentials = btoa(`admin:admin`);
    var auth = { "Authorization" : `Basic ${credentials}` };
    const init = {
        mode: 'no-cors',
        headers:auth,
        }
    axios.delete(`http://localhost:8081/manager/v1/admin/users/delete/${username}/${password}`,init)
    .then((res)=>{ 
            getUsers();
        })
}
    useEffect(() => {
            getUsers();
    }, [])
  
    console.log("deb:users:"+users)

  return (
    <div>
        <button onClick={close}>Close</button>
        <h4>Remove users</h4>
        {
            users!==null?users.map(user=>
                 <div style={userStyle} >
                    user-{user.id}:{user.username}
                    <button onClick={()=>removeUsers(user.username,user.password)}>remove</button>
                </div>
            ):null
        }
    </div>
  )
}

export default RemoveUser