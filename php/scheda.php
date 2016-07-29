<?PHP
require 'functions.php'; // functions used in the script
//$dbconn = pg_connect ("host=192.168.1.14 port=5432 dbname=ruggeri user=postgres password=Superman123") or die ('no db');

header('Content-Type: application/json'); //for correct output in browsers
if ($_GET['cartella'])
{
  // echo "GET ARRIVATA";
    $cartella= ($_GET['cartella']);
    $foglio= ($_GET['foglio']);
    $sub= ($_GET['sub']);
    
}
else{
   $cartella=81;
   $foglio=271;
   $sub=1;
}

$sql="SELECT *  FROM \"Principale_CD\" where \"#cartella\"='$cartella' and \"#sub\"='$sub' and \"#foglio\"='$foglio' ";
//echo $sql;
$items_list=get_items_list($dbconn,$sql);
$scheda=array();
$scheda['data']=$items_list;
$scheda['data'][0]['cartella']=$scheda['data'][0]['#cartella'];
$scheda['data'][0]['foglio']=$scheda['data'][0]['#foglio'];
$scheda['data'][0]['sub']=$scheda['data'][0]['#sub'];

//echo indent(json_encode($scheda['data'][0]['#cartella']));
$sql="SELECT *  FROM \"Fogli_CD\" where \"#cartella\"='$cartella' and \"#sub\"='$sub' and \"#foglio\"='$foglio' ";
$items_list=get_items_list($dbconn,$sql);
if ($items_list){
 //  echo indent(json_encode($items_list));
   $scheda['fogli']=$items_list;
   //, numero($scheda['fogli']);
  $index=0;
   foreach  ($scheda['fogli'] as $foglioscheda)
   {
      $scheda['fogli'][$index]['cartella']=$foglioscheda['#cartella'];
      $scheda['fogli'][$index]['foglio']=$foglioscheda['#foglio'];
      $scheda['fogli'][$index]['sub']=$foglioscheda['#sub'];      
      
      $numero = $foglioscheda['numero'];
      $sql="SELECT \"#image\"  FROM \"images\" where \"#cartella\"='$cartella' and \"#sub\"='$sub' and \"#foglio\"='$foglio' and \"numero\"='$numero'";
      $items_list=get_items_list($dbconn,$sql);
      if ($items_list){
         
         $scheda['fogli'][$index]['images']=array();
         foreach($items_list as $images)
         {
            $image= $images['#image'];
            if ( strlen($image) > 1){
               array_push($scheda['fogli'][$index]['images'],$image);

            }
            
         }
         
         
      }
   $index++;
    }
   
}
else{
   $scheda['fogli']=[];
}

//echo json_encode($scheda);
echo indent(json_encode($scheda))

?>


