/************************************ 
 *                                  *
 *        CUISINE JAVASCRIPT        *
 *                                  *
 ***********************************/

$(document).ready(function(){
    
    
    $('.fallback').remove();                                        // verwijderen van class fallback heeft is overbodig wanneer er javascript is.
    $('.advertentie').css('display', 'block');                // tonen van de advertentie wanneer js beschikbaar is
    $('.navMenu li:nth-child(2)').css('visibility', 'visible' );    // tonen van het boodschappenmandje wanneer js beschikbaar is
    $('#filters').css('display', 'block');                     // tonen van het filter-blok wanneer js beschikbaar is
    
   /* ========================================================================
                            NAVIGATIE 
     =======================================================================*/
    
    
   
   /* *********** FUNCTIONS *********** */
   // function navigation-menu
        function showMenu(){
            $('.bottomHeader').animate({ left: "0"}, 1000);
        }

        function hideMenu(){
            $('.bottomHeader').animate({
                left: "-999px"
            }, 1000, function(){                 //callback
                $('.bottomHeader').removeAttr('style','left');       
               });  
            /*   na de animatie moet de style: left weggehaald worden,anders komen er problemen met responsive view modus tablet
                 er zit een inline style element in de html die niet overschreven kan worden. */
         }
    
    /* ************************ EVENTS *************************** */
    //click-event op hamburgermenu
        $(".menuBars").on('click', function(e){
             e.preventDefault();
             if($('.bottomHeader').attr('data-appearance') == "0"){

               showMenu();
               $('.bottomHeader').attr("data-appearance", "1");
             }
         });

         $(".closeMenu").on('click', function(e){
             e.preventDefault();
                 if($('.bottomHeader').attr('data-appearance') == "1"){
                     hideMenu();
                     $('.bottomHeader').attr("data-appearance", "0");
                 }
         });
    
    //weghalen van de iconen bij scrollen pagina
        $(window).on('scroll', function(){
            if($(window).scrollTop() == 0){
                $('.bottomHeader li').removeClass('hide');
            }
            else {
                $('.bottomHeader li').addClass('hide');
            }
        });
    
    
    
    /* =======================================================================
                               GOOGLE MAPS 
       =====================================================================*/
    /* *************************** EVENTS ********************************** */
        //click & mouseleave-event bij google-maps voor pointer event.
     
        $('.maps').on('click mouseleave', function(e){
                if(e.type == 'click'){
                    $(this).find('iframe').addClass('clicked');
                }
                else if(e.type == 'mouseleave'){
                    $(this).find('iframe').removeClass('clicked');
                }
        });           
    
    
    /* =======================================================================
                               BOEKEN PAGE 
       =====================================================================*/
    //ivm database file, alleen opvragen bij deze pagina
    var correctPageBooks = document.getElementById('books');    
    
  //  if(correctPageBooks){

        /*********************** VARIABELEN ***************************/ 
        var $bookCards = '<div id="productsContainer">';
        var imgPathBook="../images/boeken/";
        
        /*********************** EVENT ****************************/    
                for (var i = 0; i < boeken.length; i++) {
                            $bookCards += '<div id="boekId' + [i] + '" class="boek" data-waardering="' + boeken[i].rating +'" data-categorie="' + boeken[i].categorie + '">';
                            $bookCards += '<h2 title="' + boeken[i].titel +'">' + boeken[i].titel +'</h2>';
                            $bookCards += '<img src="'+ imgPathBook + boeken[i].image +'" alt="'+ boeken[i].titel + '">';
                            $bookCards += '<p title="prijs">&euro; '+ boeken[i].prijs+'</p>'   ;     
                            $bookCards += '<div><a href="../pages/boeken/'+ boeken[i].link +'" id="btnKoop" class="ctaContrast ctaAdd">Naar boek</a></div>' ;
                            //aantal sterren bepalen
                            $bookCards += '<div class="rating" aria-hidden="true">';
                                                for(var j=0; j<5; j++){
                                                    if(parseInt(boeken[i].rating) > j){
                                                            $bookCards += '<span class="fas fa-star"</span>'; 
                                                    } else {
                                                            $bookCards += '<span class="far fa-star"</span>'; 
                                                    }
                                                }
                            $bookCards += '</div>';
                            $bookCards += '</div>';
                };
            //toon alle informatie in de cards
                $bookCards += '</div>';
                $('#books').append($bookCards);     

  //  } //einde sniff
    
    
    /* =======================================================================
                            RECEPTEN PAGE 
    ========================================================================*/
    //ivm database file, alleen opvragen bij deze pagina
   // var correctPageRecipes = document.getElementById("recipes");  
    
   // if(correctPageRecipes){    

        /*********************** VARIABELEN ****************************/
        var $receptCards = '<div id="receptenContainer">';
        var imgPathRecept="../images/recepten/";
        
        /*********************** EVENTS ****************************/
                for (var i = 0; i < recepten.length; i++) {
                            $receptCards += '<div id="receptId' + [i] + '" class="recept" data-waardering="' + recepten[i].rating +'" data-categorie="' + recepten[i].categorie + '">';
                            $receptCards += '<h2 title="' + recepten[i].recept +'">' + recepten[i].recept +'</h2>';
                            $receptCards += '<img src="'+ imgPathRecept + recepten[i].image +'" alt="'+ recepten[i].recept + '">';
                            $receptCards += '<ol class="infoGerecht"><li class="tijd"><span>'+ recepten[i].tijd + '</span>min.</li>'  ;
                            $receptCards += '<li class="personen"><span>' + recepten[i].personen + '</span>pers.</li></ol>'
                            //aantal sterren bepalen
                            $receptCards += '<div class="rating" aria-hidden="true">';
                                            for(var j=0; j<5; j++){
                                                                if(parseInt(recepten[i].rating) > j){
                                                                        $receptCards += '<span class="fas fa-star"</span>'; 
                                                                } else {
                                                                        $receptCards += '<span class="far fa-star"</span>'; 
                                                                }
                                                        }
                            $receptCards += '</div>';
                            //link naar recept
                            $receptCards += '<div><a href="../pages/recepten/'+ recepten[i].link +'" id="btnKoop" class="ctaContrast ctaAdd">Naar recept</a></div>' ;
                            $receptCards += '</div>';
                };
            //toon alle informatie in de cards.
                $receptCards += '</div>';
                $('#recipes').append($receptCards);   
  //  }   //einde sniff
    
    
    //print-functionaliteit
    $('.print').on('click', function(e){
        e.preventDefault();
        window.print();
    });
    
    
    /* =======================================================================
                            FILTER-SYSTEEM 
       ======================================================================*/
        /*************************** VARIABELEN ***************************/    
         var $selection = [$("#receptenContainer > div"), $("#productsContainer > div")];
        
        /*************************** FUNCTIONS ***************************/
        //functie voor het controleren of de cards getoond of uit zicht moeten gaan
        function controle(element){
                console.log('getoond door ' + element);
                                if(element.attr("data-waardering-status") == "0" || element.attr("data-categorie-status") == "0"){
                                        element.hide();
                                }
                                else{
                                        element.show();
                                }
        }
        
        //aparte functie voor de selectall-checkbox functionaliteit
         function selectionAll(){
            for($choice of $selection){
                $($choice).each(function(){ 
                        if($("#all").is(":checked")){
                                    $(this).attr("data-categorie-status", "1");
                                    $(this).attr("data-waardering-status", "1");

                                    }
                         else{
                                    $(this).attr("data-waardering-status", "0");
                                    $(this).attr("data-categorie-status", "0");
                                }
                              //controleer status
                              controle($(this));
                            });
                        }
        }
        
        
        
        /*************************** EVENTS ***************************/
        // click-event voor de waardering- en categoriefilters
        $(".showHide").on('click',function(){
            var checkbox = $(this);
             //voor beide pagina's geldt de eerste div na de container
               //doorloop beide containers
                    for($choice of $selection){   
                        //doorloop de div's die cards bevatten in de containers
                            $($choice).each(function(){
                                    if($(this).attr("data-waardering") == checkbox.val() && checkbox.is(":checked")){
                                        $(this).attr("data-waardering-status", "1");
                                    }
                                    else if($(this).attr("data-waardering") == checkbox.val() && !checkbox.is(":checked")){
                                        $(this).attr("data-waardering-status", "0");
                                    }
                                    else if($(this).attr("data-categorie") == checkbox.val() && checkbox.is(":checked")){
                                        $(this).attr("data-categorie-status", "1");
                                    }
                                    else if($(this).attr("data-categorie") == checkbox.val() && !checkbox.is(":checked")){
                                        $(this).attr("data-categorie-status", "0");
                                    }
                                        
                                //controleer status
                                controle($(this));
                                  
                            }); //einde each loop
                    } //einde for loop van beide containers.

        }); //einde click-event filteropties
    
        //clickevent van de select all knop.
        $('#all').on('click', function() {
                $(':checkbox').prop('checked',this.checked);
                selectionAll();

        });// einde selectall click event
        
  /* ========================================================================
                                FORM VALIDATIE 
  =========================================================================*/
        /************************** VARIABELEN ************************/
            var prijs = 0;
            var count=0;
   
        /************************** FUNCTIONS *************************/
        // laat het bedrag zien op het scherm
            function toonBedrag(bedrag){
                $("#costs").text(bedrag);
            }// einde function toonBedrag
               
        // telt de kosten bij elkaar op
            function telBedragOp(element){
                if(element.is(":checked")){
                                prijs += parseFloat(element.attr("data-prijs"));
                            }
                            else{
                                prijs -= parseFloat(element.attr("data-prijs"));
                            }
                 // omzetten in een 2decimalen getal en vervangen van de punten met de komma          
                        var totaalPrijs = prijs.toFixed(2).replace(".",","); 
                 // aanroepen functie
                        toonBedrag(totaalPrijs);       
            }// einde function telBedragOp  
     
        // tonen bestelbevestiging in pop-up venster
        
        function confirmation(){
            var urlToOpen = "bevestiging.html";
            var windowName = "bevestiging";
            var options = "width=500, height=400, top=50, left=50";
            return window.open(urlToOpen,windowName,options);
        }// einde function confirmation
        
        // validatie van inputvelden
        function valideren(veldnaam){
            var controleVeld = veldnaam;
            var controleVeldValue = veldnaam.val();
            var controleCorrect = false;
        
                if(controleVeld.attr("id") == "email"){
                   var patternEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                   controleVeldValue = patternEmail.test(controleVeld.val());
                }
                if(controleVeld.attr("id") == "postcode"){
                   var patternPostcode = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;
                   controleVeldValue = patternPostcode.test(controleVeld.val());
                 }
                        //controleer of de uitkomst 'true' is.
                            if(controleVeldValue){
                                    controleVeld.siblings('span').remove(); //haal voor het geval dat de spans weg van een eerdere validatie
                                    controleVeld.after('<span class="fas fa-check correct"></span>'); //voeg een vinkje toe
                                    controleVeld.removeClass("invalid").addClass("valid");
                                    controleCorrect = true;

                                }
                            else{
                                    controleVeld.siblings('span').remove(); //haal voor het geval dat de spans weg van een eerdere validatie
                                    controleVeld.after('<span class="fas fa-times correct"></span>'); //voeg een kruisje toe
                                    controleVeld.removeClass("valid").addClass("invalid");

                            }
                return controleCorrect;

        } //einde function valideren  
    
    
        /************************ EVENTS ************************/
        // bij de eerste klik op de checkbox komt een scherm aan de zijkant met totaalkosten en bestelknop
            $("#bestelFormulier input[type=checkbox]").on('click', function(){
                    var n = $( "input:checked" ).length;
                    // wanneer er minimaal 1 checkbox is aangevinkt wordt het scherm getoond met kosten en bestelknop.
                    if(n !== 0){
                        $("#slider").animate({ 'right': '0px' }, 250);

                    }
                    else {
                        $("#slider").stop(true).animate({ 'right': '-400px' }, 250);
                    }
                    //activeer function optellen bedrag
                    telBedragOp($(this));
            });

        // bij het indrukken van knop "bestel Boek" op de content-boek-pagina's komt een getal bij het winkelmandje
            $('#bestelBoek').on('click', function(e){
                   e.preventDefault(); 
                    count++;
                    
                    // naar het winkelwagentje gaan
                    $('html, body').stop().animate({
                            scrollTop: $('#winkelWagen').offset().top 
                            
                    },500,function() {
                                window.location.hash = $("#winkelWagen");
                            });
                    
                    $('#bestelItem').text(count).animate({
                            opacity : 1
                    }, 1000);     

            });
    
        // voor de nieuwsbrief
            $('#knopAanmelden').on('click', function(e) {
                    var input=$('#email');
                    var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                    var validateEmail= pattern.test(input.val());
                    if(validateEmail){
                        input.removeClass("invalid").addClass("valid");
                        alert("Bedankt voor het aanmelden van de nieuwsbrief!");
                    }
                    else{
                        e.preventDefault();
                        input.removeClass("valid").addClass("invalid");
                    }
            });


        // voor het plaatsen van de bestelling
            $("#knopBestellen").on("click", function(e){
                    var naamControle        = valideren($("#naam"));
                    var mailControle        = valideren($("#email"));
                    var adresControle       = valideren($("#adres"));
                    var postcodeControle    = valideren($("#postcode"));
                    var woonplaatsControle  = valideren($("#woonplaats"));
                    var controleCompleet    = naamControle && mailControle && adresControle && postcodeControle && woonplaatsControle;

                       if(!controleCompleet){
                           e.preventDefault();
                       }
                       else{
                           confirmation();
                       }
            });
    
        // voor het verzenden van het contactformulier
            $("#knopContact").on("click", function(e){
                    var naamControle        = valideren($("#naam"));
                    var mailControle        = valideren($("#email"));
                    var controleCompleet    = naamControle && mailControle;

                       if(!controleCompleet){
                           e.preventDefault();
                       }
                       else{
                           alert("Beste klant, bedankt voor uw vraag.");
                       }
            });
}); // einde van jquery document ready