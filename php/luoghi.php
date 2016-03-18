<?PHP
require 'functions.php'; // functions used in the script
//$dbconn = pg_connect ("host=192.168.1.14 port=5432 dbname=ruggeri user=postgres password=Superman123") or die ('no db');
header('Content-Type: application/json'); //for correct output in browsers
$sql='SELECT distinct luogo  FROM "Principale_CD" order by 1';

//echo $sql;
$items_list=get_items_list($dbconn,$sql);
$lista_luoghi=array();
foreach ($items_list as $luoghi)
{
   
   //echo indent(json_encode($luoghi));
   
   $luogo=$luoghi['luogo'];
   //echo "$luogo\n";
   $arr=array();
   $arr['luogo'] = $luogo;
   $arr['segnature']=array();
 $sql="SELECT *  FROM \"Principale_CD\" where luogo = '$luogo' " ;
 //echo $sql;
 $segnatura_list=get_items_list($dbconn,$sql);
 //echo $segnatura;
 
 foreach ($segnatura_list as $segnatura)
{
   $segnature=array();
   $segnature["cartella"]=$segnatura["#cartella"];
   $segnature["foglio"]=$segnatura["#foglio"];
   $segnature["sub"]=$segnatura["#sub"];

  array_push( $arr['segnature'],$segnature);

 }
   array_push( $lista_luoghi,$arr);
}
//echo json_encode($lista_luoghi);
echo indent(json_encode($lista_luoghi));

?>  