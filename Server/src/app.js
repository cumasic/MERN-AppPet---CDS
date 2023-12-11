import express, { json } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from './routes/auth.routes.js';
import postsRoutes from './routes/posts.routes.js'
import chatsRoutes from './routes/chats.routes.js'
import messagesRoutes from './routes/messages.routes.js'
import userRoutes from './routes/user.routes.js'
import fileUpload from 'express-fileupload'

const app = express()

app.use(cors({
    origin: 'https://client-pet-app.onrender.com',
    credentials: true
}))     // que todos los dominios se comuniquen en este servidor
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser()) 
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

app.use('/api', authRoutes)
app.use('/api', postsRoutes)
app.use('/api', chatsRoutes)
app.use('/api', messagesRoutes)
app.use('/api', userRoutes)

export default app
