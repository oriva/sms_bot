<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Просмотр смс</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="js/jquery-ui-1.11.4/jquery-ui.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.js"></script>
    <script src="js/jquery-ui-1.11.4/jquery-ui.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/datapicker.js"></script> 
    <script src="js/elements.js"></script>   
    <script type="text/javascript" src="index.js"></script>
    
  </head>
  <body>        
    <div class="container">
        <div class="col-sm-6">
            <h2>Добавление задачи</h2>
            <form id="inputForm" class="form-horizontal" method="post" role="form">
              <div class="form-group">
                <label for="inputNumber" class="col-sm-2 control-label">Телефон</label>
                <div class="col-sm-10">
                  <input name="number" type="tel" class="form-control" id="inputNumber" placeholder="Телефон" pattern="[0-9]{11}" title="Введите номер телефона в формате: 8********** (11 знаков)" required>
                </div>
              </div>
              <div class="form-group">
                <label for="inputText" class="col-sm-2 control-label">Текст сообщения</label>
                <div class="col-sm-10">
                  <textarea class="form-control" name="text" type="text" class="form-control" id="inputText" placeholder="Текст сообщения" rows="3" required></textarea>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <button type="submit" class="btn btn-success">Отправить</button>
                </div>
              </div>
            </form>
        </div>
        <div class="col-sm-5">
            <h2>Фильтр</h2>
            <form id="formFilter" class="form-horizontal" method="post" role="form">
                <div class="row">
                    <div class="col-sm-5">
                        <input type="text" class="form-control" id="dateto" value="<?php echo date('d/m/Y'); ?>">
                    </div>
                    <div class="col-sm-1">
                        <span class="glyphicon glyphicon-minus" style="padding-top: 7px"></span>
                    </div>
                    <div class="col-sm-5">
                        <input type="text" class="form-control" id="datefrom" value="<?php echo date('d/m/Y'); ?>"><br />
                    </div>
                </div>
                    <p>
                        <input type="checkbox" id="WAITING"> WAITING 
                        <input type="checkbox" id="SUCCESSFULL"> SUCCESSFULL 
                        <input type="checkbox" id="ERROR"> ERROR 
                    </p>
                        <input type="text" id="number" class="form-control" placeholder="Телефон">
                        <button type="button" class="btn btn-primary" style="margin-top: 17px" onclick="pullOut()">Primary</button>
                
            </form>
        </div> 
    </div>
       
         
    <div class="container">
           <div class="bs-example" data-example-id="contextual-table"> 
            <table class="table">
                <thead>
                    <tr>
                        <th class="col-md-1">id</th>
                        <th class="col-md-1">Номер</th>
                        <th>Текст</th>
                        <th class="col-md-1">Дата добавления</th>
                        <th class="col-md-1">Дата отправки</th>
                        <th class="col-md-1">Дата получения</th>
                        <th class="col-md-1">Статус</th>
                    </tr>
                </thead>
                <tbody id="chat_area">
                    <!-- Сюда мы будем добавлять новые сообщения -->
                </tbody> 
            </table> 
            </div>
    </div>  
        
    <script>
        $('#myTabs a').click(function (e) {
          e.preventDefault()
          $(this).tab('show')
        })
    </script>           
  </body>
</html>


