import React, { useState } from 'react'

function CreateFile({createFile,setShowCreateFile}) {
    const styles={
        container:{
            zIndex:23,
            position:"absolute",
            marginTop:"12px",
            padding:"20px",
            backgroundColor:"rgba(0,60,23,0.4)",
            top:"493%",
            right:"20%"
        },
        input:{
            display:"block",
            marginBottom:"12px"
        }
    }
    const [name,setName]=useState("")
    const [content,setContent]=useState("")
  return (
    <div style={styles.container}>
        <div >
            <span>file name</span>
            <input style={{...styles.input,...{display:"inline",marginLeft:"15px"}}} value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
        
        <textarea style={styles.input} value={content} onChange={(e)=>setContent(e.target.value)}/>
</div>
        <button onClick={()=>{
            if(name!==""||content!==""){
                         setShowCreateFile(false);createFile(name,content)
            }
            }}>Save</button>
    </div>
  )
}

export default CreateFile