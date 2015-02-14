<!DOCTYPE html>
<html>
<head>
  <title>Player Log-In</title>
</head>
<body>
<?php

 include 'db.php'; 
   
  $Name = $_POST['Name'];
  if (empty($_POST['Name'])) {
         echo "No Name Given";
  }
  $Password = $_POST['Password'];
  if (empty($_POST['Password'])) {
         echo "No Password Given";
  
   $Station = $_POST['Station'];
  if (empty($_POST['Station'])) {
         echo "No Station Name Given";
  
  }
  $Email = $_POST['Email'];
  if (empty($_POST['Email'])) {
         echo "No Email Given";
  }
  
  else{
   $Date = date("Y/m/d h:i:s ");
  

$query = "Insert Into users (Name, Password, Email, Date)
Values ('$Name', '$Password', '$Email', '$Date')";

mysqli_query($dbc, $query)
    or die(mysqli_error($dbc));
		
  mysqli_close($dbc);
  
  
  }
 
 ?>
 
</body>
</html>