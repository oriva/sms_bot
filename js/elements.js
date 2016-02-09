
//    alert( elem.getAttribute('About') );
//
//    var attrs = elem.attributes;
//    for (var i = 0; i < attrs.length; i++) {
//      alert( attrs[i].name + " = " + attrs[i].value );
//    }

function pullOut () { 
    //var pulldateto = document.getElementById("dateto").value;
    var pulldatefrom = $("#datefrom").val();
    var pulldateto = $("#dateto").val();
    var pullnumber = $("#number").val();
    var pullWAITING = document.getElementById("WAITING").checked;
    var pullSUCCESSFULL = document.getElementById("SUCCESSFULL").checked;
    var pullERROR = document.getElementById("ERROR").checked;
    pulldateto = pulldateto + " 23:59:59";
    pulldatefrom = pulldatefrom + " 00:00:00";
    
    if (pullWAITING){
        pullWAITING="WAITING"
    } else {
        pullWAITING=""
    };
    if (pullSUCCESSFULL){
        pullSUCCESSFULL="SUCCESSFULL"
    } else {
        pullSUCCESSFULL=""
    };
    if (pullERROR){
        pullERROR="ERROR"
    } else {
        pullERROR=""
    };
    
//    pulldateto.setFullYear(pulldateto.getHours() + 23, pulldateto.getMinutes() + 59, pulldateto.getSeconds() + 59);
    
    console.log(pulldateto + "  " + pulldatefrom + "  " + pullnumber + "  " + pullWAITING, pullSUCCESSFULL, pullERROR);
    
    
    var options = {
        datefrom : pulldatefrom,
        dateto : pulldateto,
        number : pullnumber,
        waiting : pullWAITING,
        successfull : pullSUCCESSFULL,
        error : pullERROR,
    };
    
    Load(options);
    
}