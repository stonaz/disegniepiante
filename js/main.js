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
          // printNotai(response,0);    
      
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
 // initFlip();
   
//      $.ajax({
//        async: true, 
//        url: url,
//        dataType: 'json',
//        success: function(response){
//       //  console.log(luoghi)
//       console.log(response)
//      var arrayLength = luoghi.length;
//      for (var i = 0; i < arrayLength; i++) {
//    var luogo=luoghi[i];
//   // console.log(luogo)
//  //  console.log(response[luogo]);
//  //  var compiledTmpl = _.template(tmplMarkup,{fondi:response});
//                          // $('#elencoFondi').append(compiledTmpl);
//    //Do something
//}
//       $("#listaPrincipale").append('pipo0');
//          // printNotai(response,0);    
//      
//          }
//        
//    });
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