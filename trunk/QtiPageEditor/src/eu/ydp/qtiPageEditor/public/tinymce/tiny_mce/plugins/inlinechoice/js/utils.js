function add_answer_row() {
	
	var randid = Math.random();
	randid = String(randid);
	var rg = new RegExp('0.([0-9]*)',"gi");
	exec = rg.exec(randid);
	var id = 'id_' + exec[1];

	var newDiv = document.createElement('div');
	newDiv.setAttribute('style', 'width: 100%; margin: 3px;');
	newDiv.innerHTML = '<table cellpadding=0 cellspacing=0><tr><td width="260px" style="padding-right: 5px;"><input type="text" id="" name="answers[]" style="width: 100%; margin-right: 5px;" /></td><input type="hidden" id="" name="ids[]" value="' + id + '"/><td width="50px"><input type="radio" name="points[]" style="margin: 0; padding: 0;" /></td><td width="50px"><input id="" type="checkbox" name="fixed[]" style="margin: 0; padding: 0;" /></td><td width="80px"><input type="button" id="remove_answer" name="remove_answer" value="Remove" onclick="remove_answer_row(this);" /></td></tr></table>';
	document.getElementById('answer_list').appendChild(newDiv);
	
}

function remove_answer_row(row) {

	var table = row.parentNode.parentNode.parentNode.parentNode;
	table.parentNode.removeChild(table);
	
}
