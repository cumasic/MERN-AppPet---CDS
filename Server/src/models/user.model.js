import mongoose from "mongoose";

//Esquema de los usuarios servira mas adelante
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        trim: true, //Sirve para eliminar espacios
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    photo: {
        url: String,
        public_id: String,
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema) //Crea una coleccion de usuarios y los guarda en objeto, lo hace mongoose
