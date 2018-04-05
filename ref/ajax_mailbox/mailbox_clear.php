<?php
	session_id('JohnHuntMailbox');
	if( !isset( $_SESSION ) ) {
		session_start();
	}
	$mailboxes = $_SESSION['Mailboxes'];
 	$mailboxes = null;
	unset($mailboxes);
	$_SESSION['Mailboxes'] = $mailboxes;
	//print_r($mailboxes);
?>