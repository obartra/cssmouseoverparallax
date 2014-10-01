<?
$build = true;
define('PUBLIC_PATH', dirname(__FILE__) . '/../');

ob_start();
	include(PUBLIC_PATH . 'index.php');
	$contentHtml = ob_get_contents();
ob_end_clean();
file_put_contents(PUBLIC_PATH . 'grunt/tmp/index.html', $contentHtml);

// ob_start();
// 	include(PUBLIC_PATH . 'dev/old.php');
// 	$contentOld = ob_get_contents();
// ob_end_clean();
// file_put_contents(PUBLIC_PATH . 'grunt/tmp/old.html', $contentOld);
