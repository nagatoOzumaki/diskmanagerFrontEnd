import React,{useState} from 'react'
import axios from 'axios'
 
function Authentication({username,folderId,setAuthenticcatioPopUp,setRootDirName,setPreviousParentName,setPreviousParentId,rootDirName,setAuthenticatedUser,authenticatedUser}) {
    const [credentials, setCredentials] = useState({myUsername:"",myPassword:""})
    const [authIsShown, setAuthIsShown] = useState(true)
    const openFolder=(usernam,id)=>{
                 
        var credential = btoa(`${credentials.myUsername}:${credentials.myPassword}`);
        var auth = { "Authorization" : `Basic ${credential}` };
        const init = {
            mode: 'no-cors',
            methode: 'GET',
            headers:auth,
            credentials: 'include'
            }
        axios.get(`http://localhost:8081/manager/v1/userFolder/${usernam}/${id}`,init)
         .then(
            res=>{
              
                setRootDirName(res.data)
            console.log("you loged in");}
            ).then(res=>{
                setAuthenticcatioPopUp(false)
                    if(rootDirName.folders.length!==0){
                    let oneChild=rootDirName.folders[0];
                if(oneChild.parentFolder!==null)
                        {   
                            setPreviousParentId(oneChild.parentFolder.id);
                            setPreviousParentName(oneChild.parentFolder.owner)
                        }
            }
            
        }
        ).catch(error=>{
                console.log("not authorized")
                setAuthenticcatioPopUp(true)

        })
    }

console.log(credentials)
  return authIsShown?(

            <div style={{padding:"12px",position:'absolute',zIndex:3,backgroundColor:"rgb(218, 212, 212)",top:"50%",right:"50%"}}>
               <button onClick={()=>setAuthenticcatioPopUp(false)}>close</button><br/><br/>
                    <div>
                        <input  style={{padding:"4px",display:"block"}} placeholder='username' onChange={e=>{
                            setCredentials({...credentials,myUsername:e.target.value})
                            setAuthenticatedUser({...authenticatedUser,myUsername:e.target.value})
                        }
                        }/>
                        
                        <input type="password" style={{marginTop:"10px",padding:"4px",display:"block"}} placeholder='password' onChange={e=>{
                          
                            setCredentials({...credentials,myPassword:e.target.value})
                            setAuthenticatedUser({...authenticatedUser,myPassword:e.target.value})
                            }}/>
                    </div>  
                    <div>
                        <br/>
                        <button onClick={()=>{
                            if(credentials.myUsername!==""&&credentials.myPassword!==""){
                                openFolder(username,folderId);
                                setAuthenticatedUser({...authenticatedUser,username:credentials.myUsername,password:credentials.myPassword})
                                setAuthIsShown(false)}
                         }}>Unlock</button>
                    </div>
             </div>
  ):null
  
}

export default Authentication