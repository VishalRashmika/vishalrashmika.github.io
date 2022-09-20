<!DOCTYPE html>
<html>
<head>
  <title>Store form data in .txt file</title>
</head>
<body>
  <form method="post">
    Enter Your Text Here:<br>
    <input type="text" name="textdata"><br>
    <input type="submit" name="submit">
    
  </form>

</body>
</html>


<?php
              
if(isset($_POST['textdata']))
{
$data=$_POST['textdata'];

$fp = fopen('data.txt', 'a');

fwrite($fp, $data);
fclose($fp);
}
?><div class="open_grepper_editor" title="Edit & Save To Grepper"></div>