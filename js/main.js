var disegniPiante = {};
var JSON;

 //$.getJSON('js/lista_segnature.json', function(response){
 //  console.log(response)
 //      JSON = response;
 //      alert(JSON.property);
 //})
 ////feel free to use chained handlers, or even make custom events out of them!
 //.success(function() { alert("second success"); })
 //.error(function(error) { console.log(error); })
 //.complete(function() { alert("complete"); });

var templateHelpers = {
    returnBool: function(val) {
        if (val == 0) {
            return "no"
        } else {
            return "si"
        }

    }
}

function initialize() {

    //cleanScreen();
   $("#LoadingLista").show();
   $("#LoadingRicerche").show();
   createListaMain(lista_segnature,0)
 //   getListaSegnature();
    createAllSelects();

    
    
    $("#ButtonRicercaTesto").on("click", function() {
                $('#selectRicercaToponimo').val('');
                $('#selectRicercaClassificazione').val('');
                $('#selectRicercaAutore').val('');
      var testo = $('#RicercaTesto').val();
      var testo2 = $('#RicercaTesto2').val();
      if (testo == '') {
         alert ( 'inserire il primo termine per la ricerca')
      }
      
      else
      {
         ricercaTesto(testo,testo2);
      }
      
    });
    $("#azzeraRicerche").on("click", function() {
                              console.log('azzera')
                              $("#listaPrincipale").html('');
                                              $('#selectRicercaToponimo').val('');
                $('#selectRicercaClassificazione').val('');
                $('#selectRicercaAutore').val('');
                $('#RicercaTesto').val('');
                $('#RicercaTesto2').val('');
               createListaMain(lista_segnature,0);
    });

}



function createListaMain(lista_segnature,openlista) {
   console.log('main')
    var tmplMarkup = $('#templateSegnatura').html();
    var tmplMarkup2 = $('#templateHome').html();
    //cleanScreen();
    //  $("#Loading").show();
    //  console.log(luoghi)
    var arrayLength = lista_segnature.length;
    //  console.log(arrayLength)
    for (var i = 0; i < arrayLength; i++) {
        var cartella = (lista_segnature[i].cartella);
        var schede = (lista_segnature[i].schede);
        var compiledTmpl = _.template(tmplMarkup, {
            cartella: cartella,
            schede: schede
        });
        $("#listaPrincipale").append(compiledTmpl);
        var compiledTmpl2 = _.template(tmplMarkup2);
        $("#scheda").html(compiledTmpl2);
        

    }
    $("#accordion .expanded").hide();
    $("a.opening").click(function() {
        $(this).next().slideToggle('fast', function() {
            $(this).prev("a.opening").toggleClass("active");
        });
        return false;
    });
    $("#LoadingLista").hide();
    $("li").on("click", function() {
        
        var segnatura = $(this).text();
        getScheda(segnatura);
    });
    $("#Nascondi").on("click", function() {
        $("#accordion .expanded").hide();
        var sections = $('#accordion').find("a");
         sections.each(function(index, section){
    if ($(section).hasClass('active') ) {
      console.log('active');
      $(section).toggleClass("active");
    }
  });
        $("#accordion a.opening").toggleClass("active");
    });
    $("#Mostra").on("click", function() {
        $("#accordion .expanded").show();
        var sections = $('#accordion').find("a");
         sections.each(function(index, section){
    if (!$(section).hasClass('active') ) {
      console.log('active');
      $(section).toggleClass("active");
    }
  });

        
    });
    if (openlista===1) {
      $("#Mostra").click();
    }
    
}

function createAllSelects(){
createSelectToponimi( function() {
  createSelectNominativi(function() {
    createSelectClassificazioni(function(){
      hideLoadingRicerche();
      });
  });
});
}

function getListaSegnature(){
   var segnatura = [80, 239, 1];
    var url = "php/segnature.php"
    $.ajax({
        async: true,
        url: url,
        dataType: 'json',
        success: function(response) {
            CreateListaSegnature(response)

        }
    });
    getScheda(segnatura);
}

function CreateListaSegnature(segnature, openlista) {
    var tmplMarkup = $('#templateSegnatureTrovate').html();
        var compiledTmpl = _.template(tmplMarkup, {
            segnature: segnature,
            count: segnature.length
        });
        $("#listaPrincipale").append(compiledTmpl);
    $("#LoadingLista").hide();
    $("li").on("click", function() {
        var segnatura = $(this).text();
        getScheda(segnatura);
    });
}

function hideLoadingRicerche()
{
   console.log('Chiudi')
   $("#LoadingRicerche").hide();
}

function createSelectToponimi(callback) {
   console.log('Toponimi')
    var tmplMarkup = $('#templateToponimi').html();
    var url = "php/toponimi.php"
    $.ajax({
        async: true,
        url: url,
        dataType: 'json',
        success: function(response) {
       //     console.log(response)
            var compiledTmpl = _.template(tmplMarkup, {
                toponimi: response
            });
            $('#RicercaToponimo').html(compiledTmpl);
            $('#selectRicercaToponimo').on("change", function() {
                //console.log('ricerca toponimo');
                $('#RicercaTesto').val('');
                $('#selectRicercaAutore').val('');
                $('#selectRicercaClassificazione').val('');
                var toponimo = $(this).val();
                console.log(toponimo);
                ricercaToponimo(toponimo);
            });

        }

    });
   callback();
}

function createSelectNominativi(callback) {
   console.log('Nominativi')
    var tmplMarkup = $('#templateNominativi').html();
    var url = "php/nominativi.php"
    $.ajax({
        async: true,
        url: url,
        dataType: 'json',
        success: function(response) {
            //console.log(response)
            var compiledTmpl = _.template(tmplMarkup, {
                autore: response
            });
            $('#RicercaAutore').html(compiledTmpl);
            
            $('#selectRicercaAutore').on("change", function() {
                $('#RicercaTesto').val('');
                $('#selectRicercaToponimo').val('');
                $('#selectRicercaClassificazione').val('');

                console.log('ricerca autore');
                var autore = $(this).val();
                console.log(autore);
                ricercaAutore(autore);
            });
        }
        

    });
    callback();
}

function createSelectClassificazioni(callback) {
   console.log('Classificazioni')
    var tmplMarkup = $('#templateClassificazioni').html();
    var url = "php/classificazioni.php"
    $.ajax({
        async: true,
        url: url,
        dataType: 'json',
        success: function(response) {
         //   console.log(response)
            var compiledTmpl = _.template(tmplMarkup, {
                luogo: response
            });
            $('#RicercaClassificazione').html(compiledTmpl);
            
           // setTimeout(hideLoadingRicerche, 4000);
          //  $("#LoadingRicerche").hide();
            $('#selectRicercaClassificazione').on("change", function() {
               $('#RicercaTesto').val('');
                $('#selectRicercaToponimo').val('');
                $('#selectRicercaAutore').val('');
                console.log('ricerca class');
                var luogo = $(this).val();
                console.log(luogo);
                ricercaClassificazione(luogo);
            });
        }
        

    });
    callback();
}

function ricercaAutore(autore) {

    //cleanScreen();
    $("#LoadingLista").show();

    var url = "php/lista_ricerca_autore.php"
    $.ajax({
        async: true,
        url: url,
        data: {
            autore: autore
        },
        dataType: 'json',
        success: function(response) {
            getSegnatureDaRicerca(response)
        }
    });
}

function ricercaToponimo(toponimo) {

    //cleanScreen();
    $("#LoadingLista").show();

    var url = "php/ricerca_toponimo.php"
    $.ajax({
        async: true,
        url: url,
        data: {
            toponimo: toponimo
        },
        dataType: 'json',
        success: function(response) {
            getSegnatureDaRicerca(response)
        }
    });
}

function ricercaClassificazione(luogo) {

    //cleanScreen();
    $("#LoadingLista").show();
console.log(luogo)
    var url = "php/ricerca_luogo.php"
    $.ajax({
        async: true,
        url: url,
        data: {
            luogo: luogo
        },
        dataType: 'json',
        success: function(response) {
            getSegnatureDaRicerca(response)
        }
    });
}

function ricercaTesto(testo,testo2) {

    //cleanScreen();
  $("#LoadingLista").show();

    var url = "php/ricerca_testo.php"
    $.ajax({
        async: true,
        url: url,
        data: {
            testo: testo,
            testo2: testo2
        },
        dataType: 'json',
        success: function(response) {
            getSegnatureDaRicerca(response)
        }
    });
}


function getSegnatureDaRicerca(segnature) {
   console.log(segnature)
   if (segnature.length == 0) {
    $("#listaPrincipale").html('Nessun risultato trovato');
    $("#scheda").html('');
   $("#LoadingLista").hide();
   }
   else
   {
    $("#listaPrincipale").html('');
    CreateListaSegnature(segnature, 1);
    var cartella = (segnature[0].cartella);
    var foglio = (segnature[0].foglio);
    var sub = (segnature[0].sub);
    var segnatura = [cartella, foglio, sub];
    console.log(segnatura)
    getScheda(segnatura);
   }
}

function getScheda(segn) {
   
   // $("#LoadingScheda").show();
   
   console.log(typeof(segn));
   if (typeof(segn) === 'string') {
      var segnatura = segn.split("-");
  
   var cartella = segnatura[0];
   var scheda= segnatura[1].split("/");
    var foglio = scheda[0];
    var sub = scheda[1];
   
   }
   else{
   console.log(segn);
   var cartella = (segn[0]);
    var foglio = (segn[1]);
    var sub = (segn[2]);
      
   }
   
    var url = "php/scheda.php"
    $.ajax({
        async: true,
        url: url,
        dataType: 'json',
        data: {
            cartella: cartella,
            foglio: foglio,
            sub: sub
        },
        success: function(response) {
            printScheda(response);
        }
    });      
}

function printScheda(scheda) {

    //cleanScreen();
    var tmplMarkup = $('#templateScheda').html();
    data = scheda.data[0]
    _.extend(data, templateHelpers);
    
    _.each(scheda.fogli, function(foglio){
        console.log(foglio.cartella);
        foglio.cartella = addZeros(foglio.cartella)
        foglio.foglio = addZeros(foglio.foglio)
        console.log(foglio.cartella);
    
});
    console.log(scheda.fogli)
    var compiledTmpl = _.template(tmplMarkup, {
        data: data,
        fogli: scheda.fogli,
        images: scheda.fogli.images
    });
    
    $("#scheda").html(compiledTmpl);
}

function addZeros(str){
   if (str.length == 1) {
      str = '00' +str
   }
   if (str.length == 2) {
      str = '0' +str
   }
   return str;
   
}



$(function() {

    $.ajaxSetup({

        error: function(jqXHR, exception) {
            if (jqXHR.status === 0) {
               console.log(jqXHR);
                console.log('Not connect.\n Verify Network.' + jqXHR);
            } else if (jqXHR.status == 404) {
                console.log('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                console.log('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                console.log('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                console.log('Time out error.');
            } else if (exception === 'abort') {
                console.log('Ajax request aborted.');
            } else {
                console.log('Uncaught Error.\n' + jqXHR.responseText);
            }
        }
    });
});

function immv(file,dir)
{
	url_inizio="http://212.189.172.99:9001/StyleServer/calcrgn?browser=win_ie&cat=Imago&style=default/view.xsl&wid=400&hei=300&browser=win_ie&plugin=false&item=";
	url_fine="&wid=400&hei=300&style=default/view.xsl&plugin=false";
	url=url_inizio+dir+"\\"+file+url_fine;
	window.open(url,'disegniepiante', "height=400,width=600,status=yes,toolbar=no,menubar=no,location=no");
	
}

