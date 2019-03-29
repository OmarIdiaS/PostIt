var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: ".data/db.sqlite3"
    },
    debug: true,
});

async function init() {
  await knex.schema.dropTableIfExists('dn');

  await knex.schema.createTable('dn', (table) => {
    table.string('login').primary();
    
  });
  
  var cols = await knex('db').columnInfo();
  console.log('Columns:', cols);
  
  await knex('dn').insert({ login: 'foo'});
  
  
  var rows = await knex('dn');
  console.log('Rows:', rows);

  await knex.destroy();
}
init();
