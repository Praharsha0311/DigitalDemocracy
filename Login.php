<?php
include 'db_config.php';


$fullName = $_POST['fullName'];
$voterId=$_POST['voterId'];
$gender = $_POST['gender'];
$age = $_POST['age'];
$fatherName = $_POST['fatherName'];
$address = $_POST['address'];

$sql = "SELECT * FROM CanditatesListNew WHERE fullName = '$fullName' AND gender = '$gender' AND age = '$age' AND fatherName = '$fatherName' AND voterId='$voterId'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $checkVoteSql = "SELECT * FROM VotedUsers WHERE fullName = '$fullName'";
    $checkVoteResult = $conn->query($checkVoteSql);
    if ($checkVoteResult->num_rows > 0) {
        header("Location: index.html?message=" . urlencode("You have already voted. Thank you!"));
    } else {
        header("Location: newvote.html?fullName=" . urlencode($fullName));
    }
} else {
    header("Location: login.html");
    echo '<script>alert("Incorrect Login Details");</script>';
}
?>