import React from 'react'
import Folder from './Folder';
import File from './File';
import './Navigator.css';
import axios from 'axios'

import { useEffect, useState } from 'react';
var rootdirectoriesUrl = "http://localhost:8081/manager/v1/users_home_directories"
const dd = [{ "id": 41, "name": "riadHome", "owner": "riad", "parentFolder": { "id": 40, "name": "root", "owner": "all", "parentFolder": null, "taille": 0, "hibernateLazyInitializer": {} }, "taille": 0 }, { "id": 42, "name": "medHome", "owner": "med", "parentFolder": { "id": 40, "name": "root", "owner": "all", "parentFolder": null, "taille": 0, "hibernateLazyInitializer": {} }, "taille": 0 }]
function Navigator() {

    const [rootDirName, setRootDirName] = useState([]);
    const [error, setError] = useState(false);
    const [parentDirectory,setParentDirectory]=useState(['root',40])
    const [username,setUsername]=useState("all")
    const [parent,setParent]=useState(41)
    const goBack=(username)=>{
        axios.get(`http://localhost:8081/manager/v1/folder/${username}/${parentDirectory[1]}`,{
        method: 'HEAD',
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }})
        .then(res=>
                    setRootDirName(res.data)
            )
    }
    useEffect(() => {

        const init = {
            mode: 'no-cors',
            methode: 'GET'

        }
      
         axios.get(rootdirectoriesUrl,{
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
             res=>setRootDirName(res.data)

         )
     
        //  setParentDirectory(['root',0])
        //  setUsername("all")
    }, [])



    return (


            error ? <div>Error </div> :
           
            rootDirName.length !== 0 ? <div className='navigator'>
                <div onClick={()=>goBack(parentDirectory[1])}>Parent : {parentDirectory[0]+"  "+username}</div>
                {

                    rootDirName.folders.map(folder =>
                        <Folder folder={folder} setParentDirectory={setParentDirectory} setUsername={setUsername} id={folder.id} key={folder.id} name={folder.name} username={folder.owner} setRootDirName={setRootDirName}/>)
                   
                }
                {
                     rootDirName.files.map(file =>
                        <File id={file.id} key={file.id} name={file.name} username={file.owner} setRootDirName={setRootDirName}/>)
                }
            </div> : <div>no folders</div>
    )
}

export default Navigator