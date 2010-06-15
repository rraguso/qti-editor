<?php
$wholePath = $_POST['wholePath'];
$result = array();
if(!file_exists($wholePath)) {
	mkdir($wholePath);
}
foreach(new DirectoryIterator($wholePath) as $fileInfo) {
    if(preg_match('/\.(jpeg|jpg|gif|png)$/i',$fileInfo->getFilename())) {
    	$result[] = $fileInfo->getFilename();
    }
}
echo json_encode($result);

?>
