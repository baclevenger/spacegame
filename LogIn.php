<!DOCTYPE html>
<html>
<head>
  <title>Player Log-In</title>
</head>
<body>
<?php

 
 include 'db.php'; 
 
   
  $name = $_POST['Name'];
  if (empty($_POST['Name'])) {
         echo "No Name Given";
		
  $Password = $_POST['Password'];
  if (empty($_POST['Password'])) {
         echo "No Password Given";
   
  
  mysqli_query($dbc, $query)
    or die(mysqli_error($dbc));
		
  mysqli_close($dbc);
  

include 'db.php';


$query = "SELECT ID FROM User where name ='". $name."' AND Password ='". $password."'";


 $id = mysqli_query($dbc, $query)
 or die(mysqli_error());
  }
 }
 
 else {
	echo "Sorry we did not recognize that Name and/or Password";
	?>
	<meta http-equiv="Refresh" content="1;SpaceGame.html">
	<?php
	}
 ?>
 
</body>
</html>
