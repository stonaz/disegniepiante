var disegniPiante = {};

function getListaMain() {

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
    getScheda(segnatura);
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
            console.log(response)
            printScheda(response);
        }
    });
}

function CreateListaMain(luoghi) {
    var tmplMarkup = $('#templateSegnatura').html();
    //cleanScreen();
    //  $("#Loading").show();
    //   console.log(luoghi)
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
}

function printScheda(scheda) {

    //cleanScreen();
    var tmplMarkup = $('#templateScheda').html();
    data = scheda.data[0]
    data.cartella = data.cartella
        //console.log(scheda.fogli[0].descrizione)
    var compiledTmpl = _.template(tmplMarkup, {
        data: data,
        fogli: scheda.fogli
    });
    $("#LoadingScheda").hide();
    $("#primaryContent").html(compiledTmpl);

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