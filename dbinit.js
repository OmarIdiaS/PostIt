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
    table.string('login');
    table.string('txt');
    table.string('coor'); 
    table.string('useer');
    table.increments();
  });

  
  await knex.raw(`insert into users values ('foo', '12345', 'admin')`);
  await knex.raw(`insert into  donn ('foo', 'txt', 'coor','omar')`);
  
 
}
init();


  

