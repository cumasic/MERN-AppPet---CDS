import axios from "./axios.js";

export const getAllPostsRequest = () => axios.get('/posts')

export const getMyPostsRequest = () => axios.get('/my-posts')

export const createPostRequest = (post) => {
    const form = new FormData()

    for(let key in post){
       form.append(key, post[key])
    }

    return axios.post('/posts', form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const updatePostRequest = (id, post) => {
    const form = new FormData()

    for(let key in post){
       form.append(key, post[key])
    }

    return axios.put(`/posts/${id}`, form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}


export const getPostRequest = (id) => axios.get(`/posts/${id}`)

export const deletePostRequest = (id) => axios.delete(`/posts/${id}`)