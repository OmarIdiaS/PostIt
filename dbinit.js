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


  document.getElementById("post_it").ondblclick = function() {myFunction()};
    function myFunction() {
	    var x = event.clientX ; 
	    var y = event.clientY; 
	    var coor = "X :" + x + " Y :"  + y ; 
      
   


       
     /*
     var pp = document.createElement('input'); 
      pp.setAttribute("id","mab");
      pp.setAttribute("type","text");
      pp.setAttribute("name","coor");
      pp.setAttribute("value","{{data.coor}}");
       
      document.getElementById("postt").appendChild(pp);
      */
   /*    var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://responsible-justice.glitch.me/p", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     data = { "txt" , "xx" , "10 ; 20"}
      xhr.send(data);
      
     xhr.onload = function() {
      console.log(xhr.responseText);  // Simple text
      console.log(xhr.responseXML);   // XML (if the response is indeed XML)
      console.log(xhr.response);      // Configurable (text by default)
     */
  alert("oui"); 
      
}

