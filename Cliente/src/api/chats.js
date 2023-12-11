import axios from "./axios.js";

export const createChatRequest = users => axios.post('/chats', users)

export const getChatsRequest = id => axios.get(`/chats/${id}`)

