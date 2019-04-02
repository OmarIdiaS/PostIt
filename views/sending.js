exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('donn').del()
  .then(function () {
    // Inserts seed entries
    return knex('donn').insert([
      {
        login : 'ka', 
        txt : 'fa', 
        coor : 'sa'
      },
    ]);
  });
};