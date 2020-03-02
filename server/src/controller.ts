import { Application } from "express";
import Service from "./service";

export class Controller {
    constructor(private app: Application) {
        this.configureRoutes();
    }
  
    public configureRoutes() {
        this.app.route("/negociacoes/semana").get(Service.listaSemana);
        this.app.route("/negociacoes/anterior").get(Service.listaAnterior);
        this.app.route("/negociacoes/retrasada").get(Service.listaRetrasada);
        this.app.route("/negociacoes/salvas").get(Service.listaSalvas);
        this.app.route("/negociacoes").post(Service.postNegociacao);
        this.app.route("/negociacoes").delete(Service.deletaNegociacoes);
    }
}
