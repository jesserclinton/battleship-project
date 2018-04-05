<?php
	session_id('JohnHuntMailbox');
	if( !isset( $_SESSION ) ) {
		session_start();
	}
	$mailboxes = $_SESSION['Mailboxes'];
 	echo json_encode($mailboxes);
	//print_r($mailboxes);
?>