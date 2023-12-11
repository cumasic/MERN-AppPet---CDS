import Post from "../models/post.model.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getMyPosts = async (req, res) => {
  const posts = await Post.find({
    user: req.user.id,
  }).populate("user"); // Dame los datos del usuario

  res.json(posts);
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.find();

  res.json(posts);
};

export const createPost = async (req, res) => {
  try {
    console.log(req.body);
    const { description, photo, date } = req.body;
    let image = null;

    if (req.files?.photo) {
      const result = await uploadImage(req.files.photo.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      await fs.remove(req.files.photo.tempFilePath);
    }

    const newPost = new Post({
      description,
      photo: image,
      date,
      user: req.user.id,
    });

    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPost = async (req, res) => {
  const postFound = await Post.findById(req.params.id);
  if (!postFound) return res.status(404).json({ message: "Post not found" });

  res.json(postFound);
};

export const updatePost = async (req, res) => {
	try{
    const { description, photo, date } = req.body;
    let image = null;

		if(req.files){
			if (req.files?.photo) {
					const result = await uploadImage(req.files.photo.tempFilePath)
					image = {
							url: result.secure_url,
							public_id: result.public_id
					}
					await fs.remove(req.files.photo.tempFilePath)
			}
	
			req.body = ({
				description,
				photo: image,
				date,
			})
		} else{
			req.body = ({
				description,
				date,
			}) 
		}
	
		const postFound = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true, // Devuelve el dato nuevo
		});
		if (!postFound) return res.status(404).json({ message: "Post not found" });
	
		res.json(postFound);

	} catch (error) {
    res.status(500).json(error);
  }
};

export const deletePost = async (req, res) => {
  const postFound = await Post.findByIdAndDelete(req.params.id);
  if (!postFound) return res.status(404).json({ message: "Post not found" });

  if (postFound.photo.public_id) {
    await deleteImage(postFound.photo.public_id);
  }

  res.sendStatus(204);
};
