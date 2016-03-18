<?PHP
require 'functions.php'; // functions used in the script
//$dbconn = pg_connect ("host=192.168.1.14 port=5432 dbname=ruggeri user=postgres password=Superman123") or die ('no db');
header('Content-Type: application/json'); //for correct output in browsers
$autore = pg_escape_string($_GET['autore']);
$sql="SELECT scheda.\"#cartella\", scheda.\"#foglio\", scheda.\"#sub\", scheda.\"luogo\"  FROM \"Principale_CD\" as scheda INNER JOIN \"Autore_CD\" as autore
ON
(scheda.\"#cartella\" = autore.\"#cartella\") AND
(scheda.\"#foglio\" = autore.\"#foglio\") AND
(scheda.\"#sub\" = autore.\"#sub\")
and autore.\"Nominativo\" = '$autore';";

//echo $sql;
$items_list=get_items_list($dbconn,$sql);
$lista_luoghi=array();
$luoghi=array();
foreach ($items_list as $items)
{
   
  // echo indent(json_encode($items));
   
   $luogo=$items['luogo'];
  // echo "$luogo\n";
   array_push( $luoghi,$luogo);

}
$luoghi=array_unique($luoghi);
$arr=array();
$i=0;
foreach($luoghi as $luogo) 
{
   $array_temp['luogo']=$luogo;
   $array_temp['segnature']=array();
   array_push( $arr,$array_temp);
   
  // print_r($arr);
   foreach($items_list as $items) {
      
      //echo  "ITEM:".$items['luogo']."\n";
      //echo  "LUOGO:".$arr[$i]['luogo']."\n";
      if ($items['luogo']==$arr[$i]['luogo']){
      //   echo "Match Found"."\n";
       // echo $items["#cartella"];
         $segnature=array();
         $segnature["cartella"]=$items["#cartella"];
         $segnature["foglio"]=$items["#foglio"];
         $segnature["sub"]=$items["#sub"];
         array_push( $arr[$i]['segnature'],$segnature);
         //$lista_luoghi['luogo']= $luogo;
         //$lista_luoghi['segnature']= $segnature;
         
     // echo $luogo."\n";
     
      }
      
   }
  $i++;
  // array_push( $arr,$lista_luoghi);
}
//echo json_encode($luoghi);
echo indent(json_encode($arr));

?>  