import User from '../models/user.model.js'
import { uploadImage, deleteImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json('No such User')
        }
    } catch (error) {
        
    }
}

export const updateUser = async (req,res) => {
    const { username,email, phone, photo, address } = req.body
    let image

    if(req.files){
        if (req.files.image) {
            const resp = await uploadImage(req.files.image.tempFilePath)
            image = {
                url: resp.secure_url,
                public_id: resp.public_id
            }
            await fs.remove(req.files.image.tempFilePath)
        }
    
        req.body = ({
            username,
            email,
            phone,
            photo: image,
            address,
        })
    } else{
        req.body = ({
            username,
            email,
            phone,
            address,
        }) 
    }
    
    const UserFound = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true   // Devuelve el dato nuevo
    })
    if (!UserFound) return res.status(404).json({message: 'User not found'})
    
    res.json(UserFound)
}