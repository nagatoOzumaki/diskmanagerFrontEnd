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

    //il reste le cas d utiliser le username de parentfolder
    const [ParentName,setParentName]=useState('root')
    const [previousParentId,setPreviousParentId]=useState(40)
    const [previousParentName,setPreviousParentName]=useState('all')
    const [username,setUsername]=useState("all")
    
    const [folderId,setFolderId]=useState(40)

    const openFolder=(usernam,id)=>{
                    const init = {
                        mode: 'no-cors',
                        methode: 'GET'
                        }
                    axios.get(`http://localhost:8081/manager/v1/folder/${usernam}/${id}`)
                    .then(
                        res=>{
                            console.log(res.data)
                            setRootDirName(res.data);   
                    }
                    ).then(res=>{
                         if(rootDirName.folders.length!==0){
                                let oneChild=rootDirName.folders[0];
                                if(oneChild.parentFolder!==null)
                                        {
                                            setPreviousParentId(oneChild.parentFolder.id);
                                            setPreviousParentName(oneChild.parentFolder.owner)
                                            //setParentName(oneChild.parentFolder.name);
                                        }
                    //  else{
                    //     setPreviousParentId(oneChild.id);
                    //     setPreviousParentName(oneChild.parentFolder.owner)
                    //     setParentName(oneChild.parentFolder.name);
                    //  }
                     }

                    })
                }

    const goBack=()=>{
        setFolderId(previousParentId);
        setUsername(previousParentName)
        openFolder(username,folderId)
       // openFolder(previousParentName,previousParentId)  
    }
    const getParendName=()=>{
        axios.get(`http://localhost:8081/manager/v1/folder/${username}/${previousParentId}`)
        .then(
            res=>{
               // console.log(res.data)
                setParentName(res.data.folders[0].parentFolder.name)  
        }
        )
    }
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
                        }
                    ).then(res=>{
                        //  setUsername(oneChild.owner);
                        if(rootDirName.folders.length!==0){
                            let oneChild=rootDirName.folders[0]
                            if(oneChild.parentFolder.parentFolder!==null){
                            // setFolderId(id);
                                setPreviousParentId(oneChild.id)
                                setParentName(oneChild.name)
                        }}

                   })
    }

    // useEffect(() => {
    //         //setUsername("all");
    //        // setFolderId(40);
    //        // getHomeDirectories()
    //    }, 
    //    [])
   
    useEffect(() => {
                    openFolder('all',40);
                }, 
                [])
            
console.log(folderId);console.log(ParentName)

    return (

            error ? <div>Error</div>:
           
            rootDirName.length !== 0 ?<>
           { rootDirName.folders.length!==0?<button style={{padding:'12px'}} onClick={()=>{openFolder(rootDirName.folders[0].parentFolder.parentFolder.owner,rootDirName.folders[0].parentFolder.parentFolder.id);setParentName(rootDirName.folders[0].parentFolder.parentFolder.name)}}>Parent : {ParentName+"  "+username}</button>:
         <button style={{padding:'12px'}} onClick={()=>{openFolder(previousParentName,previousParentId);getParendName()}}>Parent : {ParentName+"  "+username}</button>
        
        }<hr/><br/><br/><div className='navigator'>
                
                {
                    rootDirName.folders.length!=0?rootDirName.folders.map(folder =>
                        <Folder setParentName={setParentName} openFolder={openFolder} setFolderId={setFolderId} folder={folder}  setUsername={setUsername} id={folder.id} key={folder.id}/>):<div>Vide</div>
                   
                }
                {
                     rootDirName.files?rootDirName.files.map(file =>
                        <File id={file.id} key={file.id} name={file.name} username={file.owner} />):<div>Vide</div>
                }
            </div></> : <div>no folders</div>
    )
}

export default Navigator