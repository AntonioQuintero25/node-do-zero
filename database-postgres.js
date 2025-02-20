/*Importação de criptografia do node que vai me gerar um id*/
import { randomUUID } from "node:crypto";

/*Importando o sql para executar operações SQL*/
import { sql } from "./sql.js";

/* Uma classe aonde vai ter todas as nossas operações de banco de dados*/
export class DatabasePostgres{

    async list(search){
        //Criando uma variavel fazia pois dependendo do valor de search sera alterada
        let videos

        if(search){
            /*Se search vier preenchida vou usar where na minha operação busca com ilike
            pois ignora caixa alta e caixa baixa e usando %search% estou buscando independente da localização
            da frase, seja no inicio ou no fim*/
            videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
        }else{
            /*Trazendo todos os resultado de videos sem filtro*/
            videos = await sql`select * from videos`;
        }

        //Retornando a operação sql
        return videos;
    }

    async create(video){
        /*Gerando o id do video*/
        const videoId = randomUUID();

        /*Capturando os campos do video*/
        const {title, description, duration} = video;

        /*Requisição SQL para criar um video*/
        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`;
    }

    
    async update(id, video){
      /*Capturando os campos do video*/
      const {title, description, duration} = video;

      /*Requisição SQL*/
      await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
    }

    async delete(id){

        /*Requisição SQL delete usando o id que vem do parametro*/
        await sql`delete from videos where id = ${id}`
    }
}