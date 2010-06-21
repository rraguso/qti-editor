tinyMCEPopup.requireLangPack();

var feedbackDialog = {
	
	init : function(ed) {
		
		var data = tinyMCEPopup.getWindowArg("data");
		document.getElementById('identifier').setAttribute('value',data.identifier);
		if(data.feedback != undefined && data.feedback != '') {
			document.getElementById('feedback_onok').setAttribute('value',data.feedback.onok);
			document.getElementById('feedback_onwrong').setAttribute('value',data.feedback.onwrong);
		} else if(tinyMCE.feedback != undefined && tinyMCE.feedback[data.identifier] != undefined) {
			document.getElementById('feedback_onok').setAttribute('value',tinyMCE.feedback[data.identifier].onok);
			document.getElementById('feedback_onwrong').setAttribute('value',tinyMCE.feedback[data.identifier].onwrong);
		}
		
	},

	prepareFeedback : function(form) {
		
		var formElements = form.elements;
		var identifier = '';
		var feedback_onok = '';
		var feedback_onwrong = '';
		
		if(tinyMCE.feedback == undefined) {
			tinyMCE.feedback = new Array;
		}
		
		for(i in formElements) {
			if(formElements[i].attributes != undefined) {
				if(formElements[i].getAttribute('name') == 'identifier') {
					identifier = formElements[i].getAttribute('value');
				}
				if(formElements[i].getAttribute('name') == 'feedback_onok') {
					feedback_onok = formElements[i].value;
				}
				if(formElements[i].getAttribute('name') == 'feedback_onwrong') {
					feedback_onwrong = formElements[i].value;
				}
				tinyMCE.feedback[identifier] = {};
				tinyMCE.feedback[identifier].onok = feedback_onok;
				tinyMCE.feedback[identifier].onwrong = feedback_onwrong;
			}
		}
		
		tinyMCEPopup.close();
		return true;
		
	}

};

tinyMCEPopup.onInit.add(feedbackDialog.init, feedbackDialog);
