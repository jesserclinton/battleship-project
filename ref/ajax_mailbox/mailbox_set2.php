<?php
	session_id('JohnHuntMailbox');
	if( !isset( $_SESSION ) ) {
		session_start();
	}
	$mailboxes = $_SESSION['Mailboxes'];
	$stuff = json_decode(file_get_contents("php://input"));
	/* stuff is {"Name":"fred","Msg":"basset"} */
	$name = $stuff->Name;
	$msg = $stuff->Msg;
	$mailboxes[$name] = $msg;
        print_r($mailboxes);
	$_SESSION['Mailboxes'] = $mailboxes;
?>
