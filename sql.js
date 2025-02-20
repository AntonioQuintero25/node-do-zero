/*Importando o dotenv é configurando para que o meu arquivo .env vire variaveis globais*/
import 'dotenv/config';

/*Importando o postgre*/
import postgres from "postgres";

/*Pegando minha URL do arquivo .env*/
const {DATABASE_URL} = process.env;

/*Criando o objeto postgres e passando as configurações para ele, passando a minha URL que esta em .env e o cerificado ssl
E vamos exportar essa variavel para usar em outros arquivos*/
export const sql = postgres(DATABASE_URL, {ssl: 'require'});
