<?PHP
require 'functions.php'; // functions used in the script
//$dbconn = pg_connect ("host=192.168.1.14 port=5432 dbname=ruggeri user=postgres password=Superman123") or die ('no db');
header('Content-Type: application/json'); //for correct output in browsers
$testo = pg_escape_string($_GET['testo']);
$sql="SELECT scheda.\"#cartella\", scheda.\"#foglio\", scheda.\"#sub\", scheda.\"luogo\"  FROM \"Principale_CD\" as scheda INNER JOIN \"Toponimo_CD\" as testo
ON
(scheda.\"#cartella\" = testo.\"#cartella\") AND
(scheda.\"#foglio\" = testo.\"#foglio\") AND
(scheda.\"#sub\" = testo.\"#sub\")
and testo.\"mix2\" = '$testo';";

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
 ( fogli.intestazione LIKE '%molin%' OR 
  fogli.descrizione LIKE '%molin%' OR principale.\"descrizione intrinseca\" LIKE '%molin%' );";

echo $sql;
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