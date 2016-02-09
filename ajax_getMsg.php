<?php

$conn = mysqli_connect("localhost", "root", "secret", "sms");

Header("Content-Type: application/json; charset=utf-8"); 


//var_dump($_GET);
//var_dump($_POST);
//$datet = $_POST['dateto'];
$filter = $_POST['filter'];

//print_r($_POST);

$dateto = $filter['dateto'];
$datefrom = $filter['datefrom'];
$number = $filter['number'];
$waiting = $filter['waiting'];
$successfull = $filter['successfull'];
$error = $filter['error'];



//print_r($dateto);

$query_str = "SELECT * FROM sms_tasks WHERE date_add <= '$dateto' and date_add >= '$datefrom' and number LIKE '%$number%' and (state='$waiting' OR state='$successfull' or state='$error')";

//print_r($query_str);
//exit();
//echo "\n";
//print_r($query_str);
//echo "\n";
$result = mysqli_query($conn,$query_str);


if (!$result) {
    $obj = Array(
        'state' => 'error',
        'data' => null
    );
    print json_encode($obj);
    mysqli_close($conn);
    exit(); 
}



$messages = array();
while ($row = mysqli_fetch_assoc($result)) {
    $messages[] = $row;
}

$messages = array_reverse($messages);

$obj = Array(
    'state' => 'success',
    'data' => $messages
);

print json_encode($obj);
mysqli_close($conn);

?>


