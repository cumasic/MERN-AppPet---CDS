import Message from '../models/message.model.js'

export const addMessage = async (req, res) => {
    const { chatId, senderId, text, location } = req.body

    const newMessage = new Message({
        chatId,
        senderId,
        text,
        location,
    })

    try {
        const savedMessage = await newMessage.save()
        console.log(savedMessage)
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getMessages = async (req, res) => {
    const { chatId } = req.params
    
    try {
        const messages = await Message.find({chatId})
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
}