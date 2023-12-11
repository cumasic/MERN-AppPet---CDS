import { Router } from "express";
import { createChat, userChats, findChat } from "../controllers/chat.controller.js";

const router = Router()

router.post('/chats', createChat)
router.get('/chats/:userId', userChats)
router.get('/chats/find/:firstId/:secondId', findChat)

export default router