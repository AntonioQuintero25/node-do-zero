/* Importando o fastify e lembrando que tem que ser em minusculo */
import { fastify } from 'fastify';

/*Criando o objeto fastify*/
const server = fastify();

/*Rota padrão que ao usuário cair no meu localhost:3333 vamos renderizar essa mensagem*/
server.get('/', () => {
    return 'Hello World'
})

/*Rota com um paramétro a mais que vai me retornar outra mensagem*/
server.get('/hello', () => {
    return 'Hello Hello World'
})

/*Rota com um paramétro a mais que vai me retornar outra mensagem*/
server.get('/node', () => {
    return 'Hello Node'
})

/*Criando a porta do servidor, no fastify passamos um objeto com a propriedade da port com o valor da porta*/
server.listen({
    port: 3333,
});