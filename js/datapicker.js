$(document).ready(function() {
 $('body').click(function(event) {
    if ($(event.target).is("#dateto")) {
     $("#dateto").datepicker({showOn: 'focus', dateFormat: 'mm/dd/yy'}).focus();    
    }
    if ($(event.target).is("#datefrom")) {
     $("#datefrom").datepicker({showOn: 'focus', dateFormat: 'mm/dd/yy'}).focus();    
    }
 });
});

//datepickerTo = $('#dateto');
//datepickerFrom = $('#datefrom');
//
//closeFromFunc = function( selectedDate ) {
//        datepickerTo.datepicker("option","minDate",selectedDate);
//    };
//
//closeToFunc = function( selectedDate ) {
//        datepickerFrom.datepicker("option","maxDate",selectedDate);
//    };
//function datePick(){
//datepickerFrom.datepicker({
//        dateFormat: "yy-mm-dd",
//        changeMonth: true,
//        numberOfMonths: 2,
//        onClose: closeFromFunc
//    });
//
//datepickerTo.datepicker({
//        dateFormat: "yy-mm-dd",
//        defaultDate: "+1d",
//        changeMonth: true,
//        numberOfMonths: 2,
//        onClose: closeToFunc
//    });
//};
//checkState = function () {
//        var datfromTxt = datepickerFrom.val();
//        var datToTxt = datepickerTo.val();
//        var reg = /^\d{4}-\d{2}-\d{2}$/i;
//        console.log("Дату должен показать");
//        if (!reg.test(datfromTxt)) {
//        alert("Неверный формат даты");
//        return false;
//        }
//        if (!reg.test(datToTxt)) {
//        alert("Неверный формат даты");
//        return false;
//        }
//        return true;
//};



