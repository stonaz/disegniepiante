var notarilia = {};

function cleanScreen(){
   $("#Intestazione").html('');
   $("#Risultati").html('');
   $("#IntestazioneCollegati").html('');
   $("#RisultatiCollegati").html('');
   $("#Counter").html('');
   $("#Nav").html('');
   $("#Error").hide();
   
}

function cancellaSelezioni()
{
   $("#dataIniziale").val('');
   $("#dataFinale").val('');
   $("#searchText").val('');
   $("#textVolumi").val('');
   $("#elencoFondi").val('');
   $("#elencoUffici").html('');
   
}

function confronta_data(data1, data2){
	//trasformo le date nel formato aaaammgg (es. 20081103)
        data1str = data1.substr(6)+data1.substr(3, 2)+data1.substr(0, 2);
        data2str = data2.substr(6)+data2.substr(3, 2)+data2.substr(0, 2);
        if (data2str-data1str<0) {
         cleanScreen();
         $("#Error").show();
            $("#Error").html('La data iniziale deve essere precedente quella finale');
            //console.log("La data iniziale deve essere precedente quella finale");
            return false
        }else{
		     
            return true
        }
    
}

function createSelectFondi() {
                var tmplMarkup = $('#templateSelectFondi').html();
                var url="php/fondi_to_json.php"
                $.ajax({
                  async: true, 
                  url: url,
                  dataType: 'json',
                  //data:{alias: searchText },
                  success: function(response){
                        
                           var compiledTmpl = _.template(tmplMarkup,{fondi:response});
                           $('#elencoFondi').append(compiledTmpl);                                 
                        }        
                });
                $('#elencoFondi').on('change',function(){
                  //console.log( $(this).val());
                  if ($(this).val() != "") {
                    // console.log('change uffici');
                     createSelectUffici($(this).val());
                  }
                  else
                  {
                   //  console.log('azzera uffici')
                     $('#elencoUffici').html('');
                  }
                  
                });
}

function createSelectUffici(fondo) {
                var tmplMarkup = $('#templateSelectUfficio').html();
                var url="php/uffici_to_json.php"
                $.ajax({
                  async: true, 
                  url: url,
                  dataType: 'json',
                  data:{fondo: fondo },
                  success: function(response){
                     //   console.log(response)
                        $('#elencoUffici').html('');
                           var compiledTmpl = _.template(tmplMarkup,{uffici:response});
                           
                           $('#elencoUffici').append(compiledTmpl);
                           
                           
      
                        }
        
                });
}

function getNotai()
{
   var searchText=$("#searchText").val();
   //console.log(searchText);
   cleanScreen();
   $("#Loading").show();
   
      var url="php/table_to_json.php"
      $.ajax({
        async: true, 
        url: url,
        dataType: 'json',
        data:{alias: searchText },
        success: function(response){
       
           printNotai(response,0);
       
      
          }
        
    });
}

function getVolumi(args)
{
      var url="php/volumi_to_json.php";
      cleanScreen();
      $("#Loading").show();
      $.ajax({
        async: true, 
        url: url,
        dataType: 'json',
        data:args,
        success: function(response){
         printVolumi(response,0,args);
       
      
          }
        
    });
}

function getVolumiCollegati(args)
{
      var url="php/volumi_to_json.php";
      //cleanScreen();
      $("#Loading").show();
      $.ajax({
        async: true, 
        url: url,
        dataType: 'json',
        data:args,
        success: function(response){
         printVolumiCollegati(response,0,args);      
          }
        
    });
}

function openProvenienza(fondo,ufficio)
{
      var url="php/provenienza_to_json.php";
      //cleanScreen();
      var args ={fondo:fondo,ufficio:ufficio};
      //console.log(fondo);
      window.provenienza=args;
      window.open("provenienza.html", "provenienza", "location=0,scrollbars=0,resizable=0,height=450,width=600");
}


function getFrancois(args)
{
   
      var url="php/francois_to_json.php";
      $.ajax({
        async: true, 
        url: url,
        dataType: 'json',
        data:args,
        success: function(response){
         printFrancois(response,0);          
          }
        
    });
}

function printNotai(data,offset)
{
cleanScreen();
var count;

(data.length === undefined) ? count=0 : count =data.length;
var tmplMarkup = $('#templateCounter').html();
var compiledTmpl = _.template(tmplMarkup, { titolo: "Notai",count : count, item : "Occorrenze" });
$("#Intestazione").append(compiledTmpl);
if (count > 0) {

var notaio = data[offset];   

var tmplMarkup = $('#templateNotaio').html();
var output = _.template(tmplMarkup, { notaio : notaio } );
$("#Risultati").append(output);

var tmplMarkup = $('#templateNav').html();
var output = _.template(tmplMarkup, { offset:offset,count : count, } );
$("#Nav").append(output);

if (offset > 0) {
   $("#Prev").on( "click", function(){
   printNotai(data,offset-1);   
   });
   $("#Prev").addClass("enabled")
}

if (offset+1 < count) {
   $("#Succ").on( "click", function(){
   printNotai(data,offset+1);
   });
   $("#Succ").addClass("enabled")
}
var args = {};
   args.nome=notaio.nome
   args.cognome=notaio.cognome
   getVolumiCollegati(args)

}
$("#Loading").hide()
}



function printVolumi(data,offset,args)
{
cleanScreen();
$("#RisultatiCollegati").hide();
var count;

(data.length === undefined) ? count=0 : count =data.length;
var tmplMarkup = $('#templateCounter').html();
var compiledTmpl = _.template(tmplMarkup, {titolo: "Volumi", count : count, item : "Occorrenze"});
$("#Intestazione").append(compiledTmpl);

if (count > 0) {
   $("#Risultati").css("width","100%")
   volume = data[offset];   
   
   var tmplMarkup = $('#templateVolume').html();
   buttonID="Vol-"+volume.volume+"-"+offset
   var output = _.template(tmplMarkup, { volume : volume ,buttonID: buttonID } );
   $("#Risultati").append(output);
   $("#"+buttonID).on("click",function(){
      openProvenienza(volume.fondo,volume.ufficio)
      
      }); 
   var tmplMarkup = $('#templateNav').html();
   var output = _.template(tmplMarkup, { offset:offset,count : count, } );
   $("#Nav").append(output);
   
   if (offset > 0) {
      $("#Prev").on( "click", function(){
      printVolumi(data,offset-1);
      
      });
      $("#Prev").addClass("enabled")
   }
   
   if (offset+1 < count) {
      $("#Succ").on( "click", function(){
      printVolumi(data,offset+1);
      });
      $("#Succ").addClass("enabled")
   }

}
else
{
   //Abilita la ricerca nel francois solo se si viene dalla ricerca notaio
   if (typeof args.cognome !== 'undefined') {
      var tmplMarkup = $('#templateFrancoisCollButton').html();
      var output = _.template(tmplMarkup );
      $("#Intestazione").append(output);
   
      $("#FrancoisCollButton").on( "click", function(){
      getFrancois(args)
      
      }); 
   }
   
}
$("#Loading").hide()
}

function printVolumiCollegati(data,offset,args)
{
$("#IntestazioneCollegati").html('');
$("#RisultatiCollegati").html('');
var count;

(data.length === undefined) ? count=0 : count =data.length;
var tmplMarkup = $('#templateCollegatiCounter').html();
var compiledTmpl = _.template(tmplMarkup, {count : count, item : "Volumi" });
$("#IntestazioneCollegati").append(compiledTmpl);

if (count > 0) {
   
   $("#RisultatiCollegati").show();
   var tmplMarkup = $('#templateVolume').html();   
   _.each(data, function(v,i){
      
      buttonID="Vol-"+v.volume+"-"+i
      var output = _.template(tmplMarkup, { volume : v ,buttonID: buttonID} );
      $("#RisultatiCollegati").append(output);
      //var button=i
    $("#"+buttonID).on("click",function(){
      openProvenienza(v.fondo,v.ufficio)
      
      }); 

   })
   
}
else
{
   $("#RisultatiCollegati").hide();
   if (typeof args.cognome !== 'undefined') {
      var tmplMarkup = $('#templateFrancoisCollButton').html();
      var output = _.template(tmplMarkup );
      $("#IntestazioneCollegati").append(output);
   
      $("#FrancoisCollButton").on( "click", function(){
      getFrancois(args)
      
      }); 
   }
   
}
$("#Loading").hide()
}

function printFrancois(data,offset,args)
{
$("#RisultatiCollegati").html('');
var count;

(data.length === undefined) ? count=0 : count =data.length;
console.log(count)
if (count > 0) {
$("#RisultatiCollegati").show();
francois = data[offset];

var tmplMarkup = $('#templateFrancois').html();
_.each(data, function(f){
var output = _.template(tmplMarkup, { francois : f } );
$("#RisultatiCollegati").append(output);

})
}
else
{
   $("#RisultatiCollegati").show();
   $("#RisultatiCollegati").html('Nessun risultato trovato');
}
$("#Loading").hide()
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