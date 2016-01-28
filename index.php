<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Просмотр смс</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
   <!-- <script src="js/common.js"></script> -->
    
    <script type="text/javascript">

            $(document).ready(function () {
                $("#inputForm").submit(Send); // вешаем на форму с именем и сообщением событие которое срабатывает когда нажата кнопка "Отправить" или "Enter"
                $("#inputText").focus(); // по поле ввода сообщения ставим фокус
                setInterval("Load();", 2000); // создаём таймер который будет вызывать загрузку сообщений каждые 2 секунды (2000 миллисекунд)
            });

            
            function Send() {
                // Выполняем запрос к серверу с помощью jquery ajax: $.post(адрес, {параметры запроса}, функция которая вызывается по завершению запроса)
                $.post("ajax.php",
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
                // Проверяем можем ли мы загружать сообщения. Это сделано для того, чтобы мы не начали загрузку заново, если старая загрузка ещё не закончилась.
                if(!load_in_process)
                {
                    load_in_process = true; // загрузка началась
                    // отсылаем запрос серверу, который вернёт нам javascript
                    $.post("ajax.php",
                            {
                                act: "load", // указываем на то что это загрузка сообщений
                                last: last_message_id, // передаём номер последнего сообщения который получил пользователь в прошлую загрузку
                                rand: (new Date()).getTime()
                            },
                            function (result) { // в эту функцию в качестве параметра передаётся javascript код, который мы должны выполнить
                                
                                load_in_process = false; // говорим что загрузка закончилась, можем теперь начать новую загрузку
                            });
                }
            }
        </script>
    
  </head>
  <body>        
    <div class="container">
        <div class="col-sm-6">
            <h2>Добавление задачи</h2>
            <form id="inputForm" class="form-horizontal" method="post" role="form">
              <div class="form-group">
                <label for="inputNumber" class="col-sm-2 control-label">Телефон</label>
                <div class="col-sm-10">
                  <input name="number" type="tel" class="form-control" id="inputNumber" placeholder="Телефон">
                </div>
              </div>
              <div class="form-group">
                <label for="inputText" class="col-sm-2 control-label">Текст сообщения</label>
                <div class="col-sm-10">
                  <textarea class="form-control" name="text" type="text" class="form-control" id="inputText" placeholder="Текст сообщения" rows="3"></textarea>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <button type="submit" class="btn btn-success">Отправить</button>
                </div>
              </div>
            </form>
        </div>
    </div>  
      
        <div class="container">
            <div id="chat_area"><!-- Сюда мы будем добавлять новые сообщения -->
            </div>
        </div>  
       
    
            
    
  </body>
</html>


