import { createContext, useContext, useState } from "react";
import { createChatRequest, getChatsRequest } from "../api/chats";

export const ChatContext = createContext()

export const useChats = () => {
    const context = useContext(ChatContext)

    if (!context) {
        throw new Error('UsePosts must be used within a PostProvider')
    }

    return context
}

export const ChatProvider = ({children}) => {
    const [chats, setChats] = useState([])

    const createChat = async (senderId, receiverId) => {
        try {
            const res = await createChatRequest({ senderId, receiverId })
            setChats([...chats, res.data])
        } catch (error) {
            console.log(error)
        }
    }

    const getChats = async (id) => {
        try {
            const res = await getChatsRequest(id)
            setChats(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ChatContext.Provider value={{
            chats,
            createChat,
            getChats,
        }}>
        {children}
        </ChatContext.Provider>
    )
}