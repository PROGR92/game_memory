var ile_kart=0;
var przypisKart=new Array();
var fCardValue;

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

    //Przypisanie wartosci do kart
    addCardValue(ile_kart);

    //****************TU FUNKCJE POKAZANIA CALEJ TABLICY przez 2s 

    //activating event on click to all elements
    $( ".card" ).on( "click", function() {
        var index = $( ".card" ).index( this );
        var toCheck = 0;

        //alert( przypisKart[index] );

        //Pokazanie karty
        showCardImg(index);
        
        alert( przypisKart[index] );


        //test czy odsloniete juz dwie karty
        toCheck = $('.cardA').length;
        if (toCheck >= 2) {
                  
            compareCards(fCardValue,przypisKart[index]);

        }else{

            fCardValue=przypisKart[index];
        }     
    });
};

//Funkcja przypisujaca wartosci do elementów BOARD-a
function addCardValue(pair_nr){
    
    for (i=0; i<pair_nr*2; i++){
        przypisKart[i]=100;
    }
    //alert (przypisKart.length);

    //Przypisz wartosci dla elementów BOARD-a
    var index = 0
    for (i = 0; i < pair_nr; i++) {
        var double = 0
        do { 
            index = getRandomInt(0, przypisKart.length)
            if(przypisKart[index] == 100) {    
                przypisKart[index]=i;
                double++;
            }
        } while (double<2);
    }
    
}

//Zwraca wartość pseudolosowa w zakresie: >=min oraz <max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

//Funkcja wymieniajaca obrazek tla danej kliknietej karty
function showCardImg(cardindex){
    $( ".card:eq( "+ (cardindex) +")" ).css( "background-image" , 'url("img/'+(przypisKart[cardindex])+'.png")' ); 
    $( ".card:eq( "+ (cardindex) +")" ).toggleClass( 'cardA' );
};

//Funkcja porównania
function compareCards(fCard,sCard){
    if (fCard==sCard){
        alert("Zajebioza: "+sCard+" : "+fCard);
        for (i=0 ; i<=przypisKart.length;i++){
        //nie ten wskaznik na element
            if( przypisKart[i]==fCard ){
                $( ".card:eq( "+ i +")" ).css( "opacity" , '0' );
                //$( ".card:eq( "+ (sCard) +")" ).css( "opacity" , '0' );    
            }
        }
        //odłączenie 
        $( ".cardA:eq( "+ (1) +")" ).toggleClass( 'cardA' );
        $( ".cardA:eq( "+ (0) +")" ).toggleClass( 'cardA' );

    } else{
        alert("LIPA: "+fCard+"#:#"+sCard);
        $( ".cardA:eq( "+ (1) +")" ).toggleClass( 'cardA' );
        $( ".cardA:eq( "+ (0) +")" ).toggleClass( 'cardA' );
       
        //zmiana tła karty na domyślne
        for (i=0 ; i<=przypisKart.length;i++){
            
                if( (przypisKart[i]==fCard) ||  (przypisKart[i]==sCard) ){
                 
                    $( ".card:eq( "+ i +")" ).css( "background-image" , 'url("img/karta.png")' );
                  
                }
            }
        
        
        
        
        
    }
};
