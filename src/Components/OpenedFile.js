import React, { useState } from 'react'

function OpenedFile({id,content,setIsFileOpened,setContent}) {
  const [newcontent,setNewcontent]=useState(content)
    const styles={
        content:{
            padding:"12px",
            backgroundColor:"ddd"
                },
        modify:{
          padding:"12px"
        },
        save:{
           // padding:"12px"
        },
        container:{
          position:"absolute",
          ...{
            zIndex:23,
            position:"absolute",
            marginTop:"12px",
            padding:"20px",
            backgroundColor:"rgba(0,60,23,0.4)"
        }
        },
        btnContainer:{
          display:"flex",
          justifyContent:"space-between",
          padding:"5px"
        },
        close:{
              
        }

    
}
    
    const handleClose=()=>{
            setIsFileOpened(false)

    }
    const handleSave=()=>{
     fetch("http://localhost:8081/manager/v1/userFile/update/"+id+"/"+newcontent).then(res=>{console.log(res)}).then(res=>
              getContent()
     )

}
  const getContent=()=>{
          fetch("http://localhost:8081/manager/v1/userFile/"+id).then(res=>{
            
          //  console.log("getContent",res)
            return res.json()
          }
            ).then(data=>{setContent(data.content);console.log(data.content)}).catch(err=>console.log("getContent error",err))

  }
  return (
    <div style={styles.container} >
      <div style={styles.btnContainer}>
     
      <button style={styles.save} onClick={handleSave}>Save</button>
        <small>Size:{newcontent.length +" octets"}</small>
        <button style={styles.close} onClick={handleClose}>close</button></div>
        
        <textarea value={newcontent} onChange={e=>setNewcontent(e.target.value)} style={styles.content}/>
        
    </div>
  )
}

export default OpenedFile