tinyMCEPopup.requireLangPack();

var feedbackDialog = {
	
	init : function(ed) {
		
		var data = tinyMCEPopup.getWindowArg("data");
		document.getElementById('identifier').setAttribute('value',data.identifier);
		if(data.feedback != undefined && data.feedback != '') {
			document.getElementById('feedback').setAttribute('value',data.feedback);
		} else if(tinyMCE.feedback != undefined && tinyMCE.feedback[data.identifier] != undefined) {
			document.getElementById('feedback').setAttribute('value',tinyMCE.feedback[data.identifier]);
		}
		
	},

	prepareFeedback : function(form) {
		
		var formElements = form.elements;
		var identifier = '';
		var feedback = '';
		
		if(tinyMCE.feedback == undefined) {
			tinyMCE.feedback = new Array;
		}
		
		for(i in formElements) {
			if(formElements[i].attributes != undefined) {
				if(formElements[i].getAttribute('name') == 'identifier') {
					identifier = formElements[i].getAttribute('value');
				}
				if(formElements[i].getAttribute('name') == 'feedback') {
					feedback = formElements[i].value;
				}
				tinyMCE.feedback[identifier] = feedback;
			}
		}
		
		tinyMCEPopup.close();
		return true;
		
	}

};

tinyMCEPopup.onInit.add(feedbackDialog.init, feedbackDialog);

