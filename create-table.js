import {sql} from './sql.js';

sql `
 CREATE TABLE videos (
   id TEXT PRIMARY KEY,
   title TEXT,
   description TEXT,
   duration INTEGER
 );
`.then(() => {
    console.log("Tabela criada");
}).catch(error => console.log(error));

/* Comando para apagar alguma tabela
sql`DROP TABLE IF EXISTS videos`.then(() => {
    console.log("Tabela excluida");
}).catch(error => console.log(error));
*/