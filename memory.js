
window.onload=function(){
    var przycisk = document.getElementById("wczytajGre");
    przycisk.addEventListener("click",getValue);
};

function getValue(){
    var ile_kart=document.getElementById("ileKart").value;
    alert(ile_kart);
};