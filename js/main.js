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

    var url = "php/luoghi.php"
    $.ajax({
        async: true,
        url: url,
        dataType: 'json',
        success: function(response) {
            CreateListaMain(response)

        }
    });
    var segnatura = [1, 8, 1];
    createSelectNominativi();
    getScheda(segnatura);
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
         $("#listaPrincipale").html('');
            CreateListaMain(response,1);
            var cartella=(response[0].segnature[0].cartella);
            var foglio=(response[0].segnature[0].foglio);
            var sub=(response[0].segnature[0].sub);
           var segnatura = [cartella, foglio, sub];
            getScheda(segnatura);
        }
    });
    //var segnatura = [1, 8, 1];
    //createSelectNominativi();
    //getScheda(segnatura);
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
                        var compiledTmpl = _.template(tmplMarkup,{nominativi:response});
                        $('#Ricerca').append(compiledTmpl);
                        $('#selectRicercaAutore').on("change", function() {
                           console.log('ricerca autore');
        var autore = $(this).val();
        console.log(autore);
        ricercaAutore(autore);
    });
                        }
        
                });
}


function getScheda(segnatura) {
    console.log(segnatura)
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

function CreateListaMain(luoghi,openlista) {
    var tmplMarkup = $('#templateSegnatura').html();
    //cleanScreen();
    //  $("#Loading").show();
      console.log(luoghi)
    var arrayLength = luoghi.length;
    //  console.log(arrayLength)
    for (var i = 0; i < arrayLength; i++) {
        var luogo = (luoghi[i].luogo);
        var segnature = (luoghi[i].segnature);
        var compiledTmpl = _.template(tmplMarkup, {
            luogo: luogo,
            segnature: segnature
        });
        $("#listaPrincipale").append(compiledTmpl);

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
        var segnatura = $(this).text().split("/");
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
       // $("#accordion a.opening").toggleClass("active");
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

function printScheda(scheda) {
   
    //cleanScreen();
    var tmplMarkup = $('#templateScheda').html();
    data = scheda.data[0]
    _.extend(data, templateHelpers);
    console.log(data)
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