tinyMCEPopup.requireLangPack();

var feedbackDialog = {
	windowId : null,
	
	init : function(ed) {
		document.body.setAttribute('onUnload',"tinymce.DOM.remove('mcePopupLayer_'+feedbackDialog.windowId);delete tinymce.EditorManager.activeEditor.windowManager.isFeedbackOpened;");
		document.body.setAttribute('onLoad',"feedbackDialog.windowId = lock(tinyMCEPopup.id);");
		var data = tinyMCEPopup.getWindowArg("data");
		
		$('#identifier').attr('value',data.identifier);
		$('#exerciseid').attr('value',data.exerciseid);
		
		if(data.feedback != undefined && data.feedback != '') {
			$('#feedback_onok').attr('value',data.feedback.onOk);
			$('#feedback_onwrong').attr('value',data.feedback.onWrong);
			//$('#fdb_sound_onok').attr('value',data.feedback.sound.onOk);
			//$('#fdb_sound_onwrong').attr('value',data.feedback.sound.onWrong);
		} 
		//else if(tinyMCE.feedback != undefined && tinyMCE.feedback[data.exerciseid] != undefined) {
			//console.log('znalazlem');
			//console.dir(tinyMCE.feedback);
		/*	$('#feedback_onok').attr('value',tinyMCE.feedback[data.identifier].onOk);
			$('#feedback_onwrong').attr('value',tinyMCE.feedback[data.identifier].onWrong);
			$('#fdb_sound_onok').attr('value',tinyMCE.feedback[data.identifier].onok_sound);
			$('#fdb_sound_onwrong').attr('value',tinyMCE.feedback[data.identifier].onwrong_sound);
			*/
		//}
		tagInsert.init("feedback_onok");
		InputHelper.init($("#feedback_onok"));
		tagInsert.init("feedback_onwrong");
		InputHelper.init($("#feedback_onwrong"));
		$('#feedback_onok').focus();
	},

	prepareFeedback : function(form) {
		var ed = tinymce.EditorManager.activeEditor;
		var formElements = form.elements;
		var identifier = '';
		var exerciseid = '';
		var feedback_onok = '';
		var feedback_onwrong = '';
		var fdb_sound_onok = '';
		var fdb_sound_onwrong = '';

		if(tinyMCE.feedback == undefined) {
			tinyMCE.feedback = new Array();
		}

		for(i in formElements) {
			if(formElements[i].attributes != undefined) {
				if(formElements[i].getAttribute('name') == 'identifier') {
					identifier = formElements[i].getAttribute('value');
				}
				if(formElements[i].getAttribute('name') == 'exerciseid') {
					exerciseid = formElements[i].getAttribute('value');
				}
				if(formElements[i].getAttribute('name') == 'feedback_onok') {
					if (!ed.validateHtml(formElements[i].value, 'feedback')) {
						return false;
					}
					feedback_onok = formElements[i].value;
				}
				if(formElements[i].getAttribute('name') == 'fdb_sound_onok') {
					fdb_sound_onok = formElements[i].value;
				}
				if(formElements[i].getAttribute('name') == 'feedback_onwrong') {
					if (!ed.validateHtml(formElements[i].value, 'feedback')) {
						return false;
					}
					feedback_onwrong = formElements[i].value;
				}
				if(formElements[i].getAttribute('name') == 'fdb_sound_onwrong') {
					fdb_sound_onwrong = formElements[i].value;
				}
			}
		}

		var textFdb = new Object()
		textFdb.onOk = feedback_onok;
		textFdb.onWrong = feedback_onwrong;

		/*var soundFdb = new Object()
		soundFdb.onOk = fdb_sound_onok;
		soundFdb.onWrong = fdb_sound_onwrong;
		*/
		
		if(tinyMCE.feedback[exerciseid] == undefined) {
			tinyMCE.feedback[exerciseid] = {text: new Object(), sound: new Object()};
		}
		
		tinyMCE.feedback[exerciseid].text[identifier] = textFdb;
		//tinyMCE.feedback[exerciseid].sound[identifier] = soundFdb;
		tinyMCEPopup.close();
		return true;
		
	}

};

tinyMCEPopup.onInit.add(feedbackDialog.init, feedbackDialog);

