<?php
	session_id('game');
	if( !isset( $_SESSION ) ) {
		session_start();
	}
	$players = $_SESSION['users'];
	echo json_encode($players);
?>