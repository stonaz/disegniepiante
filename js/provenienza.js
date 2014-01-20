function getProvenienza(fondo,ufficio,serie)
{
      var url="php/provenienza_to_json.php";
      //cleanScreen();
      var args ={fondo:fondo,ufficio:ufficio,serie:serie};

      $.ajax({
        async: true, 
        url: url,
        dataType: 'json',
        data:args,
        success: function(response){
           // console.log(response);
            var provenienza=response[0];
            var tmplMarkup = $('#templateProvenienza').html();
            var output = _.template(tmplMarkup, { provenienza : provenienza } );
            $("#RisultatiProvenienza").append(output);
          }
        
    });
}