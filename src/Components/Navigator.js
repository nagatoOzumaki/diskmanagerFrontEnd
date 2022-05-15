import React from 'react'
import Folder from './Folder';
import File from './File';
import './Navigator.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
var rootdirectoriesUrl = "http://localhost:8081/manager/v1/users_home_directories"
// const dd = [{ "id": 41, "name": "riadHome", "owner": "riad", "parentFolder": { "id": 40, "name": "root", "owner": "all", "parentFolder": null, "taille": 0, "hibernateLazyInitializer": {} }, "taille": 0 }, { "id": 42, "name": "medHome", "owner": "med", "parentFolder": { "id": 40, "name": "root", "owner": "all", "parentFolder": null, "taille": 0, "hibernateLazyInitializer": {} }, "taille": 0 }]
const rootId=201
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




{
    console.log(ParentName)
    console.log(username)
    console.log(previousParentId)
    console.log(previousParentName)
    
}
    const createFolder=(name)=>{
        const init = {
            mode: 'no-cors',
            }
        axios.post(`http://localhost:8081/manager/v1/createFolder/${previousParentName}/${name}/${folderId}`)
        .then(()=>openFolder(previousParentName,folderId))
        .catch(
            ()=>console.log("error")
        )
    }
    const openFolder=(usernam,id)=>{
                    const init = {
                        mode: 'no-cors',
                        methode: 'GET'
                        }
                    axios.get(`http://localhost:8081/manager/v1/folder/${usernam}/${id}`)
                    .then(
                        res=>{
                          //  console.log(res.data)
                            setRootDirName(res.data);   
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

                    })
                }

    // const goBack=()=>{
    //     setFolderId(previousParentId);
    //     setUsername(previousParentName)
    //     openFolder(username,folderId)
    //    // openFolder(previousParentName,previousParentId)  
    // }
    const getParendName=()=>{
        axios.get(`http://localhost:8081/manager/v1/folder/${username}/${folderId}`)
        .then(
            res=>{
               // console.log(res.data)
                setParentName(res.data.folders[0].parentFolder.name)  
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
                }, 
                [])
            
//console.log(folderId);console.log(ParentName)

    return (

            error ? <div>Error</div>:
           
            rootDirName.length !== 0 ?<>
           { rootDirName.folders.length!==0?<button style={{padding:'12px'}} onClick={()=>{openFolder(rootDirName.folders[0].parentFolder.parentFolder.owner,rootDirName.folders[0].parentFolder.parentFolder.id);setParentName(rootDirName.folders[0].parentFolder.parentFolder.name)}}>Parent : {ParentName+"  "+username}</button>:
         <button style={{padding:'12px'}} onClick={()=>{openFolder(previousParentName,previousParentId);getParendName()}}>Parent : {ParentName+"  "+username}</button>
        }<hr/><br/><br/><div className='navigator'>
                <div className='creareFolder'><input value={createFolderName} onChange={(e=>setCreateFolderName(e.target.value))}/><button onClick={()=>createFolder(createFolderName)}>Create</button></div>
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