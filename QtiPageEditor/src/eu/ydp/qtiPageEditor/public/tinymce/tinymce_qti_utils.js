function actionOnQTI(e) {

	//console.log(tinymce.EditorManager.activeEditor.dom.doc.body.innerHTML);

	if ((e.type == 'click' && e.button == 0) || (e.type == 'keypress' && e.keyCode == '113')) {
		
		var ed = tinymce.EditorManager.activeEditor;
		
		//Imglib
		if(ed.selection.getNode().nodeName == 'IMG') {
			var src = ed.selection.getNode().attributes['src'].value;
			src = src.split('/');
			src = src[src.length - 1];
			tinyMCE.execCommand('mceImglib', false, src);
		}
		
		//Gap
		if (ed.selection.getNode().nodeName == 'SPAN' && ed.selection.getNode().id == 'gap') {
			var id = ed.selection.getNode().previousSibling.data;
			rg = new RegExp('<gap identifier="([^"]*)"[^>]*>',"gi");
			id = rg.exec(id);
			if(id[1] && id[1] != undefined && id[1] != '') {
				id = id[1];
			} else {
				id = '';
			}
			var gapdata = {value: ed.selection.getNode().innerHTML, id: id};
			tinyMCE.execCommand('mceGap', false, gapdata);
		}
		
		//Inline choice
		if (ed.selection.getNode().id == 'inlineChoiceInteraction' || ed.selection.getNode().id == 'inlineChoiceAnswer' || ed.selection.getNode().parentNode.id == 'inlineChoiceAnswer') {
			
			var answers = new Array();
			var points = new Array();
			var ids = new Array();
			var fixed = new Array();
			var data = new Array();
			
			var inlineChoiceSpan = ed.selection.getNode();
			while(inlineChoiceSpan.id != 'inlineChoiceInteraction') {
				inlineChoiceSpan = inlineChoiceSpan.parentNode;
			}
			var choiceSectionHTML = inlineChoiceSpan.innerHTML;
			if(inlineChoiceSpan.previousSibling.nodeName == "P") {
				var identifier = inlineChoiceSpan.previousSibling.innerHTML.match(/<inlineChoiceInteraction responseIdentifier="([^"]+)"[^>]*>/i);
				var shuffle = inlineChoiceSpan.previousSibling.innerHTML.match(/<inlineChoiceInteraction.*?shuffle="([^"]*)"[^>]*>/i);
			} else {
				var identifier = inlineChoiceSpan.previousSibling.data.match(/<inlineChoiceInteraction responseIdentifier="([^"]+)"[^>]*>/i);
				var shuffle = inlineChoiceSpan.previousSibling.data.match(/<inlineChoiceInteraction.*?shuffle="([^"]*)"[^>]*>/i);
			}
			var answers_paragraph = choiceSectionHTML.match(/<!-- <inlineChoice identifier="[^"]*"[^>]*>[^<]*<\/inlineChoice> --><span id="inlineChoiceAnswer" style="[^"]*"[^>]*>([^<]*)(<span[^>]*>[^<]*<\/span>)?<\/span>/gi);
			var values = new Array();
			for (ans in answers_paragraph) {
				values.push(answers_paragraph[ans].match(/<!-- <inlineChoice identifier="([^"]*)"\s*(?:fixed="([^"]*)")?[^>]*>[^<]*<\/inlineChoice> --><span id="inlineChoiceAnswer" style="[^"]*"[^>]*>([^<]*)(<span[^>]*>[^<]*<\/span>)?<\/span>/i));
			}
			var i=0;
			while(values[i] != undefined) {
				ids.push(values[i][1]);
				answers.push(values[i][3]);
				if(values[i][4] != undefined) {
					points.push(1);
				} else {
					points.push(0);
				}
				if(values[i][2] == 'true') {
					fixed.push('true');
				} else {
					fixed.push('false');
				}
				i++;
			}
			
			data.push('');
			data.push(answers);
			data.push(points);
			data.push(ids);
			data.push(identifier[1]);
			data.push(shuffle[1]);
			data.push(fixed);
			
			tinyMCE.execCommand('mceInlineChoice', false, data);
		}
		
		// Choice
		if ((ed.selection.getNode().nodeName == 'P' && ed.selection.getNode().id == 'choiceInteraction' && ed.selection.getNode().parentNode.id == 'choiceInteraction') || (ed.selection.getNode().nodeName == 'DIV' && ed.selection.getNode().id == 'choiceInteraction')) {
			
			var answers = new Array();
			var points = new Array();
			var ids = new Array();
			var fixed = new Array();
			var data = new Array();
			
			var sectionDiv = ed.selection.getNode();
			while(sectionDiv.nodeName != 'DIV') {
				sectionDiv = sectionDiv.parentNode;
			}
			var choiceSectionHTML = sectionDiv.innerHTML;
			var question = choiceSectionHTML.match(/<p id="choiceInteraction">([^<]*)<\/p>/i);
			if(sectionDiv.previousSibling.nodeName == "P") {
				var identifier = sectionDiv.previousSibling.innerHTML.match(/<choiceInteraction responseIdentifier="([^"]+)"[^>]*>/i);
				var shuffle = sectionDiv.previousSibling.innerHTML.match(/<choiceInteraction.*?shuffle="([^"]*)"[^>]*>/i);
				var maxChoices = sectionDiv.previousSibling.innerHTML.match(/<choiceInteraction.*?maxChoices="([^"]*)"[^>]*>/i);
			} else {
				var identifier = sectionDiv.previousSibling.data.match(/<choiceInteraction responseIdentifier="([^"]+)"[^>]*>/i);
				var shuffle = sectionDiv.previousSibling.data.match(/<choiceInteraction.*?shuffle="([^"]*)"[^>]*>/i);
				var maxChoices = sectionDiv.previousSibling.data.match(/<choiceInteraction.*?maxChoices="([^"]*)"[^>]*>/i);
			}
			var answers_paragraph = choiceSectionHTML.match(/<!-- <simpleChoice identifier="[^"]*"[^>]*>([^<]*|<img[^>]*>)<\/simpleChoice> --><br[^>]*><input id="choiceInteraction" name="simpleChoice" (checked="checked" )?type="checkbox">(<img[^>]*>|[^<]*)/gi);
			var values = new Array();
			for (ans in answers_paragraph) {
				values.push(answers_paragraph[ans].match(/<!-- <simpleChoice identifier="([^"]*)"\s*(?:fixed="([^"]*)")?[^>]*>(?:[^<]*|<img[^>]*>)<\/simpleChoice> --><br[^>]*><input id="choiceInteraction" name="simpleChoice" (checked="checked" )?type="checkbox">(<img[^>]*>|[^<]*)/i));
			}
			var i=0;
			while(values[i] != undefined) {
				ids.push(values[i][1]);
				answers.push(values[i][4]);
				if(values[i][3] == 'checked="checked" ') {
					points.push('1');
				} else {
					points.push('0');
				}
				fixed.push(values[i][2]);
				i++;
			}
			data.push(question[1]);
			data.push(answers);
			data.push(points);
			data.push(ids);
			data.push(identifier[1]);
			data.push(shuffle[1]);
			data.push(fixed);
			data.push(maxChoices[1]);
			tinyMCE.execCommand('mceChoice', false, data);
		}
		
		// Order
		if (ed.selection.getNode().id == 'orderOption' || (ed.selection.getNode().id == 'choiceInteraction' && ed.selection.getNode().parentNode.id == 'orderInteraction')) {
			
			var answers = new Array();
			var points = new Array();
			var ids = new Array();
			var fixed = new Array();
			var data = new Array();
			
			var sectionDiv = ed.selection.getNode();
			while(sectionDiv.nodeName != 'DIV' || sectionDiv.id != 'orderInteraction') {
				sectionDiv = sectionDiv.parentNode;
			}
			
			var orderSectionHTML = sectionDiv.innerHTML;
			var question = orderSectionHTML.match(/<p id="choiceInteraction">([^<]*)<\/p>/i);
			if(sectionDiv.previousSibling.nodeName == "P") {
				var identifier = sectionDiv.previousSibling.innerHTML.match(/<orderInteraction responseIdentifier="([^"]+)"[^>]*>/i);
				var shuffle = sectionDiv.previousSibling.innerHTML.match(/<orderInteraction.*?shuffle="([^"]*)"[^>]*>/i);
			} else {
				var identifier = sectionDiv.previousSibling.data.match(/<orderInteraction responseIdentifier="([^"]+)"[^>]*>/i);
				var shuffle = sectionDiv.previousSibling.data.match(/<orderInteraction.*?shuffle="([^"]*)"[^>]*>/i);
			}
			var answers_paragraph = orderSectionHTML.match(/<!-- <simpleChoice identifier="[^"]*"[^>]*>([^<]*|<img[^>]*>)<\/simpleChoice> -->(?:<\/p>)?<div id="orderOption" name="([0-9]+)"[^>]*>(<img[^>]*>|[^<]*)<\/div>/gi);
			var values = new Array();
			for (ans in answers_paragraph) {
				values.push(answers_paragraph[ans].match(/<!-- <simpleChoice identifier="([^"]*)"\s*(?:fixed="([^"]*)")?[^>]*>(?:[^<]*|<img[^>]*>)<\/simpleChoice> -->(?:<\/p>)?<div id="orderOption" name="([0-9]+)"[^>]*>(<img[^>]*>|[^<]*)<\/div>/i));
			}
			var i=0;
			while(values[i] != undefined) {
				ids.push(values[i][1]);
				answers.push(values[i][4]);
				points.push(values[i][3]);
				fixed.push(values[i][2]);
				i++;
			}
			data.push(question[1]);
			data.push(answers);
			data.push(points);
			data.push(ids);
			data.push(identifier[1]);
			data.push(shuffle[1]);
			data.push(fixed);
			tinyMCE.execCommand('mceOrder', false, data);
		}
		
		// Match
		if (ed.selection.getNode().id == 'matchInteraction') {
			
			var answers = new Array();
			var points = new Array();
			var ids = new Array();
			var fixed = new Array();
			var data = new Array();
			
			var sectionDiv = ed.selection.getNode();
			while(sectionDiv.nodeName != 'DIV' || sectionDiv.id != 'matchInteraction') {
				sectionDiv = sectionDiv.parentNode;
			}
			
			var matchSectionHTML = sectionDiv.innerHTML;
			var question = matchSectionHTML.match(/<p id="matchInteraction">([^<]*)<\/p>/i);
			
			var identifier = sectionDiv.previousSibling.data.match(/<matchInteraction responseIdentifier="([^"]+)"[^>]*>/i);
			var shuffle = sectionDiv.previousSibling.data.match(/<matchInteraction.*?shuffle="([^"]*)"[^>]*>/i);
			
			var leftSet = $('matchInteraction[responseIdentifier=\'' + identifier[1] + '\'] > simpleMatchSet:first').children();
			var rightSet = $('matchInteraction[responseIdentifier=\'' + identifier[1] + '\'] > simpleMatchSet:last').children();
			
			var leftSetAnswers = new Array;
			var leftSetIds = new Array;
			var leftSetFixed = new Array;
			var rightSetAnswers = new Array;
			var rightSetIds = new Array;
			var rightSetFixed = new Array;
			var responsePairs = new Array;
			
			leftSet.each(function getLeftSetEl(el) {
				leftSetAnswers.push(leftSet[el].innerHTML);
				leftSetIds.push(leftSet[el].getAttribute('identifier'));
				leftSetFixed.push(leftSet[el].getAttribute('fixed'));
			});
			rightSet.each(function getRightSetEl(el) {
				rightSetAnswers.push(rightSet[el].innerHTML);
				rightSetIds.push(rightSet[el].getAttribute('identifier'));
				rightSetFixed.push(rightSet[el].getAttribute('fixed'));
			});
			
			var responseDeclaration = $('responseDeclaration[identifier=\'' + identifier[1] + '\'] > correctResponse').children();
			
			responseDeclaration.each(function getPair(i) {
				responsePairs.push(responseDeclaration[i].innerHTML);
			});
			
			data.push(question[1]);
			data.push(identifier[1]);
			data.push(shuffle[1]);
			data.push(leftSetAnswers);
			data.push(leftSetIds);
			data.push(rightSetAnswers);
			data.push(rightSetIds);
			data.push(leftSetFixed);
			data.push(rightSetFixed);
			data.push(responsePairs);
			
			tinyMCE.execCommand('mceMatch', false, data);
		}
	}
	return true;
	
}

function cutQTI(content) {
	
	content = content.replace(/<!-- \?(xml[^\?]*)\? -->/gi,'');
	
	content = content.replace(/<!-- (<assessmentItem [^>]*>) -->/gi,'');
	content = content.replace(/<!-- (<\/assessmentItem>) -->/gi,'');
	
	content = content.replace(/<!-- (<responseDeclaration[^>]*>)/gi,'');
	content = content.replace(/(<\/responseDeclaration>) -->/gi,'');
	
	content = content.replace(/<!-- (<itemBody>) -->/gi,'');
	content = content.replace(/<!-- (<\/itemBody>) -->/gi,'');
	
	content = content.replace(/<!-- (<gap[^>]*>[^<]*<\/gap>) --><span id="gap" class="mceNonEditable"[^>]*>([^<]*)<\/span>/gi, '');
	
	content = content.replace(/(?:<p>)?<!-- (<choiceInteraction[^>]*>) -->(?:<\/p>)?<div id="choiceInteraction" class="mceNonEditable"[^>]*>/gi, '');
	content = content.replace(/<p id="choiceInteraction">([^<]*)<\/p><p id="choiceInteraction">/gi, '');
	content = content.replace(/<!-- (<simpleChoice[^>]*>([^<]*|[^<]*<img[^>]*>[^<]*)<\/simpleChoice>) --><br[^>]*><input id="choiceInteraction" [^>]*>(<img[^>]*>|[^<]*)/gi,'');
	content = content.replace(/<\/p><\/div><!-- end of choiceInteraction -->/gi,'');
	
	content = content.replace(/(?:<p>)?<!-- (<inlineChoiceInteraction[^>]*>) -->(?:<\/p>)?<span id="inlineChoiceInteraction" class="mceNonEditable"[^>]*>/gi, '');
	content = content.replace(/<!-- (<inlineChoice[^>]*>[^<]*<\/inlineChoice>) --><span id="inlineChoiceAnswer"[^>]*>[^<]*(?:<span[^>]*>[^<]*<\/span>)?<\/span>/gi,'');
	content = content.replace(/<\/span>[^<]*(?:<\/p>)?[^<]*<!-- end of inlineChoiceInteraction -->/gi,'');
	
	return content;
	
}
