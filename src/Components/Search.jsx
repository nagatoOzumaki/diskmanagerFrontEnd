import axios from 'axios';
import React from 'react'
import { useState } from 'react'

function Search({setRootDirName}) {
        const [searchInput,setSearchInput]=useState("")
        const handleSearchInput=(e)=>{
                        setSearchInput(e.target.value);
                     }
        const getSearch=()=>{
            var credentials = btoa("all:all");
        var auth = { "Authorization" : `Basic ${credentials}` };
      
        const init = {
            mode: 'no-cors',
            methode: 'GET',
            headers:auth,
            credentials: 'include'
            }
            axios.get("http://localhost:8081/manager/v1/userFolder/search/"+searchInput,init).then(res=>{
                console.log(res)
                setRootDirName(res.data)
              
            }).catch(err=>console.log(err))
        }
        
     
     
     
     
     
     
     
     
     
                     return (
            <div>
                <input value={searchInput} onChange={handleSearchInput}/>
                <button onClick={getSearch}>search</button>
            </div>
        )
}

export default Search