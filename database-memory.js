/*Importação de criptografia do node que vai me gerar um id*/
import { randomUUID } from "node:crypto";

/* Uma classe aonde vai ter todas as nossas operações de banco de dados*/
export class DatabaseMemory{
    /*Ao usar o hashtag estou informando que essa propriedade e para ser vista apenas dentro da classe
    Estamos usando o MAP pois ele é um objeto que eu preciso passar um key ou id e o conteúdo além de ter API
    mais eficientes para as nossas necessidades*/
    #videos = new Map();

    /*Função para retornar os video
    Foi adicionado um query parameters para caso queira filtrar por um id especifico*/
    list(search){

        /*Converte uma estrutura de dados que não é um Array para um Array
        Em seguida usamos a função entries que me retorna o id dos videos
        Em seguida vamos percorrer esse array para formatar os campos dele e retornar um objeto
        Em seguida estamos realizando um filter que caso o usuario tenha preenchido o search vamos realizar um filtro*/
       return Array.from(this.#videos.entries()).map((videoArray) => {

        /*Capturando o id do video*/
        const id = videoArray[0];

        /*Capturando os outros campos do video*/
        const data = videoArray[1];

        /*Retornando um novo objeto*/
        return {
            id,
            ...data,
        }
       }).filter(video => {
        if(search){
            return video.title.includes(search)
       }

       return true;
     })
    }

    /*O método create vai adicionar os vídeo a nossa propriedade videos, recebendo um parametro video
    Em seguida vamos criar um uuid para que cada vídeo seja unico,
    Logo após vamos passar para o MAP video o meu id com o meu valor*/
    create(video){
        const videoId = randomUUID();
        //UUID - Unique Universal ID
        this.#videos.set(videoId, video);
    }

    /*Método que vai receber o id para alterar o video, em nosso caso estamos enviando novamente o vídeo em vez de encontrar e substituir*/
    update(id, video){
        this.#videos.set(id, video)
    }

    /*Método que vai deletar o video usando o id*/
    delete(id){
        this.#videos.delete(id)
    }
}