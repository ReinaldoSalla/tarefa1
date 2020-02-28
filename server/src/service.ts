import { Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import { negotiationSchema } from "./infra/schema";

export class Service {

    public static listaSemana(req: Request, res: Response) {
        const NegotiationModel = mongoose.model("currents", negotiationSchema);
        NegotiationModel.find((err: Error, data: Document) => {
            if(err) console.log(err);
            console.log("GET method for /negociacoes/semana");
            res.json(data);
        })
    }

    public static listaAnterior(req: Request, res: Response) {
        const NegotiationModel = mongoose.model("lasts", negotiationSchema);
        NegotiationModel.find((err: Error, data: Document) => {
            if(err) console.log(err);
            console.log("GET method for /negociacoes/anterior");
            res.json(data);
        })
    }

    public static listaRetrasada(req: Request, res: Response) {
        const NegotiationModel = mongoose.model("previouslasts", negotiationSchema);
        NegotiationModel.find((err: Error, data: Document) => {
            if(err) console.log(err);
            console.log("GET method for /negociacoes/retrasada");
            res.json(data);
        })
    }

    public static listaSalvas(req: Request, res: Response) {
        const NegotiationModel = mongoose.model("saveds", negotiationSchema);
        NegotiationModel.find((err: Error, data: Document) => {
            if(err) console.log(err);
            console.log("GET method for /negociacoes/salvas");
            res.json(data);
        })
    }

    public static cadastraNegociacao(req: Request, res: Response) {
        console.log("POST method for /negociacoes");
        req.body.data = new Date(req.body.data.replace(/-/g, '/'));
        const NegotiationModel = mongoose.model("saveds", negotiationSchema);
        const clientNegotiation = new NegotiationModel({
            data: req.body.data,
            quantidade: req.body.quantidade,
            valor: req.body.valor
        });
        clientNegotiation.save();
    }

    public static deletaNegociacoes(req: Request, res: Response) {
        const collectionName: string = "saveds"
        const NegotiationModel = mongoose.model(collectionName, negotiationSchema);
        NegotiationModel.deleteMany((err: Error, data: any) => {
            console.log(`DELETE method for /negociacoes. Deleted ${data.deletedCount} documents in collection ${collectionName}`)
        }); 
    }
}