<?php

$config = mysqli_connect("localhost", "root", "secret", "sms");
// подключаемся к MySQL, если не вышло то выходим
if (!$config) {
    exit();
}

$query = mysqli_query($config,'SELECT number, text FROM sms_tasks');
mysqli_stmt_num_rows($query);
Header("Cache-Control: no-cache, must-revalidate"); 
Header("Pragma: no-cache");
Header("Content-Type: text/javascript; charset=utf-8"); 

// проверяем есть ли переменная act (send или load), которая указываем нам что делать
if (isset($_POST['act'])) {
    switch ($_POST['act']) {
        case "send" : 
            Send();
            break;
        case "load" : 
            Load();
            break;
        default : 
            exit();
    }
}

// Сохранение смс в базе
function Send()
{
    global $config;
    $number = isset($_POST['number']);
    $text = isset($_POST['text']);
    
    $sql = "INSERT INTO "
    
    mysqli_query($config,"INSERT INTO sms_tasks (number,text) VALUES ($number,  $text)");
    }
    


    // Загрузка смс
function Load()
{
    //  $_POST['last'] - номер последнего сообщения которое загрузилось у пользователя
    global $config;
    $last_message_id = intval($_POST['last']); // возвращает целое значение переменной

    // выполняем запрос к базе данных для получения сообщений с номером большим чем $last_message_id
    $query = mysqli_query($config,'SELECT number, text FROM sms_tasks');

    // проверяем есть ли какие-нибудь новые сообщения
    if (mysqli_stmt_num_rows($query) > 0) {
    // начинаем формировать javascript который мы передадим клиенту
    $js = 'var chat = $("#chat_area");'; // получаем "указатель" на div, в который мы добавим новые сообщения

    // следующий конструкцией мы получаем массив сообщений из нашего запроса
    $messages = array();
    while ($row = mysqli_fetch_array($query)) {
    $messages[] = $row;
    }

    $messages = array_reverse($messages);

    // идём по всем элементам массива $messages
    foreach ($messages as $value) {
    // продолжаем формировать скрипт для отправки пользователю
    $js .= 'chat.append("<span>' . $value['number'] . '&raquo; ' . $value['text'] . '</span>");'; // добавить сообщние (<span>Имя &raquo; текст сообщения</span>) в наш div
    }

    $js .= "last_message_id = $last_message_id;"; // запишем номер последнего полученного сообщения, что бы в следующий раз начать загрузку с этого сообщения

    // отправляем полученный код пользователю, где он будет выполнен при помощи функции eval()
    echo $js;
    }
}
mysqli_close($link);
?>