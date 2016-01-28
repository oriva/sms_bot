
console.log("index.js loaded");

$(document).ready(function () {
    $("#inputForm").submit(Send); // вешаем на форму с именем и сообщением событие которое срабатывает когда нажата кнопка "Отправить" или "Enter"
    $("#inputText").focus(); // по поле ввода сообщения ставим фокус
    setInterval(Load, 5000); // создаём таймер который будет вызывать загрузку сообщений каждые 2 секунды (2000 миллисекунд)
});


function Send() {
    // Выполняем запрос к серверу с помощью jquery ajax: $.post(адрес, {параметры запроса}, функция которая вызывается по завершению запроса)
    $.postJson("ajax.php",
            {
               // if ( valid()){
                act: "send",  // указываем скрипту, что мы отправляем новое сообщение и его нужно записать
                number: $("#inputNumber").val(), // имя пользователя
                text: $("#inputText").val() //  сам текст сообщения
               // } else {

            //}
            },
            Load () ); // по завершению отправки вызываем функцию загрузки новых сообщений Load()

    $("#inputText").val(""); // очистим поле ввода сообщения
    $("#inputText").focus(); // и поставим на него фокус

    return false; 
}

var last_message_id = 0; // номер последнего сообщения, что получил пользователь
var load_in_process = false; // можем ли мы выполнять сейчас загрузку сообщений. Сначала стоит false, что значит - да, можем


function Load() {
    console.log("--load()--" + load_in_process);
    // Проверяем можем ли мы загружать сообщения. Это сделано для того, чтобы мы не начали загрузку заново, если старая загрузка ещё не закончилась.
    if(!load_in_process)
    {
        load_in_process = true; // загрузка началась
        // отсылаем запрос серверу, который вернёт нам javascript
        $.post("ajax_getMsg.php",
            {
                act: "load", // указываем на то что это загрузка сообщений
                last: last_message_id, // передаём номер последнего сообщения оторый получил пользователь в прошлую загрузку
                rand: (new Date()).getTime()
            },
            function (result) { // в эту функцию в качестве параметра передаётся javascript код, который мы должны выполнить
               // console.log(result)
                if (result.state == "error") {
                    console.log("Ohm.. We got error");
                }
                else if (result.state == "success") {
                    console.log(result.data);
                    for (elem in result.data) {
                        var msg = result.data[elem];
                        var str = JSON.stringify(msg);
                        $("#chat_area").append("<pre>" + str + "</pre><br />");
                     
//                        var tablestr = "<tr><td>" + msg.id + "</td><td>" 
//                            + msg.number "</td></tr>";
//                         $("#chat_area").append(tablestr)                    
                         
                        $("#chat_area").append("<pre>" + str + "</pre><br />");
                        
                    }
                }
               //oad_in_process = false; // говорим что загрузка закончилась, можем теперь начать новую загрузку
            });
    }
}
