import { HttpService } from "./HttpService";

export class PostService {
    constructor(inputData, inputQuantidade, inputValor) {
        this.inputData = inputData;
        this.inputQuantidade = inputQuantidade;
        this.inputValor = inputValor;
        this.negociacao = {
            data: this.inputData.value,
            quantidade: this.inputQuantidade.value,
            valor: this.inputValor.value
        }
    }

    sendData(negociacao=this.negociacao) {
        return new HttpService().post('/negociacoes', negociacao)
    }
}