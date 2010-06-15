<?php

if(empty($_FILES) || $_FILES['uploaded_file']['error'] != 0 || $_FILES['uploaded_file']['size'] == 0) {
	die('Błąd podczas przesyłania pliku!');
}

if(!preg_match('/\.(jpeg|jpg|gif|png)$/i',$_FILES['uploaded_file']['name'])) {
	die('To nie jest plik graficzny!');
}

$basePath = $_POST['basepath'];
$docsDir = $_POST['docsdir'];
$contentDocumentPath = $_POST['contentdocumentpath'];
$choiceWindow = $_POST['choicewindow'];
$destDir = 'media';
$newPath = $basePath.'/'.$docsDir.$contentDocumentPath.'/';
if($destDir) {
	$newPath .= $destDir.'/';
	if(!file_exists($newPath)) {
		mkdir($newPath);
	}
}

if(move_uploaded_file($_FILES['uploaded_file']['tmp_name'], $newPath.normalizeFileName($_FILES['uploaded_file']['name']))) {
	header('location: '.($choiceWindow == 'true' ? 'imgchoice.htm' : 'imglib.htm'));
} else {
	die('Błąd podczas zapisywania pliku!');
}

function normalizeFileName($name) {
	
	$polishChars = array("ą","ć","ę","ł","ń","ó","ś","ż","ź","Ą","Ć","Ę","Ł","Ń","Ó","Ś","Ż","Ź");
	$asciiChars = array("a","c","e","l","n","o","s","z","z","A","C","E","L","N","O","S","Z","Z");
	$name = str_replace($polishChars,$asciiChars,$name);
	return preg_replace('/[^a-zA-Z0-9\.]/','_',$name);
	
}

?>
