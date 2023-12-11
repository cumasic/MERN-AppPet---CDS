import axios from "./axios.js";

export const getUserRequest = id => axios.get(`/user/${id}`)

export const updateUserRequest = (id,user) =>{
    const form = new FormData()

    for(let key in user){
       form.append(key, user[key])
    }

    axios.put(`/user/${id}`,form,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
} 
