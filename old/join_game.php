<?php
	session_id('game');
	if( !isset( $_SESSION ) ) {
		session_start();
	}
	$name = $_POST['user'];
	$_SESSION['users'] = $name;
?>