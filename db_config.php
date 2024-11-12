<?php
$servername = "localhost"; 
$username = "root";
$password = "";
$dbname = "OnlineVotingSystem"; 

if(!$conn = mysqli_connect($servername, $username, $password, $dbname))
{
    die("Failed to connect!");
}
?>