<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Welcome</title>
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="images/icon.jpg">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
  <nav>
    <ul>
      <li class="menu">
        <a href="javascript:void(0)">
          <i class="fa fa-bars"></i>
        </a>
      </li>
      <li><a href="index.html">HOME</a></li>
      <li><a href="#show">2019-20 SCHOOL YEAR</a></li>
      <li><a href="#about">ABOUT US</a></li>
      <li><a href="contact.html">CONTACT</a></li>
    </ul>
  </nav>
  <main class="contact">
    <section class="intro">
      <article>
<?php
if (!empty($_REQUEST['name']) && !empty($_REQUEST['email']) && !empty($_REQUEST['message'])) { //if "email" variable is filled out, send email
  
  //Set admin email for email to be sent to (use your own MATC email address)
  $admin_email = "yourname@example.com"; 

  //Set PHP variable equal to information completed on the HTML form
  $email = $_REQUEST['email']; //Request email that user typed on HTML form

  //Combine first name and last name, adding a space in between
  $name = $_REQUEST['name'];
  $subject = "Website New Settler!";
  $message = $_REQUEST['message'];
            
  //Start building the email body combining multiple values from HTML form    
  $body  = "From: " . $name . "\n"; 
  $body .= "Email: " . $email . "\n";
  $body .= "Message : " . $message . "\n";

  
  //Create the email headers for the from and CC fields of the email     
  $headers = "From: " . $name . " <" . $email . "> \r\n"; //Create email "from"
    
  //Actually send the email from the web server using the PHP mail function
  mail($admin_email, $subject, $body, $headers); 
    
  //Display email confirmation response on the screen
  echo "<h1>Thank you for contacting us!</h1>"; 

  header( "refresh:3;url=contact.html" );

}else{ //if "email" variable is not filled out, display an error

  echo "<h1 style=\"color:red;\">There has been an error!</h1>";

  header( "refresh:3;url=contact.html" );
}
?>
      </article>
    </section>
  </main>
  <footer>
    <p>Copyright &copy; 2019</p>
  </footer>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="js/master.js"></script>
</body>
</html>