## Usage: 

`cd server && npm run start` 

`cd client && npm run watch` 

static content is served on localhost:3000



## Http methods: 

GET: localhost:3000/negociacoes/salvas 

POST: localhost:3000/negociacoes 

DELETE: localhost:3000//negociacoes 



## Importing negotiations: 

`cd src/client/infra && npx ts-node populate.db` 

GET: localhost:3000/negociacoes/semana 

GET: localhost:3000/negociacoes/anterior 

GET: localhost:3000/negociacoes/retrasada 



## Todo: 

Validate the date (currently, only amount and valid are being validated) 

GET method for one negotiation with id 

PATCH method for one negotiation with id 

DELETE method for one negotiation with id 



## Improved version using nestjs: 
https://github.com/ReinaldoSalla/tarefa5