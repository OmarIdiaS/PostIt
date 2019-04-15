    
    
 document.getElementById("post_it").ondblclick = function() {myfunction()};
 
function clickdiv(id){
  
  var mousePosition;
var offset = [0,0];
var div;
var isDown = false;
div = document.getElementById(id);
  div.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        div.offsetLeft - e.clientX,
        div.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        div.style.left = (mousePosition.x + offset[0]) + 'px';
        div.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);
}
  
    
    
    
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
   
   if(texte == null || texte == ""){ return;}
   
    var xhr = new XMLHttpRequest();
    var url = "/p";
    xhr.open("POST", url, true); 

   
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var json = JSON.stringify(xhr.responseText);
        alert("les donnees sont envoyer a la BD");
        window.location.reload();
      }
      
    };
  
  var data = { login: texte, txt : date, x : x, y: y};
   var data = {txt : texte , x: x , y: y ,  datee : date }
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
  console.log('okk');
   
 }
    
  
  
  var width=100;
 var difference=2;
 var interveralID =0;
 //document.getElementById("img1").style.width=width;
 
 function increase()
 {
 clearInterval(interveralID);
 interveralID=setInterval(expand,10);
 }
 function decrease()
 {
 clearInterval(interveralID);
 interveralID=setInterval(shrink,10);
 }
 function expand()
 {
 if(width<200)
 {
 width = width+difference;
 document.getElementById("imgg").style.width=width;
 console.log(width);
 }
 else
 {
 clearInterval(interveralID);
 }
 
 }
 function shrink()
 {
 if(width>100)
 {
 width = width-difference;
 document.getElementById("imgg").style.width=width;
 console.log(width);
 }
 else
 {
 clearInterval(interveralID);
 }
 
 }

 function fct(x,b){
    alert('voulez-vous modifier votre post_it ? '); 
    var y = prompt("saisir"); 
   
  document.getElementById(x).value = y;
   
   var d = new Date(); 
	
	 var j = d.getDate(); 
	 var mois = d.getMonth() + 1; 
	 var annee = d.getFullYear(); 
	 var h = d.getHours(); 
	 var m = d.getMinutes();
   var date = j+"/"+mois+"/"+annee+"  "+h+":"+m ; 
   
   document.getElementById(b).value = date;
    
  }