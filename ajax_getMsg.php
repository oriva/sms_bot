<?php

$conn = mysqli_connect("localhost", "root", "secret", "sms");

Header("Content-Type: application/json; charset=utf-8"); 


//var_dump($_GET);
//var_dump($_POST);
var_dump($dateform);
$result = mysqli_query($conn,"SELECT * FROM sms_tasks WHERE `date_add` < "$datefrom" ");

if (!$result) {
    $obj = Array(
        'state' => 'error',
        'data' => null
    );
    print json_encode($obj);
    mysqli_close($conn);
    exit(); // выходим из программы
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


