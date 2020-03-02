import { Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import { negotiationSchema } from "./infra/schema";
import { logger } from "./logger";

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
            const msg : string = `GET method for route /negociacoes/${subRoute}`;
            logger.info(msg); console.log(msg);
            res.json(data)
        });
    }

    public static postNegociacao(req: Request, res: Response) {
        req.body.data = new Date(req.body.data.replace(/-/g, '/'));
        const NegotiationModel = mongoose.model("saved", negotiationSchema);
        const clientNegotiation = new NegotiationModel({
            data: req.body.data,
            quantidade: req.body.quantidade,
            valor: req.body.valor
        });
        clientNegotiation.save();
        const msg: string = "POST method for route /negociacoes";
        logger.info(msg); console.log(msg);
    }

    public static deletaNegociacoes(req: Request, res: Response) {
        const collectionName: string = "saved"
        const NegotiationModel = mongoose.model(collectionName, negotiationSchema);
        NegotiationModel.deleteMany((err: Error, data: any) => {
            const msg: string = `DELETE method for route /negociacoes`
            const countedDocuments: string = `Deleted ${data.deletedCount} documents in collection ${collectionName}`
            logger.info(`${msg}. ${countedDocuments}`); console.log(msg);
        }); 
    }
}