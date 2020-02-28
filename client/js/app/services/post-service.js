"use strict";

System.register(["./HttpService"], function (_export, _context) {
    "use strict";

    var HttpService, _createClass, PostService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("PostService", PostService = function () {
                function PostService(inputData, inputQuantidade, inputValor) {
                    _classCallCheck(this, PostService);

                    this.inputData = inputData;
                    this.inputQuantidade = inputQuantidade;
                    this.inputValor = inputValor;
                    this.negociacao = {
                        data: this.inputData.value,
                        quantidade: this.inputQuantidade.value,
                        valor: this.inputValor.value
                    };
                    this.sendData();
                }

                _createClass(PostService, [{
                    key: "sendData",
                    value: function sendData() {
                        new HttpService().post('/negociacoes', this.negociacao);
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
                }]);

                return PostService;
            }());

            _export("PostService", PostService);
        }
    };
});
//# sourceMappingURL=post-service.js.map