import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
    location: {
      type: {
        type: String, // Tipo de geometría (en este caso, "Point")
        enum: ["Point"],
        required: false,
      },
      coordinates: {
        type: [Number], // [Longitud, Latitud]
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Índice geoespacial para consultas de proximidad
messageSchema.index({ location: "2dsphere" });

export default mongoose.model("Message", messageSchema);
