<?PHP
require 'functions.php'; // functions used in the script
//$dbconn = pg_connect ("host=192.168.1.14 port=5432 dbname=ruggeri user=postgres password=Superman123") or die ('no db');
header('Content-Type: application/json'); //for correct output in browsers


   

$segnature_list=array();
$sql="SELECT distinct \"#cartella\"  FROM \"Principale_CD\"  order by 1 " ;
 //echo $sql;
 $segnatura_list=get_items_list($dbconn,$sql);
 //echo $segnatura;
 
 foreach ($segnatura_list as $segnatura)
{
   $segnature=array();
   $cartella=$segnatura["#cartella"];
   $segnature["cartella"]=$segnatura["#cartella"];
   $segnature["schede"]=array();

   $sql="SELECT  \"#foglio\",\"#sub\"  FROM \"Principale_CD\"  where \"#cartella\" = $cartella order by 1,2" ;
  // echo $sql;
   $segnatura_items=get_items_list($dbconn,$sql);
   foreach ($segnatura_items as $scheda_item)
   {
     
      $scheda=array();
      $scheda['foglio']=$scheda_item['#foglio'];
      $scheda['sub']=$scheda_item['#sub'];;
      array_push( $segnature["schede"],$scheda);
     // echo $scheda['#sub'];
   }
   
  // $segnature["foglio"]=$segnatura["#foglio"];
  // $segnature["sub"]=$segnatura["#sub"];
  //
  array_push( $segnature_list,$segnature);

 }
   

//echo json_encode($lista_luoghi);
echo indent(json_encode($segnature_list));

?>  