/* Importando o fastify e lembrando que tem que ser em minusculo */
import { fastify } from 'fastify';

/*Importando nosso database com os comando postgres*/
import { DatabasePostgres } from './database-postgres.js';

/*Criando um novo objeto postgres*/
const database = new DatabasePostgres();

/*Criando o objeto fastify*/
const server = fastify();

/*Rota para criar um vídeo, ou seja ao chamar localhost:3333/videos vou estar criando um vídeo*/
server.post('/videos', async(request, reply) => {

    /*Capturando o corpo da requisição que o usuário envio, desestruturando para pegar os campos em vez de navegar no objeto*/
    const {title, description, duration} = request.body;

    /*Usando o objeto do banco de dados usando o metodo create e nele estou passando as informações estaticas
    Como meu campos que vem do body são os mesmo para a requisição eu posso so simplesmente passar em vez de passar
    title: title posso so passar title*/
    await database.create({
        title,
        description,
        duration,
    })

    /*Retorna o status code, o statuscode e o retorno ao sistema se a operação foi bem sucessedida ou não*/
    return reply.status(201).send();
})

/*Perceba que posso usar a mesma url para operações diferentes
Para este caso vou usar a url como get para trazer informações*/
server.get('/videos', async (request) => {

    //Isso aqui e um query parameters aonde vamos buscar alguns itens com titles especificos
    const search = request.query.search;

    /*Capturando todos os video, com o search mas o search é opcional*/
    const videos = await database.list(search);

    /*Retornando os videos*/
    return videos;
});

/*Url de alteração de um vídeo e perceba que eu vou passar um parametro para esta url, pois vou estar alterando
apenas um vídeo com isso vamos usar o Route Parameter que é um parametro que passamos na rota (:id)*/
server.put('/videos/:id', async (request, reply) => {

    /*Capturando o corpo da requisição que o usuário envio, desestruturando para pegar os campos em vez de navegar no objeto*/
    const {title, description, duration} = request.body;

    /*Capturando o valor do id vindo da requisição*/
    const videoId = request.params.id;

    /*Acessando o database, realizando o update com a key videoId e pegando os dados do evento para alterar via request.body*/
    await database.update(videoId, {
        title,
        description,
        duration
    })

    /*Retornando status 204 que retorna sucesso, porém sem conteudo*/
    return reply.status(204).send();
})

/*Rota para exclusão de um vídeo aonde eu vou passar o parametro para esta url do vídeo que eu quero deletar*/
server.delete('/videos/:id', async (request, reply) => {
    
    /*Capturando o valor do id vindo da requisição*/
    const videoId = request.params.id;

    /*Deletando o video usando o id*/
    await database.delete(videoId);

    return reply.status(204).send();
})

/*Criando a porta do servidor, no fastify passamos um objeto com a propriedade da port com o valor da porta
Como vamos hospedar nosso serviço estamos usando a port do web service, mas caso não encontre vai usar a 3333*/
server.listen({
    host: "0.0.0.0", //Para o render
    port: process.env.PORT ?? 3333,
});