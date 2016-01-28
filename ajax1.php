<?php

$config = mysqli_connect("localhost", "root", "secret", "sms");
// подключаемся к MySQL, если не вышло то выходим

Header("Cache-Control: no-cache, must-revalidate"); 
Header("Pragma: no-cache");
Header("Content-Type: text/javascript; charset=utf-8"); 

// проверяем есть ли переменная act (send или load), которая указываем нам что делать
if (isset($_GET['act'])) {
    switch ($_GET['act']) {
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
    
    mysqli_query($config,"INSERT INTO sms_tasks (number,text) VALUES ($number,  $text)");
    }
    


    // Загрузка смс
function Load()
{
    //  $_POST['last'] - номер последнего сообщения которое загрузилось у пользователя
    global $config;
    $last_message_id = 0; // возвращает целое значение переменной
    $query = mysqli_real_query($config,"SELECT * FROM sms_tasks");
    $js = 'var chat = $("#chat_area");'; // получаем "указатель" на div, в который мы добавим новые сообщения
    if ($query > 0){
    // следующий конструкцией мы получаем массив сообщений из нашего запроса
    $messages = array();
    while ($row = mysqli_fetch_array($res)) {
    $res = $connect->query("SELECT * FROM sms_tasks WHERE id=$last_message_id");
    $messages[] = $res;
    $last_message_id=$last_message_id+1;
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
mysqli_close($config);
?>