import { Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import { negotiationSchema } from "./infra/schema";
import { logger } from "./logger";
import { httpStatus } from "./http-status"
import { validationResult } from "express-validator";
import Calendar from "./utils/calendar";

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
            if(err) res.status(httpStatus.badRequest).send(err);
            const msg : string = `GET method for route /negociacoes/${subRoute}`;
            logger.info(msg); console.log(msg);
            res.json(data)
        });
    }

    public static postNegociacao(req: Request, res: Response) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const msg: string = "Error during POST method for route /negociacoes";
            logger.info(msg); console.log(msg);
            res.status(httpStatus.unprocessableEntity).json({ errors: errors.array() });
        } else {
            const usDate: Date = Calendar.convertFromBrToUs(req.body.data);
            const NegotiationModel = mongoose.model("saved", negotiationSchema);
            const clientNegotiation = new NegotiationModel({
                data: usDate,
                quantidade: req.body.quantidade,
                valor: req.body.valor
            });
            clientNegotiation.save((err: Error, data: Document) => {
                if(err) res.status(httpStatus.badRequest).send(err);
                const msg: string = "POST method for route /negociacoes";
                logger.info(msg); console.log(msg);
                res.status(httpStatus.created).json(data);
            })
        }
    }

    public static deletaNegociacoes(req: Request, res: Response) {
        const collectionName: string = "saved"
        const NegotiationModel = mongoose.model(collectionName, negotiationSchema);
        NegotiationModel.deleteMany((err: Error, data: any) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            const msg: string = `DELETE method for route /negociacoes`
            const countedDocuments: string = `Deleted ${data.deletedCount} documents in collection ${collectionName}`
            logger.info(`${msg}. ${countedDocuments}`); console.log(msg);
            res.status(httpStatus.noContentDeleted).send(msg);
        }); 
    }
}