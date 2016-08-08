<?PHP
require 'functions.php'; // functions used in the script
//$dbconn = pg_connect ("host=192.168.1.14 port=5432 dbname=ruggeri user=postgres password=Superman123") or die ('no db');
header('Content-Type: application/json'); //for correct output in browsers
$toponimo = pg_escape_string($_GET['toponimo']);
$sql="SELECT scheda.\"#cartella\", scheda.\"#foglio\", scheda.\"#sub\", scheda.\"luogo\"  FROM \"Principale_CD\" as scheda INNER JOIN \"Toponimo_CD\" as toponimo
ON
(scheda.\"#cartella\" = toponimo.\"#cartella\") AND
(scheda.\"#foglio\" = toponimo.\"#foglio\") AND
(scheda.\"#sub\" = toponimo.\"#sub\")
and toponimo.\"mix2\" = '$toponimo';";

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
echo json_encode($segnatura_list);
//echo indent(json_encode($segnatura_list));

?>  