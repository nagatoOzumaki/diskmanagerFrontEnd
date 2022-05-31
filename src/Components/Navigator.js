import React from 'react'
import Folder from './Folder';
import File from './File';
import './Navigator.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Authentication from './Authentication';
import AdminPanel from './AdminPanel';
var rootdirectoriesUrl = "http://localhost:8081/manager/v1/users_home_directories"
const rootId=1
function Navigator() {
    const [rootDirName, setRootDirName] = useState([]);
    const [error, setError] = useState(false);

    //il reste le cas d utiliser le username de parentfolder
    const [ParentName,setParentName]=useState('root')
    const [ParentId,setParentId]=useState(rootId)
    const [previousParentId,setPreviousParentId]=useState(rootId)
    const [previousParentName,setPreviousParentName]=useState('all')
    const [username,setUsername]=useState("all")
    const [createFolderName,setCreateFolderName]=useState("untitled")
    const [folderId,setFolderId]=useState(rootId)
    const [authenticcatioPopUp,setAuthenticcatioPopUp]=useState(false)
    const [authenticatedUser,setAuthenticatedUser]=useState({username:"all",password:"all"})
    const [notAuthorizedError,setNotAuthorizedError]=useState(false)

  

{
    console.log("parent name:"+ParentName)
    console.log(username)
    console.log("prev id:"+previousParentId)
    console.log("prevParentname id:"+previousParentName)
    console.log("folder id:"+folderId)
    console.log("auth : "+authenticatedUser.password)
    console.log("Not Authorised : "+notAuthorizedError)
    console.log("--------------------------------------")
    
}
    const createFolder=(name)=>{
        var credentials = btoa(`${authenticatedUser.username}:${authenticatedUser.password}`);
        var auth = { "Authorization" : `Basic ${credentials}` };
      
        const init = {
            mode: 'no-cors',
            method:"post",
            headers:auth,
            credentials: 'include'
            }
        axios.post(`http://localhost:8081/manager/v1/userFolder/createFolder/${authenticatedUser.username}/${name}/${folderId}`)
        .then(()=>console.log("creating Folder: "+authenticatedUser.username+name+folderId))
        .then(()=>openFolder(authenticatedUser.username,folderId))
       .catch(()=>setNotAuthorizedError(true))
    }
    const openFolder=(usernam,id)=>{
                 
                    var credentials = btoa(`${authenticatedUser.username}:${authenticatedUser.password}`);
                    var auth = { "Authorization" : `Basic ${credentials}` };
                  
                    const init = {
                        mode: 'no-cors',
                        methode: 'GET',
                        headers:auth,
                        credentials: 'include'
                        }
                    axios.get(`http://localhost:8081/manager/v1/userFolder/${usernam}/${id}`,init)
                    .then(
                        res=>{
                          //  console.log(res.data)
                        setRootDirName(res.data)
                        }
                        ).then(res=>{
                                if(rootDirName.folders.length!==0){
                                let oneChild=rootDirName.folders[0];
                            if(oneChild.parentFolder!==null)
                                    {   
                                        setPreviousParentId(oneChild.parentFolder.id);
                                        setPreviousParentName(oneChild.parentFolder.owner)
                                    }
                        }
                        setAuthenticcatioPopUp(false)
                    }
                    ).catch(error=>{
                            console.log("not authorized")
                            setAuthenticcatioPopUp(true)

                    })
                }

  
    const getParendName=()=>{
        var credentials = btoa(`${authenticatedUser.username}:${authenticatedUser.password}`);
        var auth = { "Authorization" : `Basic ${credentials}` };
      
        const init = {
            mode: 'no-cors',
            methode: 'GET',
            headers:auth,
            credentials: 'include'
            }
        axios.get(`http://localhost:8081/manager/v1/userFolder/${username}/${folderId}`,init)
        .then(
            res=>{
               // console.log(res.data)
                setParentName(res.data.folders[0].parentFolder.name) 
                setAuthenticcatioPopUp(false)
        }
        )
    }
   
    useEffect(() => {
                    openFolder('all',rootId);
                    setAuthenticatedUser({username:"all",password:"all"})
                  
                    setAuthenticcatioPopUp(false)
                    //setAuthenticcatioPopUp(false)
                    console.log("render")
                }, 
                [])


    return (

            error ? <div>Error</div>:
           
            rootDirName.length !== 0 ?<>
                    {
                        authenticcatioPopUp?<Authentication username={username} folderId={folderId} setRootDirName={setRootDirName} setAuthenticcatioPopUp={setAuthenticcatioPopUp} setPreviousParentId={setPreviousParentId} setPreviousParentName={setPreviousParentName} 
                        rootDirName={rootDirName} setAuthenticatedUser={setAuthenticatedUser} authenticatedUser={authenticatedUser}/>:null
                    }



           { 
        //    check if there no folders
           rootDirName.folders.length!==0?
        //    those two lines are for return back
        <button style={{padding:'12px'}}onClick={()=>{openFolder(rootDirName.folders[0].parentFolder.parentFolder.owner,rootDirName.folders[0].parentFolder.parentFolder.id);setParentName(rootDirName.folders[0].parentFolder.parentFolder.name)}}>Parent : {ParentName+"  "+username}</button>:
         <button style={{padding:'12px'}} onClick={()=>{openFolder(previousParentName,previousParentId);getParendName()}}>Parent : {ParentName+"  "+username}</button>
        }
        <hr/><br/><br/>
        {/* Folders's navigation */}
         <div className='navigator'> 
        {
            //Admin panel
           authenticatedUser.username==="admin"?<>
                <div className='AdminPanel'><AdminPanel setAuthenticatedUser={setAuthenticatedUser} authenticatedUser={authenticatedUser}/></div>
                {/* create Folder bar */}
               
            </>:null
            }
             <div className='createFolder'><input disabled={!(ParentName!="root" &&folderId!==1)} value={createFolderName} 
                onChange={(e=>setCreateFolderName(e.target.value))}/><button onClick={()=>createFolder(createFolderName)}>Create</button></div>
               <div className='NavigationContainer'>
            
                        {
                            // list folders
                            rootDirName.folders.length!=0?rootDirName.folders.map(folder =>
                                <Folder setParentId={setParentId} setParentName={setParentName} 
                                openFolder={openFolder} setFolderId={setFolderId} folder={folder}  
                                setUsername={setUsername} id={folder.id} key={folder.id}/>):<div>Vide</div>
                        
                        }
                        {
                            //list files
                            rootDirName.files?rootDirName.files.map(file =>
                                <File file={file} key={file.id} />):<div>Vide</div>
                        }
                </div>
             </div></> : <div>no folders</div> 
    )
}

export default Navigator