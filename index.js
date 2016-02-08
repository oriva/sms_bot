
console.log("index.js loaded");

$(document).ready(function () {
    $("#inputForm").submit(Send); 
    $("#inputText").focus();
});


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
            "json" ); 
    $("#inputText").val("");
    $("#inputText").focus();
    return false; }
}

function Load() { 
        console.log("Function Load is ready");
        $.post("ajax_getMsg.php",
            {
                act: "load", // указываем на то что это загрузка сообщений
            },
            function (result) { // в эту функцию в качестве параметра передаётся javascript код, который мы должны выполнить
               // console.log(result)
                if (result.state == "error") {
                    console.log("Ohm.. We got error");
                }
                else if (result.state == "success") { 
                        for (var p in result.data) {
                            var msg = result.data[p];
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
                    
                }
            
            });
    }
