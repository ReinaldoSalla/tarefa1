/*
Query the 3 collections in the database
Command to run this file: npx ts-node querry.ts
*/

import mongoose from "mongoose";
import { configureConnection } from "./connection";
import { negotiationSchema } from "./schema";

function queryCollection(collectionName: string) {
    var NegotiationModel = mongoose.model(collectionName, negotiationSchema);
    NegotiationModel.find((err, data) => {
        console.log(data);
    });
}

configureConnection();
queryCollection("currents");
queryCollection("lasts");
queryCollection("previouslasts");
