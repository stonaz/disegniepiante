<?PHP
require 'functions.php'; // functions used in the script
//$dbconn = pg_connect ("host=192.168.1.14 port=5432 dbname=ruggeri user=postgres password=Superman123") or die ('no db');
header('Content-Type: application/json'); //for correct output in browsers
$sql='SELECT *  FROM "inventario" ';
//$sql='SELECT * from inventario';
if ($_GET['nome']){
    $nome= ($_GET['nome']);
    $cognome= ($_GET['cognome']);
    $sql .= " where nome = '$nome' and cognome = '$cognome' ";
    
}

if ($_GET['text']){
    $text= ($_GET['text']);
    $sql .= " where nome ILIKE '%$text%' or cognome ILIKE '%$text%' or note ILIKE '%$text%'";
    
}
//echo $sql;
$items_list=get_items_list($dbconn,$sql);
echo json_encode($items_list);
//echo indent(json_encode($items_list));





?>  