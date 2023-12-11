import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://Carlos:BDMongoProyecto@cluster0.zdfrryr.mongodb.net/?retryWrites=true&w=majority");
        console.log("DB is connected");
    } catch(error){
        console.log(error);
    }
};
