var ile_kart=0;

window.onload=function(){
    var przycisk = document.getElementById("wczytajGre");
    przycisk.addEventListener("click",getValue);
};

function getValue(){
    ile_kart=document.getElementById("ileKart").value;
  //  alert(ile_kart);
    
    rozgrywka();
};

function rozgrywka(){
    
    var zestaw = new Array();
    var komplet = '';
 
    for (i = 0; i < (ile_kart*2); i++) {
        zestaw[i]='<div class="card"></div>';
        komplet=komplet+zestaw[i];
        //alert(komplet);
    }
    
    switch (ile_kart)
    {
        case "4":
            document.getElementById("board").style.width="600px";
            break;
        case "8":
        case '12':
        case '16':
            document.getElementById("board").style.width="1200px";
            break;
        default:
            alert("BŁĄD");
    }   
    document.getElementById("board").style.transition=" all .2s ease-in-out";
    document.getElementById("board").innerHTML = komplet; 
    
};