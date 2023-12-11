import { Router } from "express";
import { getAllPosts, createPost, getPost, deletePost, updatePost, getMyPosts } from "../controllers/post.controller.js";
import { authRequire } from "../middlewares/validatetoken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPostSchema } from "../schemas/post.schema.js";

const router = Router()

router.get('/posts', getAllPosts)
router.get('/my-posts', authRequire, getMyPosts)
router.get('/posts/:id', authRequire, getPost)
router.post('/posts', authRequire, validateSchema(createPostSchema), createPost)
router.delete('/posts/:id', authRequire, deletePost)
router.put('/posts/:id', authRequire, updatePost)

export default router