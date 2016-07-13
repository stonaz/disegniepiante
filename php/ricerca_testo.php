<?PHP
require 'functions.php'; // functions used in the script
//$dbconn = pg_connect ("host=192.168.1.14 port=5432 dbname=ruggeri user=postgres password=Superman123") or die ('no db');
header('Content-Type: application/json'); //for correct output in browsers
$testo = pg_escape_string($_GET['testo']);
$testo2= pg_escape_string($_GET['testo2']);

if ($testo and $testo2)
{
 $sql="SELECT DISTINCT
  principale.\"#cartella\", 
  principale.\"#foglio\", 
  principale.\"#sub\"
FROM 
  \"Fogli_CD\" as fogli,
  \"Principale_CD\" as principale
WHERE 
  fogli.\"#cartella\" = principale.\"#cartella\" AND
  fogli.\"#foglio\" = principale.\"#foglio\" AND
  fogli.\"#sub\" = principale.\"#sub\" AND
 (
  (lower(fogli.intestazione) ILIKE '%$testo%' OR fogli.intestazione ILIKE '%$testo2%' ) OR 
  (fogli.descrizione ILIKE '%$testo%' OR fogli.descrizione ILIKE '%$testo2%' ) OR
  (principale.\"descrizione intrinseca\" ILIKE '%$testo%' OR principale.\"descrizione intrinseca\" ILIKE '%$testo2%')
  )
  ORDER BY 1,2,3;";  
}


else
{
 $sql="SELECT DISTINCT
  principale.\"#cartella\", 
  principale.\"#foglio\", 
  principale.\"#sub\"
FROM 
  \"Fogli_CD\" as fogli,
  \"Principale_CD\" as principale
WHERE 
  fogli.\"#cartella\" = principale.\"#cartella\" AND
  fogli.\"#foglio\" = principale.\"#foglio\" AND
  fogli.\"#sub\" = principale.\"#sub\" AND
 ( fogli.intestazione ILIKE '%$testo%' OR 
  fogli.descrizione ILIKE '%$testo%' OR principale.\"descrizione intrinseca\" ILIKE '%$testo%' )
  ORDER BY 1,2,3;";  
}





//echo $sql;
//$items_list=get_items_list($dbconn,$sql);
 $items_list=get_items_list($dbconn,$sql);
  $segnatura_list=array();
 foreach ($items_list as $segnatura)
{
   $segnature=array();
   $segnature["cartella"]=$segnatura["#cartella"];
   $segnature["foglio"]=$segnatura["#foglio"];
   $segnature["sub"]=$segnatura["#sub"];

  array_push( $segnatura_list,$segnature);

 }
//echo json_encode($luoghi);
echo indent(json_encode($segnatura_list));

?>  