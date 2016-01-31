<?php
$conn = mysqli_connect("localhost", "root", "secret", "sms");


$number = strval($_POST['number']); 
$text = strval($_POST['text']);
var_dump($number, $text);
mysqli_query($conn,"INSERT INTO `sms_tasks`(`text`, `number`, `state`) VALUES ('$text',$number,'WAITING')");
?>