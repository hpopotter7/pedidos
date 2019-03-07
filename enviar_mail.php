<?php
$cliente = $_POST['cliente'];
$tabla = $_POST['tabla'];

  require ('PHPMailer-master/PHPMailerAutoload.php');

  $mail = new PHPMailer();
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
  //$mail->Host       = "handcraft.com.mx";
  $mail->Host       = "mail.administraciontierradeideas.mx";
  //Set the SMTP port number - likely to be 25, 465 or 587
  $mail->Port       = 465;
  //Whether to use SMTP authentication
  $mail->SMTPAuth   = true;
  $mail->SMTPSecure = 'ssl';;
   $mail->IsHTML(true);
  //Username to use for SMTP authentication
  $mail->Username   = "notificaciones@administraciontierradeideas.mx";
  //Password to use for SMTP authentication
  $mail->Password   = "@ERPideas2019";
  //Set who the message is to be sent from
  $mail->setFrom('notificaciones@administraciontierradeideas.mx', 'Sistema pedidos');
  //Set an alternative reply-to address
  $mail->addAddress('7kaskara7@gmail.com', 'Alan');
  //Set who the message is to be sent to
  //Set the subject line
  $mail->addAddress('cristian.angel@sedsa.com.mx', 'Cristian Guerra');
  //Read an HTML message body from an external file, convert referenced images to embedded,
  //convert HTML into a basic plain-text alternative body
  //
  
  
  $mail->Subject = 'Solicitud de pedido ';
  $mail->CharSet = 'UTF-8';

  $body='<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  <html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <style type="text/css" media="screen">
      table{
            border: 1px solid #1C6EA4;
    background-color: #EEEEEE;
    width: 100%;
    text-align: left;
    border-collapse: collapse;
      }
      table thead{
        background: #1C6EA4;
        background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
        background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
        background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
        border-bottom: 2px solid #444444; 
      }
      table th{
        font-size: 15px;
        font-weight: bold;
        color: #FFFFFF;
        border-left: 2px solid #D0E4F5;
      }
      .boton_borrar{
        display: none;
      }
    </style>
  </head>
  <body>
  <div style="width: 640px; font-family: Helvetica, sans-serif; font-size: 14px;">    
    <label><h2>El cliente '.$cliente.' ha solicitado el siguiente pedido:</h2></label><br><br><p>
    <div class="row"><table >'.$tabla.'</table></div>
  </div>
  
  </body>
  </html>
  ';
  
  $mail->MsgHTML($body);

  //send the message, check for errors
  if (!$mail->send()) {
      echo "Mailer Error: " . $mail->ErrorInfo;
  } else {
      echo $tabla."Enviado";
  }

?>