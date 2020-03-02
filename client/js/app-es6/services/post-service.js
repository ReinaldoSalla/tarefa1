import { HttpService } from "./HttpService";

export class PostService {
    constructor(inputData, inputQuantidade, inputValor) {
        this.inputData = inputData;
        this.inputQuantidade = inputQuantidade;
        this.inputValor = inputValor;
        this.usDate = this.convertDate(this.inputData.value)
        this.negociacao = {
            data: this.usDate,
            quantidade: this.inputQuantidade.value,
            valor: this.inputValor.value
        }
        this.sendData(this.negociacao);
    }

    convertDate(date) {
        // Client = day/month/year = 0/1/2
        // Server = year/month/date = 2/1/0
        const elements = date.split("/");
        elements[1] = parseInt(elements[1] - 1);
        return new Date(elements[2], elements[1], elements[0]);
    }

    sendData(negociacao) {
        new HttpService().post('/negociacoes', negociacao)
    }
}