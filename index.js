
console.log("index.js loaded");

$(document).ready(function () {
    $("#inputForm").submit(Send);
    $("#inputText").focus();
});


function Send() {
    console.log("==111");
        $.post("ajax_giveMsg.php", {
                act: "send",
                number: $("#inputNumber").val(),
                text: $("#inputText").val()
            },
            Load,
            "json");
        $("#inputText").val("");
        $("#inputText").focus();
        return false;
        pullOut();
}
function Load(_opts) {
    console.log("Function Load is ready");
    console.log(_opts);

//    
    $.post("ajax_getMsg.php", {
            act: "load",
            filter: _opts,
        },
        function (result) {
            console.log("sms-bot: Load:: $.post response:");
            console.dir(result.state);
            $("#chat_area").empty();
            if (result.state == "error") {
                console.log("Ohm.. We got error");
            } else if (result.state == "success") {
                for (var p in result.data) {
                    var msg = result.data[p];
                    var msgclass;
                    switch (msg.state) {
                    case 'WAITING':
                        msgclass = 'warning'
                        break
                    case 'SUCCESSFULL':
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
