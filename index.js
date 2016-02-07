
console.log("index.js loaded");

$(document).ready(function () {
    $("#inputForm").submit(Send); 
    $("#inputText").focus(); 
    setInterval(Load, 5000); 
});

var load_in_process = false;

function Send() {
    console.log("==111");
    
    if (valid==false){
        
    }else{
    $.post("ajax_giveMsg.php",
            {
                act: "send",
                number: $("#inputNumber").val(), 
                text: $("#inputText").val() 
            },
            Load, 
            "json" ); // по завершению отправки вызываем функцию загрузки новых сообщений Load()
    load_in_process = false;
    $("#inputText").val("");
    $("#inputText").focus();
    return false; }
}


var last_message_id = 0; 
function Load() { 
    console.log("--load()--" + load_in_process + last_message_id);
    // Проверяем можем ли мы загружать сообщения. Это сделано для того, чтобы мы не начали загрузку заново, если старая загрузка ещё не закончилась.
    if(!load_in_process)
    {
        load_in_process = true;
        $.post("ajax_getMsg.php",
            {
                act: "load", // указываем на то что это загрузка сообщений
                last: last_message_id,
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
