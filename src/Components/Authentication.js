import React,{useState} from 'react'
import axios from 'axios'
 
function Authentication({username,folderId,setAuthenticcatioPopUp,setRootDirName,setPreviousParentName,setPreviousParentId,rootDirName,setAuthenticatedUser,authenticatedUser}) {
    const [credentials, setCredentials] = useState({myUsername:"",myPassword:""})
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
  return (

            <div style={{padding:"12px",position:'absolute',zIndex:3,backgroundColor:"red",top:"50%",right:"50%"}}>
                <h5>Authentication</h5>
                    <div>
                        <input onChange={e=>{
                            setCredentials({...credentials,myUsername:e.target.value})
                            setAuthenticatedUser({...authenticatedUser,myUsername:e.target.value})
                        }
                        }/></div>
                    <div>
                        <input onChange={e=>{
                            setCredentials({...credentials,myPassword:e.target.value})
                            setAuthenticatedUser({...authenticatedUser,myPassword:e.target.value})
                            }}/>
                    </div>  
                    <div>
                        <button onClick={()=>{
                            openFolder(username,folderId);
                            setAuthenticatedUser({...authenticatedUser,username:credentials.myUsername,password:credentials.myPassword})
                         }}>Unlock</button>
                    </div>
             </div>
  )
  
}

export default Authentication