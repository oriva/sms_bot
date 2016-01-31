
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
    console.log("--load()--" + load_in_process + last_message_id);
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
                    console.log("data" + last_message_id);
                    if (last_message_id==0){ 
                        for (last_message_id in result.data) {
                            console.log(last_message_id);
                            var msg = result.data[last_message_id];
                            var str = JSON.stringify(msg);
                            var msgclass;
                                switch (msg.state){
                                    case 'WAITING':
                                        msgclass = 'warning'
                                        break
                                    case 'SUCCESFULL':
                                        msgclass = 'success'
                                        break
                                    case 'ERROR':
                                        msgclass = 'danger'
                                        break
                                    default:
                                        msgclass = 'active'
                                }
                            var content = "<tr class=" + msgclass + "><th>" + msg.id + "</th><td>" + msg.number + "</td><td>" + msg.text + "</td><td>" + msg.date_add + "</td><td>" + msg.date_send + "</td><td>" + msg.date_recieve + "</td><td>" + msg.state + "</td></tr>";
                            
                            $("#chat_area").append(content);

    //                        var tablestr = "<tr><td>" + msg.id + "</td><td>" 
    //                            + msg.number "</td></tr>";
    //                         $("#chat_area").append(tablestr)  
                        }
                    } else {
                        var msg = result.data[0];
                        var str = JSON.stringify(msg);
                            switch (msg.state){
                                    case WAITING:
                                        msgclass = warning
                                    case SUCCESFULL:
                                        msgclass = success
                                    case ERROR:
                                        msgclass = danger
                                    default:
                                        msgclass = active
                                }
                        var content = "<tr><th>" + msg.id + "</th><td>" + msg.number + "</td><td>" + msg.text + "</td><td>" + msg.date_add + "</td><td>" + msg.date_send + "</td><td>" + msg.date_recieve + "</td><td>" + msg.state + "</td></tr>";
                        
                        $("#chat_area").prepend(content);
                    }
                }
            });
    }
    Load_in_process = false;
}
