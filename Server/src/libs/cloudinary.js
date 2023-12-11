import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: "disi3bzmx",
    api_key: "197289124367368",
    api_secret: "rcBZ3ai6VQeJeE89eVtS-SUU09g"
})

export const uploadImage = async filepath => {
    return await cloudinary.uploader.upload(filepath, {
        folder: 'posts',
        transformation: [
            { width: 400, height: 250, crop: "limit", format: "webp" },
        ]
    })
}

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)   // Elimina la foto con esta publicacion desde cloudinary
}