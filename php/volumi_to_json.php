<?PHP
require 'functions.php'; // functions used in the script
//$dbconn = pg_connect ("host=192.168.1.14 port=5432 dbname=ruggeri user=postgres password=Superman123") or die ('no db');
header('Content-Type: application/json'); //for correct output in browsers
$sql='SELECT *  FROM "inventario" WHERE fondo IS NOT NULL ';

if ($_GET['nome']){
    $nome= ($_GET['nome']);
    $cognome= ($_GET['cognome']);
    $sql .= " and nome = '$nome' and cognome = '$cognome' ";
    
}

if ($_GET['text']){
    $text= ($_GET['text']);
    $sql .= " and note ILIKE '%$text%'";    
}

if ($_GET['fondo']){
    $fondo= ($_GET['fondo']);
    $sql .= " and fondo = '$fondo'";    
}

if ($_GET['ufficio']){
    $ufficio= ($_GET['ufficio']);
    $sql .= " and ufficio = '$ufficio'";    
}

if ($_GET['dataIniziale']){
    $dataIniziale= ($_GET['dataIniziale']);
    $sql .= " and \"data iniziale presunta\" >= to_date('$dataIniziale', 'DD-MM-YYYY')";    
}

if ($_GET['dataFinale']){
    $dataFinale= ($_GET['dataFinale']);
    $sql .= " and \"data finale presunta\" <= to_date('$dataFinale', 'DD-MM-YYYY')";    
}



//echo $sql;
$items_list=get_items_list($dbconn,$sql);
//foreach ($items_list as $)
//$items_list["data finale presunta"]="test";
//print_r($items_list);
echo json_encode($items_list);
//echo indent(json_encode($items_list));





?>  