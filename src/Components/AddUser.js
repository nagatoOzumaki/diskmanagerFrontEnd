import {React,useState} from 'react'
import axios from 'axios'
function AddUser({close}) {
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
      axios.get(`http://localhost:8081/manager/v1/admin/users/add/${newusername}/${newpassword}`,init).then(res=>console.log(res)).catch(er=>console.log(er))
   

    }
  return (
    <div>

        <button onClick={close}>Close</button>
        <label>Username</label>
        <input value={newusername} onChange={e=>setUsername(e.target.value)}/>
        <label>Password</label>
        <input value={newpassword} onChange={e=>setPassword(e.target.value)}/>
        <button onClick={addUser}>Add</button>

    </div>
  )
}

export default AddUser