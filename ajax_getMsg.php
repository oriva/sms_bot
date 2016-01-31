<?php

$conn = mysqli_connect("localhost", "root", "secret", "sms");
// подключаемся к MySQL, если не вышло то выходим

//Header("Cache-Control: no-cache, must-revalidate"); 
//Header("Pragma: no-cache");
Header("Content-Type: application/json; charset=utf-8"); 

// проверяем есть ли переменная act (send или load), которая указываем нам что делать

//var_dump($_GET);
//var_dump($_POST);

//  $_POST['last'] - номер последнего сообщения которое загрузилось у пользователя
$last_message_id = intval($_POST['last']); // возвращает целое значение переменной

// выполняем запрос к базе данных для получения сообщений
$result = mysqli_query($conn,"SELECT * FROM sms_tasks");
// проверяем есть ли какие-нибудь новые сообщения


// Если $result содержит ошибку, то заходим в эти скобки
if (!$result) {
    $obj = Array(
        'state' => 'error',
        'data' => null
    );
    print json_encode($obj);
    mysqli_close($conn);
    exit(); // выходим из программы
}

// если мы дошли до этой строки, то $result точно не содержит ошибки
// а значит запрос успешно выполнен

// следующий конструкцией мы получаем массив сообщений из нашего запроса
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


