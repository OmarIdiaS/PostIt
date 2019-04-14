
  
//setInterval(function(){ window.location.reload();}, 3000);
    document.getElementById("post_it").ondblclick = function() {myfunction()};
 /*
    function allowDrop(ev){
	ev.preventDefault(); 
}	

function dragStart(ev){
	
	id = ev.target.id ; 
	alert(id);
	
}

function drop(ev){
	
	ev.target.append(document.getElementById(id));
}
 */
    
    
    //function s(x,y){console.log(x +  "" + y);}
    
    function s(x,y,z,a,b){
   
   var texte = prompt("Saisir votre texte ::");
   
   var xhr = new XMLHttpRequest();
    var url = "/modif";
    

   
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var json = JSON.stringify(xhr.responseText);
        alert("les donnees sont envoyer a la BD");
        window.location.reload();

      }
    };
      
      
      
 // s('{{d.id}}', '{{d.useer}}' , '{{d.txt}}', '{{d.datee}}' , '{{d.coor}}')
  var data = {id: x};
  xhr.open("POST", url, true); 
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
      
  console.log('okk');
 
   
 };
    
    
 
    
 function myfunction() {
   
   // Coordonnees
    var x = event.clientX ; 
	  var y = event.clientY; 
	  var coor = "X :" + x + " Y :"  + y ;
  
   // Date
   var d = new Date(); 
	
	var j = d.getDate(); 
	var mois = d.getMonth() + 1; 
	var annee = d.getFullYear(); 
	var h = d.getHours(); 
	var m = d.getMinutes();
   var date = j+"/"+mois+"/"+annee+"  "+h+":"+m ; 
   
   //TEXTE
   
   var texte = prompt("Saisir votre texte ::");
   
    var xhr = new XMLHttpRequest();
    var url = "/p";
    xhr.open("POST", url, true); 

   
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var json = JSON.stringify(xhr.responseText);
        alert("les donnees sont envoyer a la BD");
        //window.setInterval(window.location.reload(),2)
        window.location.reload();
//                setInterval(function(){ window.location.reload();}, 3000);

      //settimeout(setInterval(function(){ window.location.reload();}, 4000);


      //window.location.reload();
      }
    };
  
  var data = { txt : texte, datee : date, coor : coor};
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
  console.log('okk');
   
 }
    
    
   
  function fct(x){
    var y = prompt("saisir"); 
  document.getElementById(x).value = y;
    
  }