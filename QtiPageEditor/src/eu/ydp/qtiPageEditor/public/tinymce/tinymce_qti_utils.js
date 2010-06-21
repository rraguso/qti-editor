function actionOnQTI(e) {

	//console.log(tinymce.EditorManager.activeEditor.dom.doc.body.innerHTML);

	if ((e.type == 'click' && e.button == 0) || (e.type == 'keypress' && e.keyCode == '113')) {
		
		var ed = tinymce.EditorManager.activeEditor;
		
		//QY Comments
		if (ed.selection.getNode().nodeName == 'DIV' && ed.selection.getNode().getAttribute('class') == 'mceNonEditable qy_comment') {
			
			var comment_content = ed.selection.getNode().innerHTML;
			var idref = ed.selection.getNode().getAttribute('id');
			idref = idref.replace(/^ref_([0-9]+)/i, '$1');
			var commented_text = ed.selection.getNode().nextSibling;
			if(commented_text.nodeName != 'SPAN' || commented_text.id != idref) {
				for(i in commented_text.children) {
					if(commented_text.children[i].nodeName == 'SPAN' && commented_text.children[i].id == idref) {
						commented_text = commented_text.children[i];
						break;
					}
				}
			}
			commented_text = commented_text.innerHTML;
			tinyMCE.execCommand('mceComment', false, {comment_content: comment_content, comment_id: idref, commented_text: commented_text});
			
		}
		
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
			var body = ed.selection.dom.doc.body.innerHTML;
			
			rg = new RegExp('<modalFeedback[^>]*outcomeIdentifier="' + id + '"[^>]*showHide="show"[^>]*>([^<]*)<\/modalFeedback>','gi');
			var onok = rg.exec(body);
			if(onok != undefined) {
				var oo = onok[1];
			} else {
				var oo = '';
			}
			
			rg = new RegExp('<modalFeedback[^>]*outcomeIdentifier="' + id + '"[^>]*showHide="hide"[^>]*>([^<]*)<\/modalFeedback>','gi');
			var onwrong = rg.exec(body);
			if(onwrong != undefined) {
				var ow = onwrong[1];
			} else {
				var ow = '';
			}
			
			var gapdata = {value: ed.selection.getNode().innerHTML, id: id, onok: oo, onwrong: ow};
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
			
			var body = ed.selection.dom.doc.body.innerHTML;
			
			rg = new RegExp('<modalFeedback[^>]*senderIdentifier="' + identifier[1] + '"[^>]*identifier="([^"]*)"[^>]*>([^<]*)<\/modalFeedback>','gi');
			var fdArr = body.match(rg);
			if(fdArr != undefined) {
				var fd = new Array;
				for (i in fdArr) {
					rg = new RegExp('<modalFeedback[^>]*senderIdentifier="' + identifier[1] + '"[^>]*identifier="([^"]*)"[^>]*>([^<]*)<\/modalFeedback>','i');
					var arr = rg.exec(fdArr[i]);
					fd[arr[1]] = arr[2]
				}
				data.push(fd);
			} 
			
			tinyMCE.execCommand('mceInlineChoice', false, data);
		}
		
		// Choice
		if ((ed.selection.getNode().nodeName == 'P' && ed.selection.getNode().id == 'choiceInteraction' && ed.selection.getNode().parentNode.id == 'choiceInteraction') || (ed.selection.getNode().nodeName == 'DIV' && ed.selection.getNode().id == 'choiceInteraction')) {
			
			var answers = new Array();
			var points = new Array();
			var ids = new Array();
			var fixed = new Array();
			var fdb = new Array();
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
			var answers_paragraph = choiceSectionHTML.match(/<!-- <simpleChoice identifier="[^"]*"[^>]*>([^<]*|<img[^>]*>)(?:<feedbackInline[^>]*>[^<]*<\/feedbackInline>)?<\/simpleChoice> --><br[^>]*><input id="choiceInteraction" name="simpleChoice" (checked="checked" )?type="checkbox">(<img[^>]*>|[^<]*)/gi);
			var values = new Array();
			for (ans in answers_paragraph) {
				values.push(answers_paragraph[ans].match(/<!-- <simpleChoice identifier="([^"]*)"\s*(?:fixed="([^"]*)")?[^>]*>(?:[^<]*|<img[^>]*>)(?:<feedbackInline[^>]*>([^<]*)<\/feedbackInline>)?<\/simpleChoice> --><br[^>]*><input id="choiceInteraction" name="simpleChoice" (checked="checked" )?type="checkbox">(<img[^>]*>|[^<]*)/i));
			}
			var i=0;
			while(values[i] != undefined) {
				ids.push(values[i][1]);
				answers.push(values[i][5]);
				if(values[i][4] == 'checked="checked" ') {
					points.push('1');
				} else {
					points.push('0');
				}
				fixed.push(values[i][2]);
				fdb.push(values[i][3]);
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
			data.push(fdb);
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
			var answers_paragraph = orderSectionHTML.match(/<!-- <simpleChoice identifier="[^"]*"[^>]*>([^<]*|<img[^>]*>)(?=<feedbackInline[^>]*>[^<]*<\/feedbackInline>)?<\/simpleChoice> -->(?:<\/p>)?<div id="orderOption" name="([0-9]+)"[^>]*>(<img[^>]*>|[^<]*)<\/div>/gi);
			var values = new Array();
			for (ans in answers_paragraph) {
				values.push();
				if(answers_paragraph[ans].match(/<feedbackInline[^>]*>[^<]*<\/feedbackInline>/i)) {
					if(tinyMCE.feedback == undefined) {
						tinyMCE.feedback = new Array;
					}
					var fd = answers_paragraph[ans].match(/<feedbackInline[^>]*identifier="([^"]*)"[^>]*>([^<]*)<\/feedbackInline>/i)
					tinyMCE.feedback[fd[0]] = fd[1];
				}
			}
			var i=0;
			while(values[i] != undefined) {
				var point = values[i][3];
				points.push(point);
				point--;
				ids[point] = values[i][1];
				answers[point] = values[i][4];
				fixed[point] = values[i][2];
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
		if (ed.selection.getNode().id != undefined && (ed.selection.getNode().id == 'matchInteraction' || ed.selection.getNode().id.match(/canvas_/))) {
			
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
			
			//var leftSet = $('matchInteraction[responseIdentifier=\'' + identifier[1] + '\'] > simpleMatchSet:first').children();
			//var rightSet = $('matchInteraction[responseIdentifier=\'' + identifier[1] + '\'] > simpleMatchSet:last').children();
			
			var sets = sectionDiv.children[1].children[0].children[0].children;
			var leftSet = sets[0].children[0].children[0].children;
			var rightSet = sets[2].children[0].children[0].children;
			
			var leftSetAnswers = new Array;
			var leftSetIds = new Array;
			var leftSetFixed = new Array;
			var rightSetAnswers = new Array;
			var rightSetIds = new Array;
			var rightSetFixed = new Array;
			var responsePairs = new Array;
			
			for (el in leftSet) {
				if(leftSet[el].children != undefined) {
					leftSetAnswers.push(leftSet[el].children[0].children[2].innerHTML);
					leftSetIds.push(leftSet[el].children[0].children[0].innerHTML);
					leftSetFixed.push(leftSet[el].children[0].children[1].innerHTML);
				}
			}
			
			for (el in rightSet) {
				if(rightSet[el].children != undefined) {
					rightSetAnswers.push(rightSet[el].children[0].children[2].innerHTML);
					rightSetIds.push(rightSet[el].children[0].children[0].innerHTML);
					rightSetFixed.push(rightSet[el].children[0].children[1].innerHTML);
				}
			}
			
			var tinybody = ed.selection.getNode();
			while(tinybody.nodeName != 'BODY') {
				tinybody = tinybody.parentNode;
			}
			
			tinybody = tinybody.innerHTML;	
			var rg = new RegExp('<!-- <responseDeclaration identifier="' + identifier[1] + '" [^>]*>[^<]*<correctResponse>[^<]*((?:<value>[^<]*<\/value>[^<]*)*)[^<]*<\/correctResponse>','gi');
			var valuesStr = rg.exec(tinybody);
			valuesArr = valuesStr[1].match(/<value>([^<]*)<\/value>/gi);
			
			for (i in valuesArr) {
				responsePairs.push(valuesArr[i].match(/<value>([^<]*)<\/value>/i)[1]);
			}
			
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
			
			var body = ed.selection.dom.doc.body.innerHTML;
			
			rg = new RegExp('<modalFeedback[^>]*senderIdentifier="' + identifier[1] + '"[^>]*identifier="([^"]*)"[^>]*>([^<]*)<\/modalFeedback>','gi');
			var fdArr = body.match(rg);
			if(fdArr != undefined) {
				var fd = new Array;
				for (i in fdArr) {
					rg = new RegExp('<modalFeedback[^>]*senderIdentifier="' + identifier[1] + '"[^>]*identifier="([^"]*)"[^>]*>([^<]*)<\/modalFeedback>','i');
					var arr = rg.exec(fdArr[i]);
					fd[arr[1]] = arr[2]
				}
				data.push(fd);
			} 
			
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
