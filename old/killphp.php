<?php
  session_unset();   // Remove the $_SESSION variable information.
  session_destroy(); // Remove the server-side session information.

  // Unset the cookie on the client-side.
  setcookie("PHPSESSID", "", 1); // Force the cookie to expire.

  // Start a new session
  session_start();

  // Generate a new session ID
  session_regenerate_id(true);

  // Then finally, make sure you pick up the new session ID
  $session_id = session_id();

  // $_SESSION will now be empty, and $session_id will have been regenerated.
  // You have a completely empty, new session.
?>
