import { Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import { negotiationSchema } from "./infra/schema";

export default class Service {

    public static listaSemana(req: Request, res: Response) {
        Service.getMethod("current", "semana", res);      
    }

    public static listaAnterior(req: Request, res: Response) {
        Service.getMethod("last", "anterior", res);
    }

    public static listaRetrasada(req: Request, res: Response) {
        Service.getMethod("previouslast", "retrasada", res);
    }

    public static listaSalvas(req: Request, res: Response) {
       Service.getMethod("saved", "salvas", res);
    }

    private static getMethod(collectionName: string, subRoute: string, res: Response): void {
        const NegotiationModel = mongoose.model(collectionName, negotiationSchema);
        NegotiationModel.find((err: Error, data: Document) => {
            if(err) console.log(err);
            console.log(`GET method for /negociacoes/${subRoute}`);
            res.json(data)
        });
    }

    public static postNegociacao(req: Request, res: Response) {
        console.log("POST method for /negociacoes");
        req.body.data = new Date(req.body.data.replace(/-/g, '/'));
        const NegotiationModel = mongoose.model("saved", negotiationSchema);
        const clientNegotiation = new NegotiationModel({
            data: req.body.data,
            quantidade: req.body.quantidade,
            valor: req.body.valor
        });
        clientNegotiation.save();
    }

    public static deletaNegociacoes(req: Request, res: Response) {
        const collectionName: string = "saved"
        const NegotiationModel = mongoose.model(collectionName, negotiationSchema);
        NegotiationModel.deleteMany((err: Error, data: any) => {
            console.log(`DELETE method for /negociacoes. Deleted ${data.deletedCount} documents in collection ${collectionName}`)
        }); 
    }
}