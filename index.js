
console.log("index.js loaded");


$(document).ready(function () {
    $("#inputForm").submit(Send); 
    $("#inputText").focus(); 
    setInterval(Load, 5000); 
});

var load_in_process = false;

function Send() {
    // Выполняем запрос к серверу с помощью 
    console.log("==111")
    $.post("ajax_giveMsg.php",
            {
               // if ( valid()){
                act: "send",  // указываем скрипту, что мы отправляем новое сообщение и его нужно записать
                number: $("#inputNumber").val(), 
                text: $("#inputText").val() 
               // } else {
            //}
            },
            Load, 
            "json" ); // по завершению отправки вызываем функцию загрузки новых сообщений Load()
    load_in_process = false;
    $("#inputText").val(""); // очистим поле ввода сообщения
    $("#inputText").focus(); // и поставим на него фокус
    return false; 
}

var last_message_id = 0; // номер последнего сообщения, что получил пользователь
// можем ли мы выполнять сейчас загрузку сообщений. Сначала стоит false, что значит - да, можем

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
            },
            function (result) { // в эту функцию в качестве параметра передаётся javascript код, который мы должны выполнить
               // console.log(result)
                if (result.state == "error") {
                    console.log("Ohm.. We got error");
                }
                else if (result.state == "success") {
                    console.log("data" + result.data);
                    $("#chat_area").html("");
                    for (elem in result.data) {
                        console.log(elem);
                        var msg = result.data[elem];
                        var str = JSON.stringify(msg);
                        $("#chat_area").append("<pre>" + str + "</pre><br />");
                     
//                        var tablestr = "<tr><td>" + msg.id + "</td><td>" 
//                            + msg.number "</td></tr>";
//                         $("#chat_area").append(tablestr)                      
                    } 
                }
            });
    }
    Load_in_process = false;
}
