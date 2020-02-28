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
        this.sendData();
    }

    sendData() {
        new HttpService().post('/negociacoes', this.negociacao)
        /*
        .then(() => {
            this.inputData.value = '';
            this.inputQuantidade.value = 1;
            this.inputValor.value = 0.0;
            this.inputData.focus();
            // For some reason it never gets here, but it sends the POST
        })
        .catch(erro => alert(`Não foi possível enviar a negociação: ${erro}`));
        */
    }
}