var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: ".data/db.sqlite3"
    },
    debug: true,
});

async function bd_create() {
     await knex.raw(`DROP TABLE IF EXISTS users`);  

    await knex.raw(`CREATE TABLE users (
    login VARCHAR(255) PRIMARY KEY,
    pass VARCHAR(255) NOT NULL
  )`);
  
   await knex.raw(`DROP TABLE IF EXISTS users`);  
    await knex.raw(`CREATE TABLE users (
    login VARCHAR(255) PRIMARY KEY,
    pass VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    color1 VARCHAR(10),
    color2 VARCHAR(10)
  )`);
  
   knex('users').columnInfo();
  
  await knex('users')
  .insert({ 'login': 'ztoto', 'pass': 'toto','name':'zidane toto', 'color1':'red','color2':'blue' });//,
       //  { login: 'ztata', pass: 'tata',name:'zidane tata', color1:'yellow',color2:'black' });
  await knex('users')
  .insert({ login: 'ztata', pass: 'tata',name:'zidane tata', color1:'yellow',color2:'black' });
  
var rows = await knex('users');
  for (var r of rows) {
    console.log('User:', r.name);
  }
  console.log('Done');
  
  
 await knex.destroy();
}





bd_create();

//bd_show();