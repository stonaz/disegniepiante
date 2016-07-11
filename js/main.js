var disegniPiante = {};

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

    var url = "php/segnature.php"
    $.ajax({
        async: true,
        url: url,
        dataType: 'json',
        success: function(response) {
            CreateListaSegnature(response)

        }
    });
    var segnatura = [1, 1, 1];
    createSelectNominativi();
    createSelectToponimi();
    createSelectToponimi();
    createSelectClassificazioni();
    getScheda(segnatura);
    $("#ButtonRicercaTesto").on("click", function() {
                $('#selectRicercaToponimo').val('');
                $('#selectRicercaClassificazione').val('');
                $('#selectRicercaAutore').val('');
      var testo = $('#RicercaTesto').val();
      console.log(testo)
      ricercaTesto(testo);
    });
    $("#azzeraRicerche").on("click", function() {
                              console.log('azzera')
                              $("#listaPrincipale").html('');
                                              $('#selectRicercaToponimo').val('');
                $('#selectRicercaClassificazione').val('');
                $('#selectRicercaAutore').val('');
                $('#RicercaTesto').val();
                              initialize();
    });

}

function CreateListaSegnature(segnature, openlista) {
    var tmplMarkup = $('#templateSegnatura').html();
        var compiledTmpl = _.template(tmplMarkup, {
            segnature: segnature
        });
        $("#listaPrincipale").append(compiledTmpl);
    $("#LoadingLista").hide();
    $("li").on("click", function() {
        var segnatura = $(this).text().split("/");
        getScheda(segnatura);
    });
}

function createSelectToponimi() {
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

}

function createSelectNominativi() {
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
    
}

function createSelectClassificazioni() {
    var tmplMarkup = $('#templateClassificazioni').html();
    var url = "php/classificazioni.php"
    $.ajax({
        async: true,
        url: url,
        dataType: 'json',
        success: function(response) {
            console.log(response)
            var compiledTmpl = _.template(tmplMarkup, {
                luogo: response
            });
            $('#RicercaClassificazione').html(compiledTmpl);
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

function ricercaTesto(testo) {

    //cleanScreen();
  $("#LoadingLista").show();

    var url = "php/ricerca_testo.php"
    $.ajax({
        async: true,
        url: url,
        data: {
            testo: testo
        },
        dataType: 'json',
        success: function(response) {
            getSegnatureDaRicerca(response)
        }
    });
}


function getSegnatureDaRicerca(segnature) {
   console.log(segnature)
 //  $("#LoadingScheda").show();
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

function getScheda(segnatura) {
   
   
   var cartella = segnatura[0];
    var foglio = segnatura[1];
    var sub = segnatura[2];
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
    // console.log(data)
    var compiledTmpl = _.template(tmplMarkup, {
        data: data,
        fogli: scheda.fogli
    });
    $("#LoadingScheda").hide();
    $("#scheda").html(compiledTmpl);

}



$(function() {

    $.ajaxSetup({

        error: function(jqXHR, exception) {
            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else if (exception === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }
        }
    });
});


//function CreateListaMain(luoghi,openlista) {
//    var tmplMarkup = $('#templateSegnatura').html();
//    //cleanScreen();
//    //  $("#Loading").show();
//      console.log(luoghi)
//    var arrayLength = luoghi.length;
//    //  console.log(arrayLength)
//    for (var i = 0; i < arrayLength; i++) {
//        var luogo = (luoghi[i].luogo);
//        var segnature = (luoghi[i].segnature);
//        var compiledTmpl = _.template(tmplMarkup, {
//            luogo: luogo,
//            segnature: segnature
//        });
//        $("#listaPrincipale").append(compiledTmpl);
//
//    }
//    $("#accordion .expanded").hide();
//    $("a.opening").click(function() {
//        $(this).next().slideToggle('fast', function() {
//            $(this).prev("a.opening").toggleClass("active");
//        });
//        return false;
//    });
//    $("#LoadingLista").hide();
//    $("li").on("click", function() {
//        var segnatura = $(this).text().split("/");
//        getScheda(segnatura);
//    });
//    $("#Nascondi").on("click", function() {
//        $("#accordion .expanded").hide();
//        var sections = $('#accordion').find("a");
//         sections.each(function(index, section){
//    if ($(section).hasClass('active') ) {
//      console.log('active');
//      $(section).toggleClass("active");
//    }
//  });
//       // $("#accordion a.opening").toggleClass("active");
//    });
//    $("#Mostra").on("click", function() {
//        $("#accordion .expanded").show();
//        var sections = $('#accordion').find("a");
//         sections.each(function(index, section){
//    if (!$(section).hasClass('active') ) {
//      console.log('active');
//      $(section).toggleClass("active");
//    }
//  });
//
//        
//    });
//    if (openlista===1) {
//      $("#Mostra").click();
//    }
//    
//}