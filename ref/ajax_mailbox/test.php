<?php
/* stuff is {"Name":"fred","Msg":"basset"} */
	$stuff = json_decode('{"Name":"fred","Msg":"basset"}');

	
	$name = $stuff->Name;
	$msg = $stuff->Msg;
	
	$mailboxes[$name] = $msg;
	
	$mystring = json_encode($stuff);
	echo $mystring;
	echo "<BR>";
	echo $name;
	echo "<BR>";
	echo $msg;
	echo "<BR>";
	print_r($mailboxes);
?>