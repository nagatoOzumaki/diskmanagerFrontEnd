import React from 'react'
import Folder from './Folder';
import File from './File';
import './Navigator.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
var rootdirectoriesUrl = "http://localhost:8081/manager/v1/users_home_directories"
// const dd = [{ "id": 41, "name": "riadHome", "owner": "riad", "parentFolder": { "id": 40, "name": "root", "owner": "all", "parentFolder": null, "taille": 0, "hibernateLazyInitializer": {} }, "taille": 0 }, { "id": 42, "name": "medHome", "owner": "med", "parentFolder": { "id": 40, "name": "root", "owner": "all", "parentFolder": null, "taille": 0, "hibernateLazyInitializer": {} }, "taille": 0 }]
function Navigator() {
    const [rootDirName, setRootDirName] = useState([]);
    const [error, setError] = useState(false);
    const [once,setOnce]=useState(false)
    const [parentDirectory,setParentDirectory]=useState(['root',40])
    const [username,setUsername]=useState("all")
    const [parent,setParent]=useState(40)
    const [folderId,setFolderId]=useState(40)

    const openFolder=(username,id)=>{
                    const init = {
                        mode: 'no-cors',
                        methode: 'GET'
                        }
                    axios.get(`http://localhost:8081/manager/v1/folder/${username}/${id}`,{
                        method: 'HEAD',
                        mode: 'no-cors',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        crossdomain: true,
                    })
                    .then(
                        res=>{
                            console.log(res.data)
                            setRootDirName(res.data);
                            if(rootDirName.folders!==null&& rootDirName.folders[0]){
                                setParentDirectory([rootDirName.folders[0].parentFolder.name,rootDirName.folders[0].parentFolder.parentFolder.id])
                       }

                    }
                    )}

    const goBack=(username)=>{ 
        openFolder(username,parentDirectory[1])
        
        if(rootDirName.folders!==null&&rootDirName.folders[0]){
            setParentDirectory([rootDirName.folders[0].parentFolder.name,rootDirName.folders[0].parentFolder.parentFolder.id])
   }    }

    const getHomeDirectories=()=>{
                    const init = {
                        mode: 'no-cors',
                        methode: 'GET'

                    }
                
                    axios.get(rootdirectoriesUrl,{
                        method: 'HEAD',
                        mode: 'no-cors',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        crossdomain: true,
                    })
                    .then(
                        res=>{
                            setRootDirName(res.data)
                            if(rootDirName.folders!==null&&rootDirName.folders[0]){
                                     setParentDirectory([rootDirName.folders[0].parentFolder.name,rootDirName.folders[0].parentFolder.parentFolder.id])
                            }
                        }
                    )
    }
    useEffect(() => {
                    setOnce(true)
                    getHomeDirectories();
                    // setParentDirectory(['root',40])
                        
    }, [])
    useEffect(() => {
                if(once===true){
                 openFolder(username,folderId);
                }else{
                    return 
                }
                }, [username,folderId])
            


    return (

            error ? <div>Error </div> :
           
            rootDirName.length !== 0 ? <div className='navigator'>
                <div onClick={()=>goBack(username)}>Parent : {parentDirectory[0]+"  "+username}</div>
                {
                    rootDirName.folders?rootDirName.folders.map(folder =>
                        <Folder setFolderId={setFolderId} folder={folder} setParentDirectory={setParentDirectory} setUsername={setUsername} id={folder.id} key={folder.id} name={folder.name} setRootDirName={setRootDirName}/>):null
                   
                }
                {
                     rootDirName.files?rootDirName.files.map(file =>
                        <File id={file.id} key={file.id} name={file.name} username={file.owner} setRootDirName={setRootDirName}/>):null
                }
            </div> : <div>no folders</div>
    )
}

export default Navigator