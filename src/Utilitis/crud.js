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