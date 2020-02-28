import mongoose from "mongoose";
import { dbUrl } from "../properties";

export function configureConnection(): void {
    const db = mongoose.connection;
    mongoose.set('useFindAndModify', false); // Set to false to remove a DeprecationWarning message when using findByIdAndUpdate in service.ts
    mongoose.connect(dbUrl, { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    });
    db.on("error", console.error.bind(console, "Connection error with MongoDB"));
    console.log(`MongoDB connected. URL: ${dbUrl}`);
}