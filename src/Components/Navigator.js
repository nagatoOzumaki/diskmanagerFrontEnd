import React, { Suspense } from 'react'
import Folder from './Folder';
import File from './File';
import './Navigator.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Authentication from './Authentication';
import AdminPanel from './AdminPanel';
import Search from './Search';
import CreateFile from './CreateFile';
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
    const showCreateFolder=!(ParentName==="root" || folderId===1 || authenticatedUser.username==="all" || authenticatedUser.password==="all")
    const [showCreateFile,setShowCreateFile]=useState(false)


  

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
        .then(()=>openFolder(authenticatedUser.username,ParentId))//little change folderId=>parentID (successfull change)
       .catch(()=>setNotAuthorizedError(true))
    }
//create file
    const createFile=(name,content)=>{
        var credentials = btoa(`${authenticatedUser.username}:${authenticatedUser.password}`);
        var auth = { "Authorization" : `Basic ${credentials}` , ...{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }};
      
        const init = {
            mode: 'cors',
            method:"post",
            headers:auth,
            credentials: 'include'
            }
        axios.get(`http://localhost:8081/manager/v1/userFile/createFile/${authenticatedUser.username}/${name}/${folderId}/${content}`)
        .then(()=>console.log("creating Folder: "+authenticatedUser.username+name+folderId))
        .then(()=>openFolder(authenticatedUser.username,ParentId))//little change folderId=>parentID (successfull change)
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
   console.log(showCreateFolder)
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
           rootDirName.folders?.length!==0?
        //    those two lines are for return back
        
            <button style={{padding:'5px'}} onClick={()=>{openFolder(rootDirName.folders[0].parentFolder.parentFolder.owner,rootDirName.folders[0].parentFolder.parentFolder.id);setParentName(rootDirName.folders[0].parentFolder.parentFolder.name)}}>Parent : {ParentName+"("+username+")"}</button>:
            <button style={{padding:'5px'}} onClick={()=>{openFolder(previousParentName,previousParentId);getParendName()}}>Parent : {ParentName+"("+username+")"}</button>
      
        }
        <hr/><br/>
        {/* Folders's navigation */}
         <div className='navigator'> 
         <div className='tools'>
       {/* create folder */}
       
             {showCreateFolder?<>
             <div>
             <input value={createFolderName} 
                    onChange={(e=>setCreateFolderName(e.target.value))}/><button  onClick={()=>createFolder(createFolderName)}>Create</button>
            </div>
            <div>
            <button onClick={()=>setShowCreateFile(!showCreateFile)}>new file</button>
            {showCreateFile?<CreateFile createFile={createFile} setShowCreateFile={setShowCreateFile}/>:null}
            </div>
            </>:null}
            <Search setRootDirName={setRootDirName}/>
            </div>
               <div className='NavigationContainer'>
              { rootDirName.folders?.length!=0||rootDirName.files?.length!=0?<>
                        {
                            // list folders
                            rootDirName.folders?rootDirName.folders.length!=0?rootDirName.folders.map(folder =>
                                <Folder setParentId={setParentId} setParentName={setParentName} 
                                openFolder={openFolder} setFolderId={setFolderId} folder={folder}  
                                setUsername={setUsername} id={folder.id} key={folder.id}/>):null:null
                        
                        }
                        {
                            //list files
                            rootDirName.files?rootDirName.files.map(file =>
                                <File file={file} key={file.id} />):null
                        }
                        </>:<div>Vide</div>}
                </div>
             </div>
             {
            //Admin panel
           authenticatedUser.username==="admin"?<>
                <div className='AdminPanel'><AdminPanel setAuthenticatedUser={setAuthenticatedUser} authenticatedUser={authenticatedUser} openFolder={openFolder}/></div>
                {/* create Folder bar */}
               

            
            </>:null
            }
            {/* <Suspense> */}
                       
            {/* </Suspense> */}
             </> : <div>no folders</div> 
    )
}

export default Navigator