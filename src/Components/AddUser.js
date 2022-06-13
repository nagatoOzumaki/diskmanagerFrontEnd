import {React,useState} from 'react'
import axios from 'axios'
function AddUser({close,openFolder}) {
  const [newusername, setUsername] = useState("")
  const [newpassword, setPassword] = useState("")

    const addUser=()=>{
      console.log(newusername+' '+newpassword)
     
      var credentials = btoa(`admin:admin`);
      var auth = { "Authorization" : `Basic ${credentials}` };
    
      const init = {
          mode: 'no-cors',
          methode: 'get',
          headers:auth,
          credentials: 'include'
          }
      axios.get(`http://localhost:8081/manager/v1/admin/users/add/${newusername}/${newpassword}`,init).then(res=>{
        console.log(res)
        openFolder("all",1)}
        ).catch(er=>console.log(er))
   

    }
  return (
    <div style={{background:"rgb(0,0,0,0.5)",padding:"12px"}}>

        <button onClick={close}>Close</button>
        <br/> <br/>
        <label>Username</label>
        <input value={newusername} onChange={e=>setUsername(e.target.value)}/>
        <label>Password</label>
        <input value={newpassword} onChange={e=>setPassword(e.target.value)}/>
        <br/><br/>
        <button style={{background:""}} onClick={addUser}>Add</button>
        
    </div>
  )
}

export default AddUser