function feedback(row) {
	
	var fieldset = row.parentNode.parentNode.parentNode.parentNode.parentNode;
	var inputs = fieldset.getElementsByTagName('input');
	for(i in inputs) {
		if(inputs[i].attributes != undefined && inputs[i].getAttribute('id') == 'identifier') {
			var identifier = inputs[i].getAttribute('value');
			break;
		}
	}
	if(identifier != undefined) {
		if(tinyMCE.feedback != undefined && tinyMCE.feedback[identifier] != undefined) {
			tinyMCE.execCommand('mceFeedbackGap', false, {identifier: identifier, feedback: tinyMCE.feedback[identifier]});
		} else {
			tinyMCE.execCommand('mceFeedbackGap', false, {identifier: identifier});
		}
	}
	
}
