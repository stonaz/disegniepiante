var disegniPiante = {};

function getListaMain()
{

   //cleanScreen();
   $("#Loading").show();
   
      var url="php/luoghi.php"
      $.ajax({
        async: true, 
        url: url,
        dataType: 'json',
        success: function(response){
       CreateListaMain(response)
      
          }
    });
   getScheda();
}

function getScheda()
{

   //cleanScreen();
   $("#Loading").show();
   
      var url="php/scheda.php"
      $.ajax({
        async: true, 
        url: url,
        dataType: 'json',
        success: function(response){
       console.log(response)
       printScheda(response);          
          }       
    });
}

function CreateListaMain(luoghi)
{
   var tmplMarkup = $('#templateSegnatura').html();
   //cleanScreen();
 //  $("#Loading").show();
   console.log(luoghi)
   var arrayLength = luoghi.length;
   console.log(arrayLength)
   for (var i = 0; i < arrayLength; i++) {
      var luogo=(luoghi[i].luogo);
      var segnature=(luoghi[i].segnature);
     var compiledTmpl = _.template(tmplMarkup,{luogo:luogo,segnature:segnature});
     $("#listaPrincipale").append(compiledTmpl);

   }
   $("#accordion .expanded").hide();
    $("a.opening").click(function(){
        $(this).next().slideToggle('fast', function(){
            $(this).prev("a.opening").toggleClass("active");
        });
    return false;
});
    $("#Loading").hide();
}

function printScheda(scheda)
{

   //cleanScreen();
   var tmplMarkup = $('#templateScheda').html();
   data=scheda.data[0]
   data.cartella=data.cartella
   console.log(scheda.fogli[0].descrizione)
   var compiledTmpl = _.template(tmplMarkup,{data:data,fogli:scheda.fogli});
   $("#Loading").hide();
   $("#primaryContent").append(compiledTmpl);
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