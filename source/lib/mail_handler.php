<?php

  ini_set( "display_errors", "1" );
  ini_set( "display_startup_errors", "1" );
  error_reporting( E_ALL );

  header( "Access-Control-Allow-Origin: *" );

	function phpmail(){

		require_once( "class.phpmailer.php" );
		require_once( "class.smtp.php" );
		require_once( "mail_template.php" );

		/*Данные получателя*/

		$recipient_name = "Беркович и партнеры";
		$recipient_email = "n.berkovich@n-bpartners.ru";
		$recipient_email = "v.yakubovich@mail.ru";

		/*Данные получателя*/

		$ERROR = false;

		if( isset( $_POST[ "request_fio" ] ) && !empty( $_POST[ "request_fio" ] ) )			        $sender_name = $_POST[ "request_fio" ]; else $ERROR = true;
		if( isset( $_POST[ "request_phone" ] ) && !empty( $_POST[ "request_phone" ] ) )			    $sender_phone = $_POST[ "request_phone" ]; else $ERROR = true;
		if( isset( $_POST[ "request_email" ] ) && !empty( $_POST[ "request_email" ] ) )		      $sender_email = $_POST[ "request_email" ]; else $ERROR = true;
		if( isset( $_POST[ "request_question" ] ) && !empty( $_POST[ "request_question" ] ) )		$sender_message = $_POST[ "request_question" ];

    $error_text = "Ошибка! Попробуйте еще раз!";
    $success_text = "Отправлено!";

		$error_message = "<span class='form__server-answer  form__server-answer--fail' data-error='true'>" . $error_text . "</span>";
		$success_message = "<span class='form__server-answer  form__server-answer--success'>" . $success_text . "</span>";
		$theme_mail_owner = "Новое сообщение с сайта";

		if( !$ERROR ) {

			$__smtp = array(

				"host" => "smtp.yandex.ru",               // SMTP сервер
				"debug" => 2,                             // Уровень логирования
				"auth" => true,                           // Авторизация на сервере SMTP. Если ее нет - false
				"port" => "465",                          // Порт SMTP сервера
				"username" => "sinister2008@yandex.ru",   // Логин запрашиваемый при авторизации на SMTP сервере
				"password" => "cpp104RjnktnF0",           // Пароль
				"addreply" => $recipient_email,           // Почта для ответа
				"secure" => "ssl",                        // Тип шифрования. Например ssl или tls
				"mail_name" => $recipient_name            // Имя отправителя

			);

			$mail = new PHPMailer( true );                                  // Создаем экземпляр класса PHPMailer
			$mail -> IsSMTP();                                              // Указываем режим работы с SMTP сервером
			$mail -> Host       = $__smtp[ "host" ];                        // Host SMTP сервера: ip или доменное имя
			$mail -> SMTPDebug  = $__smtp[ "debug" ];                       // Уровень журнализации работы SMTP клиента PHPMailer
			$mail -> SMTPAuth   = $__smtp[ "auth" ];                        // Наличие авторизации на SMTP сервере
			$mail -> Port       = $__smtp[ "port" ];                        // Порт SMTP сервера
			$mail -> SMTPSecure = $__smtp[ "secure" ];                      // Тип шифрования. Например ssl или tls
			$mail -> CharSet 	= "UTF-8";                                    // Кодировка обмена сообщениями с SMTP сервером
			$mail -> Username   = $__smtp[ "username" ];                    // Имя пользователя на SMTP сервере
			$mail -> Password   = $__smtp[ "password" ];                    // Пароль от учетной записи на SMTP сервере
			$mail -> AddAddress( $recipient_email, $recipient_name );       // Адресат почтового сообщения
			$mail -> AddReplyTo( $__smtp[ "addreply" ], $recipient_name );  // Альтернативный адрес для ответа
			$mail -> SetFrom( $__smtp[ "username" ], $theme_mail_owner );   // Адресант почтового сообщения
			$mail -> Subject = htmlspecialchars( $theme_mail_owner );       // Тема письма

			$message_to_owner = $mail_header
								. $mail_header_tag . $theme_mail_owner . $mail_header_tag_end
								. $mail_paragraph
								. "<p style='text-align:center;'><strong>Информация</strong></p><br><br>"
								. "<strong>Имя:</strong> " . $sender_name . "<br>"
								. "<strong>Телефон:</strong> " . $sender_phone . "<br>"
								. "<strong>Email:</strong> " . $sender_email . "<br>";

			if( isset( $sender_message ) ) 	$message_to_owner .= "<strong>Сообщение:</strong> " . $sender_message . "<br>";

			$message_to_owner .= $mail_paragraph_end . $mail_footer;

			$mail -> MsgHTML( $message_to_owner );

			if( $mail -> Send() ) echo( $success_message );
			else die( $error_message );

		}	else die( $error_message );

	}

	phpmail();

?>
