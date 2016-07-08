var disegniPiante = {};

var templateHelpers = {
  returnBool: function(val){
    if (val == 0) {
      return "no"
    }
    else{
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
    getScheda(segnatura);
}

function CreateListaSegnature(segnature,openlista) {
    var tmplMarkup = $('#templateSegnatura').html();
    //cleanScreen();
    //  $("#Loading").show();
     // console.log(segnature)
    var arrayLength = segnature.length;
    //  console.log(arrayLength)
    for (var i = 0; i < arrayLength; i++) {
        var segnatura = (segnature[i]);
        //console.log(segnatura)
        var compiledTmpl = _.template(tmplMarkup, {
            segnatura: segnatura
        });
        $("#listaPrincipale").append(compiledTmpl);

    }
    $("#LoadingLista").hide();
    $("li").on("click", function() {
        var segnatura = $(this).text().split("/");
        getScheda(segnatura);
    });
}

function createSelectToponimi() {
                var tmplMarkup = $('#templateToponimi').html();
                var url="php/toponimi.php"
                $.ajax({
                  async: true, 
                  url: url,
                  dataType: 'json',
                  //data:{fondo: fondo },
                  success: function(response){
                       console.log(response)
                        var compiledTmpl = _.template(tmplMarkup,{toponimi:response});
                        $('#RicercaToponimo').html(compiledTmpl);
                        $('#selectRicercaToponimo').on("change", function() {
                           console.log('ricerca toponimo');
        var toponimo = $(this).val();
        console.log(toponimo);
        ricercaToponimo(toponimo);
    });
                            
                        }
        
                });
                
}

function createSelectNominativi() {
                var tmplMarkup = $('#templateNominativi').html();
                var url="php/nominativi.php"
                $.ajax({
                  async: true, 
                  url: url,
                  dataType: 'json',
                  //data:{fondo: fondo },
                  success: function(response){
                       console.log(response)
                        var compiledTmpl = _.template(tmplMarkup,{autore:response});
                        $('#RicercaAutore').html(compiledTmpl);
                        $('#selectRicercaAutore').on("change", function() {
                           console.log('ricerca autore');
        var autore = $(this).val();
        console.log(autore);
        ricercaAutore(autore);
    });
                            $("#azzeraRicerche").on("click", function() {
                              console.log('azzera')
                              $("#listaPrincipale").html('');
        initialize();
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
        data:{autore:autore
         },
        dataType: 'json',
        success: function(response) {
         console.log(response)
         $("#listaPrincipale").html('');
            CreateListaSegnature(response,1);
            var cartella=(response[0].cartella);
            var foglio=(response[0].foglio);
            var sub=(response[0].sub);
           var segnatura = [cartella, foglio, sub];
           console.log(segnatura)
            getScheda(segnatura);
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
        data:{toponimo:toponimo
         },
        dataType: 'json',
        success: function(response) {
         console.log(response)
         $("#listaPrincipale").html('');
            CreateListaSegnature(response,1);
            var cartella=(response[0].cartella);
            var foglio=(response[0].foglio);
            var sub=(response[0].sub);
           var segnatura = [cartella, foglio, sub];
           console.log(segnatura)
            getScheda(segnatura);
        }
    });
}




function getScheda(segnatura) {
   // console.log(segnatura)
        //cleanScreen();
    $("#LoadingScheda").show();
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
      //      console.log(response)
            printScheda(response);
        }
    });
}

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