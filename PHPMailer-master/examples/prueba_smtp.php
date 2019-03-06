<?php
$rfc=$_POST['rfc'];

require '../PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;
//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';
//Set the hostname of the mail server
$mail->Host       = " box826.bluehost.com";
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port       = 465;
//Whether to use SMTP authentication
$mail->SMTPAuth   = true;
$mail->SMTPSecure = 'ssl';
 $mail->IsHTML(true);
//Username to use for SMTP authentication
$mail->Username   = "pruebas@tierradeideas.mx";
//Password to use for SMTP authentication
$mail->Password   = "lapicero12";
//Set who the message is to be sent from
$mail->setFrom('pruebas@tierradeideas.mx', 'Admiistración');
//Set an alternative reply-to address
//$mail->addReplyTo('replyto@example.com', 'First Last');
//Set who the message is to be sent to
$mail->addAddress('alaneduardosandoval@yahoo.com', 'John Doe');
//Set the subject line
$mail->Subject = 'PHPMailer SMTP test';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));
//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';
//Attach an image file
$mail->addAttachment($rfc);

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
?>