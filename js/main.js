var notarilia = {};

function cleanScreen(){
   $("#Intestazione").html('');
   $("#Risultati").html('');
   $("#Counter").html('');
   $("#Nav").html('');
   
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
       console.log('ok');
         printVolumi(response,0,args);
       
      
          }
        
    });
}

function getFrancois(args)
{
   console.log(searchText);
   cleanScreen();
   $("#Loading").show();
   
      var url="php/francois_to_json.php";
      $.ajax({
        async: true, 
        url: url,
        dataType: 'json',
        data:args,
        success: function(response){
       console.log('ok');
         printFrancois(response,0);
       
      
          }
        
    });
}

function printNotai(data,offset)
{
cleanScreen();
var count;

(data.length === undefined) ? count=0 : count =data.length;
//(typeof data.lenght undefined)? var count =data.length :var count =0
console.log(count);
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

var tmplMarkup = $('#templateVolumiCollButton').html();
var output = _.template(tmplMarkup, { nome:notaio.nome,cognome:notaio.cognome } );
$("#Nav").append(output);

$("#VolumiCollButton").bind( "click", function(){
   var args={};
   args.nome=notaio.nome
   args.cognome=notaio.cognome
   getVolumi(args)
   
   });

if (offset > 0) {
   $("#Prev").bind( "click", function(){
   printNotai(data,offset-1);
   
   });
   $("#Prev").addClass("enabled")
}

if (offset+1 < count) {
   $("#Succ").bind( "click", function(){
   printNotai(data,offset+1);
   });
   $("#Succ").addClass("enabled")
}

console.log(offset)

}
$("#Loading").hide()
}


function printVolumi(data,offset,args)
{
cleanScreen();
var count;

(data.length === undefined) ? count=0 : count =data.length;
//(typeof data.lenght undefined)? var count =data.length :var count =0
console.log(count);
var tmplMarkup = $('#templateCounter').html();
var compiledTmpl = _.template(tmplMarkup, {titolo: "Volumi", count : count, item : "Occorrenze" });
$("#Intestazione").append(compiledTmpl);

if (count > 0) {
   $("#Risultati").css("width","90%")
   volume = data[offset];   
   
   var tmplMarkup = $('#templateVolume').html();
   var output = _.template(tmplMarkup, { volume : volume } );
   $("#Risultati").append(output);
   
   var tmplMarkup = $('#templateNav').html();
   var output = _.template(tmplMarkup, { offset:offset,count : count, } );
   $("#Nav").append(output);
   
   if (offset > 0) {
      $("#Prev").bind( "click", function(){
      printVolumi(data,offset-1);
      
      });
      $("#Prev").addClass("enabled")
   }
   
   if (offset+1 < count) {
      $("#Succ").bind( "click", function(){
      printVolumi(data,offset+1);
      });
      $("#Succ").addClass("enabled")
   }
   
   console.log(offset)

}
else
{
   //Abilita la ricerca nel francois solo se si viene dalla ricerca notaio
   if (typeof args.cognome !== 'undefined') {
      var tmplMarkup = $('#templateFrancoisCollButton').html();
      var output = _.template(tmplMarkup );
      $("#Intestazione").append(output);
   
      $("#FrancoisCollButton").bind( "click", function(){
      //alert('francois')
      getFrancois(args)
      
      }); 
   }
   
}
$("#Loading").hide()
}

function printFrancois(data,offset,args)
{
cleanScreen();
var count;

(data.length === undefined) ? count=0 : count =data.length;
//(typeof data.lenght undefined)? var count =data.length :var count =0
console.log(count);
var tmplMarkup = $('#templateCounter').html();
var compiledTmpl = _.template(tmplMarkup, {titolo: "Francois", count : count, item : "Occorrenze" });
$("#Intestazione").append(compiledTmpl);

if (count > 0) {

francois = data[offset];


var tmplMarkup = $('#templateFrancois').html();
var output = _.template(tmplMarkup, { francois : francois } );
$("#Risultati").append(output);

var tmplMarkup = $('#templateNav').html();
var output = _.template(tmplMarkup, { offset:offset,count : count, } );
$("#Nav").append(output);

if (offset > 0) {
   $("#Prev").bind( "click", function(){
   printFrancois(data,offset-1);
   
   });
   $("#Prev").addClass("enabled")
}

if (offset+1 < count) {
   $("#Succ").bind( "click", function(){
   printFrancois(data,offset+1);
   });
   $("#Succ").addClass("enabled")
}

console.log(francois["data fine"])

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