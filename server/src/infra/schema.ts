import mongoose from "mongoose";

export const negotiationSchema = new mongoose.Schema({
    data: { type: String, required: true},
    quantidade: { type: String, required: true},
    valor: { type: String, required: true}
});
