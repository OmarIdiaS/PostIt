var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: ".data/db.sqlite3"
    },
    debug: true,
});

async function init() {
  
  await knex.schema.dropTableIfExists('users');
  
  await knex.schema.dropTableIfExists('donn');
  
  await knex.schema.createTable('users', (table) => {
    table.string('login').primary();
    table.string('pass').notNullable();
    table.string('name');
    
    
    
  });
  await knex.schema.createTable('donn', (table) => {
    table.string('txt');
    table.string('datee');
    table.string('useer');
    table.string('x'); 
    table.string('y'); 
    table.increments();
  });

  
  await knex.raw(`insert into users values ('admin', 'admin', 'admin')`);
  await knex.raw(`insert into  donn ('foo', 'txt', ,'2','3','coor','omar')`);
  
 
}
init();


  

