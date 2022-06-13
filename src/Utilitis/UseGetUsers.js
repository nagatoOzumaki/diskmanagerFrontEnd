 import axios from 'axios'

 
 export const UseGetUsers=()=>{
   
    var credentials = btoa(`admin:admin`);
    var auth = { "Authorization" : `Basic ${credentials}` };
    let users=null;
    const init = {
        mode: 'no-cors',
       
        headers:auth,
        credentials: 'include'
        }
    axios.get(`http://localhost:8081/manager/v1/admin/users`,init)
    .then((res)=>{ 
      users=res.data;console.log(res.data)})
   return  users;
 }
 
 //export default UseGetUsers