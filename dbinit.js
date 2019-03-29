var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: ".data/db.sqlite3"
    },
    debug: true,
});

async function init() {
  await knex.schema.dropTableIfExists('donn');

  await knex.schema.createTable('donn', (table) => {
    table.string('login');
    table.string('txt');
    table.string('coor');
    
  });
  
  var cols = await knex('donn').columnInfo();
  console.log('Columns:', cols);
  
  await knex('donn').insert({ login: 'foo', txt : 'oui', coor : '10 : 20'});
  
  
  var rows = await knex('donn');
  console.log('Rows:', rows);

  await knex.destroy();
}
init();
