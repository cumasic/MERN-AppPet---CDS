import { Router } from 'express'
import { addMessage, getMessages } from '../controllers/message.controller.js'

const router = Router()

router.post('/messages', addMessage)
router.get('/messages/:chatId', getMessages)

export default router