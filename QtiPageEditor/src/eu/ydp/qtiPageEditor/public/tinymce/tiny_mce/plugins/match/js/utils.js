function add_answer_row(form, side) {
	
	//var feedbacksButton = document.getElementById('feedbacks_button');
	//if(feedbacksButton != undefined) {
	//	feedbacksButton.parentNode.removeChild(feedbacksButton);
	//}
	
	var randid = Math.random();
	randid = String(randid);
	var rg = new RegExp('0.([0-9]*)',"gi");
	exec = rg.exec(randid);
	var id = 'id_' + exec[1];

	while(form.nodeName != 'FORM') {
		form = form.parentNode;
	}
	
	var newDiv = document.createElement('div');
	newDiv.setAttribute('style', 'width: 100%; margin: 3px;');
	newDiv.setAttribute('id', id);
	if(form.images.checked == true) {
		if(side == 'left') {
			newDiv.innerHTML = '<table cellpadding=0 cellspacing=0><tr><td width="70px"><input type="button" id="remove_answer" name="remove_answer" value="Remove" onclick="remove_answer_row(this);" /></td><td width="50px" align="center"><input id="" type="checkbox" name="fixed_left[]" style="margin: 0; padding: 0;"/></td><td width="200px" style="" align="right"><input type="hidden" id="" name="ids_left[]" value="' + id + '"/><input type="hidden" id="" name="answers_left[]" style="width: 100%; margin-right: 5px;" value=""/><div style="width: 80px; height: 40px; cursor: pointer; border: 1px solid #b0b0b0;" onclick="tinyMCE.execCommand(\'mceAppendImageToExercise\', false, {src:\'\',div:this});"><img style="max-height: 40px; max-width: 80px;" src=""/></div></td></tr></table>';
		}
		if(side == 'right') {
			newDiv.innerHTML = '<table cellpadding=0 cellspacing=0><tr><td width="200px" style="" align="left"><input type="hidden" id="" name="ids_right[]" value="' + id + '"/><input type="hidden" id="" name="answers_right[]" style="width: 100%; margin-right: 15px;" value=""/><div style="width: 80px; height: 40px; cursor: pointer; border: 1px solid #b0b0b0;" onclick="tinyMCE.execCommand(\'mceAppendImageToExercise\', false, {src:\'\',div:this});"><img style="max-height: 40px; max-width: 80px;" src=""/></div></td><td width="50px" align="center"><input id="" type="checkbox" name="fixed_right[]" style="margin: 0; padding: 0;"/></td><td width="70px"><input type="button" id="remove_answer" name="remove_answer" value="Remove" onclick="remove_answer_row(this);" /></td></tr></table>';
		}
	} else {
		if(side == 'left') {
			newDiv.innerHTML = '<table cellpadding=0 cellspacing=0><tr><td width="70px"><input type="button" id="remove_answer" name="remove_answer" value="Remove" onclick="remove_answer_row(this);" /></td><td width="50px" align="center"><input id="" type="checkbox" name="fixed_left[]" style="margin: 0; padding: 0;"/></td><td width="200px" style="" align="right"><input type="hidden" id="" name="ids_left[]" value="' + id + '"/><input type="text" id="" name="answers_left[]" style="width: 100%; margin-right: 15px;" value=""/></td></tr></table>';
		}
		if(side == 'right') {
			newDiv.innerHTML = '<table cellpadding=0 cellspacing=0><tr><td width="200px" style="" align="left"><input type="hidden" id="" name="ids_right[]" value="' + id + '"/><input type="text" id="" name="answers_right[]" style="width: 100%; margin-right: 15px;" value=""/></td><td width="50px" align="center"><input id="" type="checkbox" name="fixed_right[]" style="margin: 0; padding: 0;"/></td><td width="70px"><input type="button" id="remove_answer" name="remove_answer" value="Remove" onclick="remove_answer_row(this);" /></td></tr></table>';
		}
	}
	
	if(side == 'left') {
		document.getElementById('left_container').appendChild(newDiv);
	}
	if(side == 'right') {
		document.getElementById('right_container').appendChild(newDiv);
	}
	
	var leftEl = new Array;
	var rightEl = new Array;
	var left = document.getElementById('left_container').childNodes;
	for(i in left) {
		if(left[i] && left[i].nodeName == 'DIV') {
			leftEl.push(left[i]);
		}
	}
	var right = document.getElementById('right_container').childNodes;
	for(i in right) {
		if(right[i] && right[i].nodeName == 'DIV') {
			rightEl.push(right[i]);
		}
	}
	
	if(leftEl.length > rightEl.length) {
		matchDialog.resizeCanvas(form.images.checked,leftEl.length);
	} else {
		matchDialog.resizeCanvas(form.images.checked,rightEl.length);
	}
	
	matchDialog.setElementFields(leftEl,rightEl,form.images.checked);
	
	matchDialog.remakeConnectionLines(form.images.checked);
	
}

function remove_answer_row(row) {
	
	//var feedbacksButton = document.getElementById('feedbacks_button');
	//if(feedbacksButton != undefined) {
	//	feedbacksButton.parentNode.removeChild(feedbacksButton);
	//}
	
	// remove element
	var div = row.parentNode.parentNode.parentNode.parentNode.parentNode;
	var removedId = div.getAttribute('id');
	div.parentNode.removeChild(div);
	
	// remove feedbacks
	var tempArr = new Array;
	for(idx in tinyMCE.feedback[matchDialog.identifier]) {
		elements = idx.split(' ');
		if(elements[0] != removedId && elements[1] != removedId) {
			tempArr[idx] = tinyMCE.feedback[matchDialog.identifier][idx]
		}
	}
	tinyMCE.feedback[matchDialog.identifier] = tempArr;
	
	// remove element connections
	var connections = $('#middle_container').children();
	connections.each(function(idx) {
		var pair = connections[idx].getAttribute('id');
		elements = pair.split(' ');
		if(elements[0] == removedId || elements[1] == removedId) {
			connections[idx].parentNode.removeChild(connections[idx]);
		}
	});
	
	// rebuild canvas with connections
	var images = document.getElementById('images');
	
	var leftEl = new Array;
	var left = document.getElementById('left_container').childNodes;
	for(i in left) {
		if(left[i] && left[i].nodeName == 'DIV') {
			leftEl.push(left[i]);
		}
	}
	
	var rightEl = new Array;
	var right = document.getElementById('right_container').childNodes;
	for(i in right) {
		if(right[i] && right[i].nodeName == 'DIV') {
			rightEl.push(right[i]);
		}
	}
	
	if(leftEl.length > rightEl.length) {
		matchDialog.resizeCanvas(images.checked,leftEl.length);
	} else {
		matchDialog.resizeCanvas(images.checked,rightEl.length);
	}
	
	matchDialog.setElementFields(leftEl,rightEl,images.checked);
	
	matchDialog.remakeConnectionLines(images.checked);
	
}

function switch_text_images(checkbox) {
	
	form = checkbox;
	while(form.nodeName != 'FORM') {
		form = form.parentNode;
	}
	
	var maxElementCount = 2;
	var leftEl = new Array;
	var rightEl = new Array;
	
	if(checkbox.checked == true) {
		var inputs = document.getElementsByName('answers_left[]');
		maxElementCount = inputs.length;
		for (i in inputs) {
			if(inputs[i].type != undefined) {
				inputs[i].type = 'hidden';
				src = inputs[i].value.split('/');
				src = src[src.length - 1];
				var div = document.createElement('div');
				div.setAttribute('style', 'width: 80px; height: 40px; cursor: pointer; border: 1px solid #b0b0b0;');
				div.setAttribute('onclick', 'tinyMCE.execCommand(\'mceAppendImageToExercise\', false, {src:\'' + src + '\',div:this});');
				div.innerHTML = '<img style="max-height: 40px; max-width: 80px;" src="' + inputs[i].value + '"/>'
				inputs[i].parentNode.appendChild(div);
				leftEl.push(inputs[i]);
			}
		}
		var inputs = document.getElementsByName('answers_right[]');
		if(inputs.length > maxElementCount) {
			maxElementCount = inputs.length;
		}
		for (i in inputs) {
			if(inputs[i].type != undefined) {
				inputs[i].type = 'hidden';
				src = inputs[i].value.split('/');
				src = src[src.length - 1];
				var div = document.createElement('div');
				div.setAttribute('style', 'width: 80px; height: 40px; cursor: pointer; border: 1px solid #b0b0b0;');
				div.setAttribute('onclick', 'tinyMCE.execCommand(\'mceAppendImageToExercise\', false, {src:\'' + src + '\',div:this});');
				div.innerHTML = '<img style="max-height: 40px; max-width: 80px;" src="' + inputs[i].value + '"/>'
				inputs[i].parentNode.appendChild(div);
				rightEl.push(inputs[i]);
			}
		}
	} else {
		var inputs = document.getElementsByName('answers_left[]');
		maxElementCount = inputs.length;
		for (i in inputs) {
			if(inputs[i].type != undefined) {
				inputs[i].type = 'text';
				inputs[i].parentNode.removeChild(inputs[i].nextSibling);
				leftEl.push(inputs[i]);
			}
		}
		var inputs = document.getElementsByName('answers_right[]');
		if(inputs.length > maxElementCount) {
			maxElementCount = inputs.length;
		}
		for (i in inputs) {
			if(inputs[i].type != undefined) {
				inputs[i].type = 'text';
				inputs[i].parentNode.removeChild(inputs[i].nextSibling);
				rightEl.push(inputs[i]);
			}
		}
	}
	
	if(leftEl.length > rightEl.length) {
		matchDialog.resizeCanvas(checkbox.checked,leftEl.length);
	} else {
		matchDialog.resizeCanvas(checkbox.checked,rightEl.length);
	}
	
	matchDialog.setElementFields(leftEl,rightEl,checkbox.checked);
	
	matchDialog.remakeConnectionLines(checkbox.checked);
	
	return true;
	
}

function runFeedbacks() {
	
		var form = document.forms[0];
		var formData = new Array();
		var leftAns = new Array;
		var leftIds = new Array;
		var rightAns = new Array;
		var rightIds = new Array;
		
		var i = 0;
		while(form.elements[i] != undefined) {
			if(form.elements[i].getAttribute('name') == 'images') {
				formData[0] = form.elements[i].checked;
			}
			if(form.elements[i].getAttribute('name') == 'identifier') {
				formData[1] = form.elements[i].value;
			}
			if(form.elements[i].getAttribute('name') == 'answers_left[]') {
				leftAns.push(form.elements[i].value);
			}
			if(form.elements[i].getAttribute('name') == 'ids_left[]') {
				leftIds.push(form.elements[i].value);
			}
			if(form.elements[i].getAttribute('name') == 'answers_right[]') {
				rightAns.push(form.elements[i].value);
			}
			if(form.elements[i].getAttribute('name') == 'ids_right[]') {
				rightIds.push(form.elements[i].value);
			}
			i++;
		}
		
		formData[3] = leftAns;
		formData[4] = leftIds;
		formData[5] = rightAns;
		formData[6] = rightIds;
			
		if(tinyMCE.feedback == undefined) {
			tinyMCE.feedback = new Array;
		}
		if(tinyMCE.feedback[formData[1]] == undefined) {
			tinyMCE.feedback[formData[1]] = new Array;
		}
		
		tinyMCE.execCommand('mceMatchFeedbacks',false,formData);
	
}

function assignSound(row) {
	
	tinyMCE.execCommand('mceAddFeedbackSound', false, {dest: row.previousSibling.previousSibling, src: row.previousSibling.previousSibling.value});
	
}
