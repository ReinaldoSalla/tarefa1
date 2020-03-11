running:
cd server && npm run start
cd client && npm run watch
static content is served on localhost:3000 

http methods:
GET: localhost:3000/negociacoes/salvas
POST: localhost:3000/negociacoes
DELETE: localhost:3000//negociacoes

importing negotiations:
cd src/client/infra && npx ts-node populate.db
GET: localhost:3000/negociacoes/semana
GET: localhost:3000/negociacoes/anterior
GET: localhost:3000/negociacoes/retrasada

todo:
Validate the date(currently, only amount and valid are being validated)
GET method for one negotiation with id
PATCH method for one negotiation with id 
DELETE method for one negotiation with id

improved version using nestjs: 
https://github.com/ReinaldoSalla/tarefa5