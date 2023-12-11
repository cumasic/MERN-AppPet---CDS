import {Router} from 'express'
import { getUser, updateUser } from '../controllers/user.controller.js'
import { authRequire } from "../middlewares/validatetoken.js";

const router = Router()

router.get('/user/:id', getUser)
router.put('/user/:id', authRequire, updateUser)

export default router