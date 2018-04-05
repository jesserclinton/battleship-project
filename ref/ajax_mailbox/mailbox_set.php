<?php
	session_id('JohnHuntMailbox');
	if( !isset( $_SESSION ) ) {
		session_start();
	}
    $name = $_POST['name'];
    $msg = $_POST['msg'];
	$mailboxes = $_SESSION['Mailboxes'];
	echo "<H3>Old Value</H3>";
	print_r($mailboxes);
	$mailboxes[$name] = $msg;
	$_SESSION['Mailboxes'] = $mailboxes;
 	echo "<H3>New Value</H3>";
	print_r($mailboxes);
?>