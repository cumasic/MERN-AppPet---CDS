import Chat from "../models/chat.model.js";

export const createChat = async(req, res) => {
    const newChat = new Chat({
        members: [req.body.senderId, req.body.receiverId],
    })

    try {
        const savedChat = await newChat.save()
        res.status(200).json(savedChat)
    } catch (error) {
       res.status(500).json(error) 
    }
}

export const userChats = async(req, res) => {
    try {
        const chatFound = await Chat.find({
            members: {$in: [req.params.userId]}
        })  

        res.status(200).json(chatFound)
    } catch (error) {
       res.status(500).json(error) 
    }
}

export const findChat = async(req, res) => {
    try {
        const chatFind = await Chat.findOne({
            members: {$all: [req.params.firstId, req.params.secondId]}
        })  

        res.status(200).json(chatFind)
    } catch (error) {
       res.status(500).json(error) 
    }
}