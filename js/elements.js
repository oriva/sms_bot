
//    alert( elem.getAttribute('About') );
//
//    var attrs = elem.attributes;
//    for (var i = 0; i < attrs.length; i++) {
//      alert( attrs[i].name + " = " + attrs[i].value );
//    }

function pullOut () {
    var dateto = document.getElementById("dateto").value;
    var datefrom = document.getElementById("datefrom").value;
    var number = document.getElementById("number").value;
    var WAITING = document.getElementById("WAITING").checked;
    var SUCCESSFULL = document.getElementById("SUCCESSFULL").checked;
    var ERROR = document.getElementById("ERROR").checked;
    
    console.log(dateto + "  " + datefrom + "  " + number + "  " + WAITING, SUCCESSFULL, ERROR);
    console.log(typeof dateto);
    Load;
}