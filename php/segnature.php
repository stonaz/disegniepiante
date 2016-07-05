<?PHP
require 'functions.php'; // functions used in the script
//$dbconn = pg_connect ("host=192.168.1.14 port=5432 dbname=ruggeri user=postgres password=Superman123") or die ('no db');
header('Content-Type: application/json'); //for correct output in browsers


   

$segnature_list=array();
$sql="SELECT *  FROM \"Principale_CD\"  " ;
 //echo $sql;
 $segnatura_list=get_items_list($dbconn,$sql);
 //echo $segnatura;
 
 foreach ($segnatura_list as $segnatura)
{
   $segnature=array();
   $segnature["cartella"]=$segnatura["#cartella"];
   $segnature["foglio"]=$segnatura["#foglio"];
   $segnature["sub"]=$segnatura["#sub"];

  array_push( $segnature_list,$segnature);

 }
   

//echo json_encode($lista_luoghi);
echo indent(json_encode($segnature_list));

?>  