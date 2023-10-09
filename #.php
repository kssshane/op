<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = $_POST["ssshane_m"];
    $password = $_POST["k4shane"];


    if ($username === "ssshane_m" && $password === "k4shane") {
        // Successful login
        // You can redirect the user to another page or display a welcome message here
        echo "Welcome, $username!";
    } else {
        // Invalid credentials
        echo "Invalid username or password. Please try again.";
    }
}
?>
