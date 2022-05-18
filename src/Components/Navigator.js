import React from 'react'
import Folder from './Folder';
import File from './File';
import './Navigator.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Authentication from './Authentication';
var rootdirectoriesUrl = "http://localhost:8081/manager/v1/users_home_directories"
// const dd = [{ "id": 41, "name": "riadHome", "owner": "riad", "parentFolder": { "id": 40, "name": "root", "owner": "all", "parentFolder": null, "taille": 0, "hibernateLazyInitializer": {} }, "taille": 0 }, { "id": 42, "name": "medHome", "owner": "med", "parentFolder": { "id": 40, "name": "root", "owner": "all", "parentFolder": null, "taille": 0, "hibernateLazyInitializer": {} }, "taille": 0 }]
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

  

{
    console.log(ParentName)
    console.log(username)
    console.log(previousParentId)
    console.log(previousParentName)
    console.log(folderId)
    console.log("auth : "+authenticatedUser.password)
    
}
    const createFolder=(name)=>{
        const init = {
            mode: 'no-cors',
            }
        axios.post(`http://localhost:8081/manager/v1/userFolder/createFolder/${previousParentName}/${name}/${folderId}`)
        .then(()=>openFolder(previousParentName,folderId))
        .catch(
            ()=>console.log("error")
        )
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
    // const getHomeDirectories=()=>{
                   
    //                  axios.get(rootdirectoriesUrl)
    //                 .then(
    //                     res=>{
    //                         setRootDirName(res.data)
    //                     }
    //                 ).then(res=>{
    //                     //  setUsername(oneChild.owner);
    //                     if(rootDirName.folders.length!==0){
    //                         let oneChild=rootDirName.folders[0]
    //                         if(oneChild.parentFolder.parentFolder!==null){
    //                         // setFolderId(id);
    //                             setPreviousParentId(oneChild.id)
    //                             setParentName(oneChild.name)
    //                     }}

    //                })
    // }

    // useEffect(() => {
    //         //setUsername("all");
    //        // setFolderId(40);
    //        // getHomeDirectories()
    //    }, 
    //    [])
   
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



           { rootDirName.folders.length!==0?<button style={{padding:'12px'}} onClick={()=>{openFolder(rootDirName.folders[0].parentFolder.parentFolder.owner,rootDirName.folders[0].parentFolder.parentFolder.id);setParentName(rootDirName.folders[0].parentFolder.parentFolder.name)}}>Parent : {ParentName+"  "+username}</button>:
         <button style={{padding:'12px'}} onClick={()=>{openFolder(previousParentName,previousParentId);getParendName()}}>Parent : {ParentName+"  "+username}</button>
        }<hr/><br/><br/><div className='navigator'>
                <div className='createFolder'><input value={createFolderName} onChange={(e=>setCreateFolderName(e.target.value))}/><button onClick={()=>createFolder(createFolderName)}>Create</button></div>
                {
                    rootDirName.folders.length!=0?rootDirName.folders.map(folder =>
                        <Folder setParentId={setParentId} setParentName={setParentName} openFolder={openFolder} setFolderId={setFolderId} folder={folder}  setUsername={setUsername} id={folder.id} key={folder.id}/>):<div>Vide</div>
                   
                }
                {
                     rootDirName.files?rootDirName.files.map(file =>
                        <File file={file} key={file.id} />):<div>Vide</div>
                }
            </div></> : <div>no folders</div>
    )
}

export default Navigator