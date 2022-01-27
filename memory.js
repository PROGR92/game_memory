var przypisKart = new Array();
var ile_kart = 0, fCardValue=-1, score = 0 , odkrytoPar=0;

window.onload=function(){
    var przycisk = document.getElementById("wczytajGre");
    przycisk.addEventListener("click",getValue);
};

function getValue(){
    ile_kart=document.getElementById("ileKart").value;
    rozgrywka();
};

function rozgrywka(){
    
    var zestaw = new Array();
    var komplet = '';//Zliczanie tur gracza
    score = 0;
    odkrytoPar = 0;
    $( "#score" ).text( "Wykonanych ruchów: " + score );
 
    //STWORZENIE ZAWARTOSCI DIV-A BOARD
    for (let i = 0; i < (ile_kart*2); i++) {
        zestaw[i]='<div class="card"></div>';
        komplet= komplet + zestaw[i];
    }
    //OKRESLENIE ROZMIARÓW DIV-A BOARD
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

    //document.getElementById("board").style.transition= "transform 2s";
    //document.getElementById("board").style.transform = "rotateX(360deg)";
    document.getElementById("board").innerHTML = komplet;

    //Przypisanie wartosci do kart
    addCardValue(ile_kart);

    //POKAZANIA CALEJ TABLICY przez 2s 
    for(let i=0;i<(ile_kart*2);i++){
        $( ".card:eq( "+ (i) +")" ).css( "background-image" , 'url("img/'+(przypisKart[i])+'.png")' ); 
        $( ".card:eq( "+ (i) +")" ).toggleClass( 'cardA' );
    }

    //PONOWNE UKRYCIE KART DO GRY
setTimeout(() => { 
        //odklejenie klasy cardA od kart tablicy
        for(let i=0;i<(ile_kart*2);i++){
            $( ".card:eq( "+ (i) +")" ).toggleClass( 'cardA' );
        }        
        document.getElementById("board").innerHTML = komplet; 
        //activating event on click to all elements
        $( ".card" ).on( "click", function() {
            var index = $( ".card" ).index( this );
            var toCheck = 0;


            if (toCheck = $('.cardA').length<2){
                //Pokazanie karty
                showCardImg(index);
                
                //test czy odsloniete juz dwie karty
                toCheck = $('.cardA').length;
                if (toCheck >= 2) {         
                    setTimeout(() => { compareCards(fCardValue,przypisKart[index]);
                        if(odkrytoPar==ile_kart){
                            //alert("WYGRANA");
                            document.getElementById("board").innerHTML = "WYGRANA w "+score+" ruchach.";
                            $( "#score" ).text( "" );
                        }
                    }, 700);
                    //Zliczanie tur gracza
                    score = score+1;
                    //Aktualizacja stanu licznika
                    $( "#score" ).text( "Wykonanych ruchów: "+ score );
                }
                else{
                    fCardValue=przypisKart[index];
                }
            }     
        });
    }, (ile_kart/2*1000*0.7));//OPUZNIENIE SCHOWANIA TABLICY KART
};

//Funkcja przypisujaca wartosci do elementów BOARD-a
function addCardValue(pair_nr){
    
    for (let i=0; i<pair_nr*2; i++){
        przypisKart[i]=100;
    }
    //alert (przypisKart.length);

    //Przypisz wartosci dla elementów BOARD-a
    var index = 0
    for (let i = 0; i < pair_nr; i++) {
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
    $( ".card:eq( "+ (cardindex) +")" ).addClass( 'cardA' ); //toggleClass( 'cardA' ); bload mozliwosci ponownego klikniecia karty
};

//Funkcja porównania KART
function compareCards(fCard,sCard){
    if (fCard==sCard){
        //alert("Zajebioza: "+sCard+" : "+fCard);
        for (let i=0 ; i<=przypisKart.length;i++){
        //Wyłączenie widocznosci kart które zostały odgadniete
            if( przypisKart[i]==fCard ){
                $( ".card:eq( "+ i +")" ).css( "opacity" , '0' );
                $( ".card:eq( "+ i +")" ).css( "cursor" , 'default' ); 
                //Wyłączenie EVENTU dla elementu
                $( ".card:eq( "+ i +")" ).off( );   
            }
        }
        //ODKLEJ KLASY DOKLEJONE
        $( ".cardA:eq( "+ (1) +")" ).toggleClass( 'cardA' );
        $( ".cardA:eq( "+ (0) +")" ).toggleClass( 'cardA' );
        odkrytoPar = odkrytoPar + 1;
    } else{
        //JESLI NIEPOWODZNIE ODKLEJ KLASY DOKLEJONE
        $( ".cardA:eq( "+ (1) +")" ).toggleClass( 'cardA' );
        $( ".cardA:eq( "+ (0) +")" ).toggleClass( 'cardA' );
       
        //zmiana tła karty na domyślne
        for (let i=0 ; i<=przypisKart.length;i++){
                if( (przypisKart[i]==fCard) ||  (przypisKart[i]==sCard) ){
                    $( ".card:eq( "+ i +")" ).css( "background-image" , 'url("img/karta.png")' );
                }
            }
     }
};
