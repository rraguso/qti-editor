var baseTags = new Array('p','div','table','tbody','td','tr','th', 'sub', 'sup', 'span', 'strong', 'em', 'ul', 'li');
baseTags.sort();

function qti2htmlParse(tree) {
	var text = qti2htmlParseProcess(tree);
	return text;
}
function qti2htmlParseProcess(tree) {
	var text = '';
	var ed = tinymce.EditorManager.activeEditor;
	var xh = ed.XmlHelper;
	var processAsText = false;
	if (tree.nodeType == 1) {
		if ('ASSESSMENTITEM' == tree.tagName) {
			text += '<!-- '+xh.prepareNodeBegin(tree)+' -->';
		} else if ('STYLEDECLARATION' == tree.tagName) {
			text += '<!-- '+xh.prepareNodeBegin(tree);
		} else if ('LINK' == tree.tagName) {
			text += xh.prepareEmptyNode(tree);
		} else if ('RESPONSEDECLARATION' == tree.tagName) {
			text += '<!-- '+xh.prepareNodeBegin(tree);
		} else if ('CORRECTRESPONSE' == tree.tagName) {
			text += xh.prepareNodeBegin(tree);
		} else if ('VALUE' == tree.tagName) {
			text += xh.prepareNodeBegin(tree);
		} else if ('ITEMBODY' == tree.tagName) {
			text += '<!-- '+xh.prepareNodeBegin(tree)+' -->';
		} else if ('CHOICEINTERACTION' == tree.tagName) {
			text += choiceInteractionToHTML(tree);
		} else if ('SELECTIONINTERACTION' == tree.tagName) {
			text += selectionInteractionToHTML(tree);
		} else if ('TEXTINTERACTION' == tree.tagName) {
			text += textInteractionsGroupToHTML(tree);
		} else if ('MATHTEXT' == tree.tagName) {
			text += mathInteractionToHTML(tree);
			return text;
		} else if ('IMG' == tree.tagName || 'OBJECT' == tree.tagName) {
			text += mediaInteractionsToHTML(tree);
		} else if ('SIMPLETEXT' == tree.tagName) {
			text += xh.prepareNodeBegin(tree);
			if ($.trim(tree.textContent) == ''){
				text += '';
			}
		} else if ('GROUP' == tree.tagName) {
			text += xh.prepareNodeBegin(tree);
		} else if ('MATHTEXT' == tree.tagName) {
			processAsText = true;
		} else if ('BR' == tree.tagName && 1 == tree.getAttribute('mce_bogus')) {
			text += xh.prepareEmptyNode(tree);
		} else if (-1 != baseTags.indexOf(tree.tagName.toLowerCase())) {
        	
			if ('TD' == tree.tagName) {
				
				if ('SIMPLETEXT' == tree.firstElementChild.tagName || 'DIV' == tree.firstElementChild.tagName) {
					tree.innerHTML = tree.firstElementChild.innerHTML;
				}
        	}
			
			text += xh.prepareNodeBegin(tree); //'<'+tree.tagName.toLowerCase()+xh.prepareAttributes(tree)+'>';
		}
	}
	if(tree.hasChildNodes()  &&  !processAsText) {
		var nodes=tree.childNodes.length;
		for(var i=0; i<tree.childNodes.length; i++) {
			text += qti2htmlParseProcess(tree.childNodes[i]);
		}

	} else {

		if (tree.nodeType == 3) {
			text += ed.dom.encode(tree.nodeValue);
			//console.log(tree.nodeValue);
			//console.dir(tree);
			//text += tree.nodeValue;
		} else if (processAsText){
			text += "<"+tree.tagName+">"+tree.innerHTML+"</"+tree.tagName+">";
		}
	}
	if (tree.nodeType == 1) {
		if ('ASSESSMENTITEM' == tree.tagName) {
			text += '<!-- '+xh.prepareNodeEnd(tree)+' -->';
		} else if ('STYLEDECLARATION' == tree.tagName) {
			text += xh.prepareNodeEnd(tree)+' -->';
		} else if ('RESPONSEDECLARATION' == tree.tagName) {
			text += xh.prepareNodeEnd(tree)+' -->';
		} else if ('CORRECTRESPONSE' == tree.tagName) {
			text += xh.prepareNodeEnd(tree);
		} else if ('VALUE' == tree.tagName) {
			text += xh.prepareNodeEnd(tree);
		} else if ('ITEMBODY' == tree.tagName) {
			text += '<!-- '+xh.prepareNodeEnd(tree)+' -->';
		} else if ('SIMPLETEXT' == tree.tagName) {
			text += xh.prepareNodeEnd(tree);
		} else if ('GROUP' == tree.tagName) {
			text += xh.prepareNodeEnd(tree);
		} else if (-1 != baseTags.indexOf(tree.tagName.toLowerCase())) {
			text += '</'+tree.tagName.toLowerCase()+'>';
		}
	}
	return text;
}
function html2qtiParse(tree) {
	var text = html2qtiParseProcess(tree);
	text = subsup2mathml(text, false);
	return text
}
function html2qtiParseProcess(tree) {
    var text = '';
    var ed = tinymce.EditorManager.activeEditor;
    var xh = ed.XmlHelper;
    if (tree.nodeType == 1) {
            if ('ASSESSMENTITEM' == tree.tagName) {
            	text += xh.prepareNodeBegin(tree);
            } else if ('STYLEDECLARATION' == tree.tagName) {
                    text += xh.prepareNodeBegin(tree);
            } else if ('LINK' == tree.tagName) {
                    text += xh.prepareEmptyNode(tree);
            } else if ('RESPONSEDECLARATION' == tree.tagName) {
                    text += xh.prepareNodeBegin(tree);
            } else if ('CORRECTRESPONSE' == tree.tagName) {
                    text += xh.prepareNodeBegin(tree);
            } else if ('VALUE' == tree.tagName) {
                    text += xh.prepareNodeBegin(tree);
			} else if ('ITEMBODY' == tree.tagName) {
					text += xh.prepareNodeBegin(tree);
            } else if ('FIELDSET' == tree.tagName && tree.getAttribute('id') == 'runFileUploadLib') {
                text += mediaInteractionToQTI(tree);
                return text;
            } else if ('DIV' == tree.tagName && tree.getAttribute('id') == 'mathML') {
                text += mathInteractionToQTI(tree);
                return text;
            } else if ('DIV' == tree.tagName) {
                text += xh.prepareNodeBegin(tree);
            } else if ('P' == tree.tagName) {
                text += '<section name="text">'+xh.prepareNodeBegin(tree);
                if ($.trim(tree.textContent) == '') {
                	text += '&#160;';
                }
            } else if (-1 != baseTags.indexOf(tree.tagName.toLowerCase())) {
            	text += '<'+tree.tagName.toLowerCase()+xh.prepareAttributes(tree)+'>';
            	
            	if ('TD' == tree.tagName) {
            		if (null != tree.innerHTML.match(/<fieldset id="runFileUploadLib"/)) {
            			text += '<div>';
            		} else {
            			text += '<simpleText>';
            		}
            	}
            }
    }

    if(tree.hasChildNodes()) {
            var nodes=tree.childNodes.length;
            for(var i=0; i<tree.childNodes.length; i++) {
            	if (8 == tree.childNodes[i].nodeType) {

            		if ('<textInteraction>' == $.trim(tree.childNodes[i].nodeValue)) {
            			text += textInteractionsGroupToQTI(tree.childNodes[i]);
            			i += 2;
            		} else if ('<selectionInteraction' == $.trim(tree.childNodes[i].nodeValue).substr(0, 21)){
            			text += selectionInteractionToQTI(tree.childNodes[i]);
            			i += 2;
            		} else if ('<choiceInteraction' == $.trim(tree.childNodes[i].nodeValue).substr(0, 18)){
            			text += choiceInteractionToQTI(tree.childNodes[i]);
            			i += 2;
            		} else {
            			var node = $(tree.childNodes[i].nodeValue).get(0);

            			if (null != node) {
            				text += html2qtiParseProcess(node);
            			} else {

            				if (tree.childNodes[i].nodeValue.match(/\?(xml[^\?]*)\?/gi)) {
            					text += tree.childNodes[i].nodeValue.replace(/\?(xml[^\?]*)\?/gi,'<?$1?>');
            				} else {
            					text += $.trim(tree.childNodes[i].nodeValue);
            				}
            			}
            		}
            	} else {
            		text += html2qtiParseProcess(tree.childNodes[i]);
            	}
            }

    } else {

    	if (tree.nodeType == 3) {
    		//text += ed.dom.encode(tree.nodeValue);

    		if (undefined != tree.parentNode && tree.parentNode.nodeName == 'VALUE') {
    				text += ed.dom.encode(tree.nodeValue);
    		} else {
    			text += ed.dom.encode(tree.nodeValue);
    		}
    	}
    }

    if (tree.nodeType == 1) {
    	if ('STYLEDECLARATION' == tree.tagName) {
    		text += xh.prepareNodeEnd(tree);
    	} else if ('RESPONSEDECLARATION' == tree.tagName) {
    		text += xh.prepareNodeEnd(tree);
    	} else if ('CORRECTRESPONSE' == tree.tagName) {
    		text += xh.prepareNodeEnd(tree);
    	} else if ('VALUE' == tree.tagName) {
    		text += xh.prepareNodeEnd(tree);
    	} else if ('DIV' == tree.tagName) {
            text += xh.prepareNodeEnd(tree);
        } else if ('P' == tree.tagName) {
            text += xh.prepareNodeEnd(tree)+'</section>';
    	} else if (-1 != baseTags.indexOf(tree.tagName.toLowerCase())) {
    		if ('TD' == tree.tagName) {
	    		if (null != tree.innerHTML.match(/<fieldset id="runFileUploadLib"/)) {
	    			text += '</div>';
	    		} else {
	    			text += '</simpleText>';
	    		}
    		}
    		/*if ('TD' == tree.tagName) {
        		text += '</simpleText>';
        	}*/
   			text += '</'+tree.tagName.toLowerCase()+'>';
    	}
    } 

    return text;
}

function mathInteractionToQTI(mi) {
	var text = '';
//	text += '<mathText>';
	var math = mi.innerHTML;
	text = parseMathHTML2QTI(math);
	//text += math;
	//text += '</mathText>';
	return text;
}

function mathInteractionToHTML(mi) {
	var text = '';
	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	var tmpText = mathml2subsup(mi.outerHTML);
	if (mi.outerHTML != tmpText) {
		text = tmpText;
	} else {
		text += '<div id="mathML" class="mceNonEditable">';
		//text += '<math xmlns="http://www.w3.org/1998/Math/MathML">';
		text += parseMathQTI2HTML(mi.outerHTML);
		//text += '</math>';
		text += '</div>';
	}
	return text;
}

function textInteractionsGroupHtmlNodeToQTI(n) {
	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	var text = '';
	if ('textEntryInteraction' == $.trim(n.nodeValue).substr(1, 20)) {
		text += parseMathHTML2QTI($.trim(n.nodeValue));
	} else if ('inlineChoiceInteraction' == $.trim(n.nodeValue).substr(1, 23)) {
		text += $.trim(n.nodeValue);
		for (j = 0; j < n.nextSibling.childNodes.length; j++) {
			var ic = n.nextSibling.childNodes[j];
			if (8 == ic.nodeType) {
				if ('inlineChoice' == $.trim(ic.nodeValue).substr(1, 12)) {
					text += parseMathHTML2QTI($.trim(ic.nodeValue));
					n.nextSibling.removeChild(n.nextSibling.childNodes[j]);
				}
			}
		}
		text += xh.prepareNodeEnd($(n.nodeValue).get(0));
		//text += '</inlineChoiceInteraction>';
		//content.removeChild(content.childNodes[i]);
	}
	return text;
}
function textInteractionsGroupContentToQTI(content, spanBegun) {
	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	var text = '';
	var n = null;

	for (var i = 0; i < content.childNodes.length; i++) {

		n = content.childNodes[i];

		if (3 == n.nodeType) {

			if (!spanBegun.value){
				text += '<span>';
				spanBegun.value = true;
			}
			var tn = $('<div/>');
			tn.text(n.nodeValue);
			text += tn.html();
			//text += n.nodeValue;
		} else if (8 == n.nodeType) {

			if (spanBegun.value){
				text += '</span>';
				spanBegun.value = false;
			}
			/*
			if ('textEntryInteraction' == $.trim(n.nodeValue).substr(1, 20)) {
				text += parseMathHTML2QTI($.trim(n.nodeValue));
			} else if ('inlineChoiceInteraction' == $.trim(n.nodeValue).substr(1, 23)) {
				text += $.trim(n.nodeValue);
				for (j = 0; j < n.nextSibling.childNodes.length; j++) {
					var ic = n.nextSibling.childNodes[j];
					if (8 == ic.nodeType) {
						if ('inlineChoice' == $.trim(ic.nodeValue).substr(1, 12)) {
							text += parseMathHTML2QTI($.trim(ic.nodeValue));
							n.nextSibling.removeChild(n.nextSibling.childNodes[j]);
						}
					}
				}
				text += xh.prepareNodeEnd($(n.nodeValue).get(0));
			 */
			//text += '</inlineChoiceInteraction>';
			//content.removeChild(content.childNodes[i]);
			text += textInteractionsGroupHtmlNodeToQTI(n);
			//}
		} else {
			if ('SPAN' != n.tagName || 'mediaInputModule' == n.className) {

				if (!spanBegun.value){
					text += '<span>';
					spanBegun.value = true;
				}

				if ('BR' == n.tagName) {
					text += xh.prepareEmptyNode(n);
				} else if ('SUB' == n.tagName || 'SUP' == n.tagName) {

					//zamknięcie tylko jeżeli w sub/sup jest moduł
					if (-1 != n.innerHTML.indexOf('textEntryInteraction') || -1 != n.innerHTML.indexOf('inlineChoiceInteraction')) {
						if (spanBegun.value){
							text += '</span>';
							spanBegun.value = false;
						}	
					}
					
					text += xh.prepareNodeBegin(n);
					text += textInteractionsGroupContentToQTI(n, spanBegun);
					text += xh.prepareNodeEnd(n);
				} else if ('mediaInputModule' == n.className) {
					text += mediaInteractionToQTI(n);
				} else {
					text += parseMathHTML2QTI(xh.prepareNode(n));
				}
			}
		}
	}
	return text;
}
function textInteractionsGroupToQTI(tig) {
	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	var text = '';
	text += xh.prepareNodeBegin($(tig.nodeValue).get(0));
	var gic = tig.nextSibling;
	text += '<prompt>'+parseMathHTML2QTI(gic.firstElementChild.innerHTML, true)+'</prompt>';
	var content = gic.firstElementChild.nextElementSibling;
	var n = null;
	var spanBegun = new Object({value: false});
	text += textInteractionsGroupContentToQTI(content, spanBegun);
	if (spanBegun.value){
		text += '</span>';
		spanBegun.value = false;
	}
	text += xh.prepareNodeEnd($(tig.nodeValue).get(0));
	return text;
}

function choiceInteractionToHTML(ci) {

	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	var correctResponses = xh.getCorrectResponseByIdentifier(ci.getAttribute('responseIdentifier'));
	var text = '';
	text += '<!-- '+xh.prepareNodeBegin(ci)+' -->';
	text += '<div id="choiceInteraction" class="mceNonEditable" style="border: 1px solid blue; color: blue; padding: 5px; background-color: #f0f0f0;" mce_style="border: 1px solid blue; color: blue; padding: 5px; background-color: #f0f0f0;">';
	var checked = '';
	
	for (var k = 0; k < ci.childNodes.length; k++) {
		if (1 == ci.childNodes[k].nodeType) {
			if ('PROMPT' == ci.childNodes[k].tagName) {
				text += '<p id="choiceInteraction">'+parseMathQTI2HTML(ci.childNodes[k].innerHTML)+'</p>';
			} else if ('SIMPLECHOICE' == ci.childNodes[k].tagName) {
				text += '<!-- '+xh.prepareNodeBegin(ci.childNodes[k]);
				var innerHtml = '';
				for (var i = 0; i < ci.childNodes[k].childNodes.length; i++) {
					var scChild = ci.childNodes[k].childNodes[i];

					if (1 == scChild.nodeType) {
						if ('FEEDBACKINLINE' == scChild.tagName) {
							text += xh.prepareNodeBegin(scChild)+parseMathQTI2HTML(scChild.innerHTML)+xh.prepareNodeEnd(scChild);
						} else if ('IMG' == scChild.tagName) {
							text += xh.prepareEmptyNode(scChild);
							innerHtml = xh.prepareEmptyNode(scChild);
						} else {
							text += parseMathQTI2HTML(xh.prepareNode(scChild));
							//console.log(xh.prepareNode(scChild));
							//text += xh.prepareNode(scChild);
							//text += '<'+scChild.tagName.toLowerCase()+xh.prepareAttributes(scChild)+'>';
							//text += scChild.innerHTML;
							//text += '</'+scChild.tagName.toLowerCase()+'>';
							innerHtml += parseMathQTI2HTML(xh.prepareNode(scChild));
							//innerHtml += xh.prepareNode(scChild);
							//innerHtml += '<'+scChild.tagName.toLowerCase()+xh.prepareAttributes(scChild)+'>';
							//innerHtml += scChild.innerHTML;
							//innerHtml += '</'+scChild.tagName.toLowerCase()+'>';
							
						}
					} else {
						text += scChild.nodeValue;
						innerHtml += scChild.nodeValue;
					}
				}
				text += xh.prepareNodeEnd(ci.childNodes[k])+' -->';
				text += '<br/>'
				if (-1 != correctResponses.indexOf(ci.childNodes[k].getAttribute('identifier'))) {
					checked = 'checked="checked" ';
				}
				text += '<input id="choiceInteraction" '+checked+'name="simpleChoice" type="checkbox"/>'+innerHtml;
				checked = '';
				innerHtml = '';
			}
		}
	}
	text += '</div><!-- '+xh.prepareNodeEnd(ci)+' -->';
	//usuniecie childeow zeby rekurencja juz tam nie wpadla
	while(ci.hasChildNodes()){
		ci.removeChild(ci.lastChild);
	}
	return text;
}

function selectionInteractionToQTI (si) {
	var text = '';
	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	var sINode = si.nextSibling;
	text += xh.prepareNodeBegin($(si.nodeValue).get(0));
	text += '<prompt>'+parseMathHTML2QTI(sINode.firstElementChild.innerHTML, true)+'</prompt>';
	var table = sINode.firstElementChild.nextElementSibling;
	var tr = null;
	
	for (var i = 0; i < table.firstChild.childNodes.length; i++) {
		tr = table.firstChild.childNodes[i];
			for (var j = 0; j < tr.childNodes.length; j++) { // for tr
				for (var k = 0; k < tr.childNodes[j].childNodes.length; k++) { //for td
					if (8 == tr.childNodes[j].childNodes[k].nodeType) {
						text += parseMathHTML2QTI($.trim(tr.childNodes[j].childNodes[k].nodeValue));
					}
				}
			}
	}
	text += xh.prepareNodeEnd($(si.nodeValue).get(0));
	
	//sINode.parentNode.removeChild(si);
	//sINode.parentNode.removeChild(sINode.nextSibling);
	//sINode.parentNode.removeChild(sINode);
	return text;
}

function choiceInteractionToQTI(ci) {
	var text = '';
	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	var cINode = ci.nextSibling;
	
	text += xh.prepareNodeBegin($(ci.nodeValue).get(0));
	text += '<prompt>'+parseMathHTML2QTI(cINode.firstElementChild.innerHTML, true)+'</prompt>';
	for (var i = 0; i < cINode.childNodes.length; i++) {
		if (8 == cINode.childNodes[i].nodeType) {
			text += parseMathHTML2QTI(cINode.childNodes[i].nodeValue);
		}
	}
	text += xh.prepareNodeEnd($(ci.nodeValue).get(0));
	return text;
}

function mediaInteractionToQTI(mi) {
	var text = '';
	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	var mediaNode = null;

	if (null != mi.firstChild) {
		mediaNode = mi.firstChild;
	} else {
		mediaNode = mi;
	}

	if ('IMG' == mediaNode.tagName) {
		var src = mediaNode.getAttribute('src');
		//var title = $('<div/>').html(mediaNode.getAttribute('alt')).html();
		//text += '<img src="'+src+'"><title>'+parseMathHTML2QTI(title)+'</title><description></description></img>';
		var title = mediaNode.getAttribute('alt');
		title = tinymce.DOM.encode(title);
		title = tinymce.EditorManager.activeEditor.decodeMath(title);
		text += '<img src="'+src+'"><title>'+parseMathHTML2QTI(title)+'</title><description></description></img>';

	} else {
		//var title = $('<div/>').html(mediaNode.getAttribute('alt')).html();
		var title = mediaNode.getAttribute('alt');
		title = tinymce.DOM.encode(title);
		title = tinymce.EditorManager.activeEditor.decodeMath(title);
		var data = mediaNode.getAttribute('data');
		var type = mediaNode.getAttribute('type');
		
		if (null == title) {
			title = '';
		}
		text += '<object data="'+data+'" type="'+type+'"><title>'+parseMathHTML2QTI(title)+'</title><description></description></object>';
	}
	return text;
}

function mediaInteractionsToHTML(mi) {
	var text = '';
	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	text += '<fieldset id="runFileUploadLib" class="mceNonEditable" style="font-size: 10px; font-color: #b0b0b0; color: #b0b0b0; border: 1px solid #d0d0d0;" mce_style="font-size: 10px; font-color: #b0b0b0; color: #b0b0b0; border: 1px solid #d0d0d0;">';	

	if ('IMG' == mi.tagName) {
		var src = mi.getAttribute('src');
		var title = parseMathQTI2HTML(mi.nextElementSibling.textContent); //innerHTML);
		title = tinyMCE.activeEditor.dom.encode(title);
		text += '<img alt="'+title+'" src="'+src+'" />';
		mi.parentNode.removeChild(mi.nextElementSibling.nextElementSibling); //description
		mi.parentNode.removeChild(mi.nextElementSibling); //title
	
	} else { // if video object
		var data = mi.getAttribute('data');
		var type = mi.getAttribute('type');
		var title = parseMathQTI2HTML(mi.firstElementChild.textContent); //innerHTML);
		title = tinyMCE.activeEditor.dom.encode(title);
		text += '<object alt="'+title+'" data="'+data+'" type="'+type+'"></object>'
		text += '<img id="mceVideo" src="/res/skins/default/qtipageeditor/tinymce/tiny_mce/plugins/qti_addvideo/img/movie.png" mce_src="/res/skins/default/qtipageeditor/tinymce/tiny_mce/plugins/qti_addvideo/img/movie.png"/>';

		for ( var i = mi.childNodes.length-1; i >= 0; i--) {
			mi.removeChild(mi.childNodes[i]);
		}
	}
	text += '<br/>';
	var titleMatch = text.match(/alt="([^"]+)"/);
	if (null != titleMatch) {
		var t = tinyMCE.activeEditor.dom.decode(titleMatch[1]);
		t = t.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
		t = tinyMCE.activeEditor.decodeMath(t);
		text += t;
	}
	text += '</fieldset>';
	return text;
}

function selectionInteractionToHTML(si) {
	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	var correctResponses = xh.getCorrectResponseByIdentifier(si.getAttribute('responseIdentifier'));
	var text = '';
	text += '<!-- '+xh.prepareNodeBegin(si)+' -->';
	text += '<div id="selectionInteraction" class="mceNonEditable" style="border: 1px solid blue; color: blue; padding: 5px; background-color: #f0f0f0;" mce_style="border: 1px solid blue; color: blue; padding: 5px; background-color: #f0f0f0;">';

	var prompts = si.getElementsByTagName('prompt');
	text += '<p id="selectionInteraction">'+parseMathQTI2HTML(prompts[0].innerHTML)+'</p>';
	var options = si.getElementsByTagName('simpleChoice');
	
	text += '<table class="selectionTable"><tbody><tr><td>&nbsp;</td>';
	for (var i = 0; i < options.length; i++) {
		text += '<td><!-- '+parseMathQTI2HTML(xh.correctImg(xh.prepareNode(options[i])))+' -->'+parseMathQTI2HTML(options[i].innerHTML)+'</td>';
	}
	text += '</tr>';
	
	var items = si.getElementsByTagName('item');
	var feedbacks = new Array();
	var feedbacksText = '';
	var item = null;
	var feedback = null;

	for (var i = 0; i < items.length; i++) {
		item = items[i];
		text += '<tr><td><!-- '+xh.prepareNodeBegin(item);

		for (var j = item.childNodes.length-1; j > 0; j--) {

			if (item.childNodes[j].tagName == 'FEEDBACKINLINE') {
				feedback = item.childNodes[j];
				feedbacksText += parseMathQTI2HTML(xh.prepareNode(feedback));
				item.removeChild(feedback);
			}
		}
		text += parseMathQTI2HTML(xh.correctImg(item.innerHTML));
		text += feedbacksText;
		text += xh.prepareNodeEnd(item)+' -->'+parseMathQTI2HTML(item.innerHTML)+'</td>';
		feedbacksText = '';
		
		for (var j = 0; j < options.length; j++) {
			var checked = '';
			
			if (correctResponses.indexOf(item.getAttribute('identifier')+' '+options[j].getAttribute('identifier')) != -1) {
				checked = 'checked="checked" ';
			}
			text += '<td><input id="selectionInteraction" '+checked+'name="simpleChoice" type="checkbox"/></td>';
			checked = '';
		}
		text += '</tr>';
	}
	text += '</tbody></table></div><!-- '+xh.prepareNodeEnd(si)+' -->';
	//usuniecie childeow zeby rekurencja juz tam nie wpadla
	while(si.hasChildNodes()){
		si.removeChild(si.lastChild);
	}
	return text;
}

function textInteractionsGroupToHTML(ti) {
	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	var text = '';
	text += '<!-- '+xh.prepareNodeBegin(ti)+' -->';
	text += '<div id="gapInlineChoiceInteraction" class="mceNonEditable" style="border: 1px solid blue; color: blue; padding: 5px; background-color: #f0f0f0;" mce_style="border: 1px solid blue; color: blue; padding: 5px; background-color: #f0f0f0;">';
	text += textInteractionsGroupNodeToHTML(ti);
	text += '</p></div><!-- '+xh.prepareNodeEnd(ti)+' -->';
	//usuniecie childeow zeby rekurencja juz tam nie wpadla
	while(ti.hasChildNodes()){
		ti.removeChild(ti.lastChild);
	}
	return text;
}

function textInteractionsGroupNodeToHTML(ti) {
	text = '';
	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	
	for (var i = 0; i < ti.childNodes.length; i++) {
		if (3 == ti.childNodes[i].nodeType) {
			text += ti.childNodes[i].nodeValue;
		} else {
			var feedbacksText = '';
			if ('PROMPT' == ti.childNodes[i].tagName) {
				text += '<!-- <prompt> --><p id="gapInlineChoiceInteractionQuestion">'+parseMathQTI2HTML(ti.childNodes[i].innerHTML)+'</p><!-- </prompt> -->';
				text += '<p id="gapInlineChoiceInteractionContent">';
			} else if ('TEXTENTRYINTERACTION' == ti.childNodes[i].tagName) {
				text += '<!-- '+xh.prepareNodeBegin(ti.childNodes[i]);

				if (null != ti.childNodes[i].childNodes) {

					for (var j = ti.childNodes[i].childNodes.length-1; j >= 0; j--) {

						if (ti.childNodes[i].childNodes[j].tagName == 'FEEDBACKINLINE') {
							var feedback = ti.childNodes[i].childNodes[j];
							feedbacksText = xh.prepareNode(feedback) + feedbacksText;
							ti.childNodes[i].removeChild(feedback);
						}
					}
					text += parseMathQTI2HTML(feedbacksText);
				}
				text += xh.prepareNodeEnd(ti.childNodes[i])+' -->';
				var correctResponses = xh.getCorrectResponseByIdentifier(ti.childNodes[i].getAttribute('responseIdentifier'));
				text += '<span id="gap" class="mceNonEditable" style="border: 1px solid blue; color: blue; background-color: #f0f0f0;" mce_style="border: 1px solid blue; color: blue; background-color: #f0f0f0;">'+correctResponses+'</span>';
				feedbacksText = '';

			} else if ('INLINECHOICEINTERACTION' == ti.childNodes[i].tagName) {
				text += '<!-- '+xh.prepareNodeBegin(ti.childNodes[i])+' -->';
				text += '<span mce_style="border: 1px solid blue; color: blue; background-color: #f0f0f0;" style="border: 1px solid blue; color: blue; background-color: #f0f0f0;" class="mceNonEditable" id="inlineChoiceInteraction">';

				if (null != ti.childNodes[i].childNodes) {

					for (var j = 0; j < ti.childNodes[i].childNodes.length; j++) {
						var iCText = '';

						if (ti.childNodes[i].childNodes[j].tagName == 'INLINECHOICE') {
							var ic = ti.childNodes[i].childNodes[j];
							iCText += '<!-- '+xh.prepareNodeBegin(ic);

							if (null != ic.childNodes) {
								var feedbacksText = '';

								for (var k = ic.childNodes.length-1; k >= 0; k--) {

									if (ic.childNodes[k].tagName == 'FEEDBACKINLINE') {
										var feedback = ic.childNodes[k];
										feedbacksText += xh.prepareNode(feedback);
										ic.removeChild(feedback);
									}
								}
							}
							iCText += ic.innerHTML;
							iCText += feedbacksText;
							iCText += xh.prepareNodeEnd(ic)+' -->';
							var correctResponses = xh.getCorrectResponseByIdentifier(ti.childNodes[i].getAttribute('responseIdentifier'));
							if (correctResponses == ic.getAttribute('identifier')) {
								iCText += '<span id="inlineChoiceAnswer" style="border: none; color: blue; background-color: #f0f0f0;" mce_style="border: none; color: blue; background-color: #f0f0f0;">'+ic.innerHTML+'<span style="color: green; font-weight: bold;" mce_style="color: green; font-weight: bold;"> »</span></span>';
							} else {
								iCText += '<span id="inlineChoiceAnswer" style="display: none;" mce_style="display: none;">'+ic.innerHTML+'</span>';
							}
							feedbacksText = '';
						}
						text += parseMathQTI2HTML(iCText);
					}
				}
				text += '</span><!-- '+xh.prepareNodeEnd(ti.childNodes[i])+' -->';
			} else {
				//wszystkie node typu tekst opakowane są w spany
				if ('SPAN' == ti.childNodes[i].tagName) {
					var tmpTextContent = ti.childNodes[i].innerHTML;
					//tmpTextContent = tmpTextContent.replace(/<img src="([^"]*)"><title>([^<]*)<\/title><description><\/description>(<\/img>)?/g, '<span class="mediaInputModule"><img alt="$2" src="$1"/><br/>$2</span>');
					tmpTextContent = tmpTextContent.replace(/<img src="([^"]*)"><title>([^<]*)<\/title><description><\/description>(<\/img>)?/g, function(a, src, title) {
						title = parseMathQTI2HTML(tinymce.DOM.decode(title));
						return '<span class="mediaInputModule"><img alt="'+tinymce.DOM.encode(title)+'" src="'+src+'"/><br/>'+tinymce.EditorManager.activeEditor.decodeMath(tinymce.DOM.encode(title))+'</span>';
					});
					tmpTextContent = tmpTextContent.replace(/<object data="([^"]*)" type="([^"]*)"><title>([^<]*)<\/title><description><\/description>(<\/object>)?/g, function(a, data, type, title) {
						title = parseMathQTI2HTML(tinymce.DOM.decode(title));
						return '<span class="mediaInputModule"><object data="'+data+'" type="'+type+'" alt="'+tinymce.DOM.encode(title)+'"></object><img alt="'+tinymce.DOM.encode(title)+'" src="/res/skins/default/qtipageeditor/tinymce/tiny_mce/plugins/qti_addvideo/img/movie.png"/><br/>'+tinymce.EditorManager.activeEditor.decodeMath(tinymce.DOM.encode(title))+'</span>';
					});
					text += parseMathQTI2HTML(tmpTextContent);
				} else {
					if ('BR' == ti.childNodes[i].tagName) {
						text += xh.prepareEmptyNode(ti.childNodes[i]);
					} else if ('SUB' == ti.childNodes[i].tagName || 'SUP' == ti.childNodes[i].tagName) {
						//console.log(ti.childNodes[i].tagName);
						text += xh.prepareNodeBegin(ti.childNodes[i]);
						//text += 'ok'
						text += textInteractionsGroupNodeToHTML(ti.childNodes[i]);
						text += xh.prepareNodeEnd(ti.childNodes[i]);
					} else {
						text += xh.prepareNode(ti.childNodes[i]);
					}
				}
			}
		}
	}
	return text;
}

function QTI2HTML(h) {
	//remove formatting
	h = h.replace(/(\r\n|\n|\r)/gm,'');
	//h = h.replace(/(>[ ]+<)/gm,'><');
	
	if(h.match(/<assessmentItem [^>]*>/gi)) {
		basePagePath = tinyMCE.gwtProxy.getPageBasePath();
		if(basePagePath != undefined && basePagePath != '') {
			basePagePath = basePagePath.split('/');
			basePagePath.pop();
			basePagePath = basePagePath.join('/');
			basePagePath += '/';
			h = h.replace(/src="([^"(ctrl)]+media[^"]*)"/gi, 'src="' + basePagePath + '$1"');
			h = h.replace(/href="([^"]*media[^"]*)"/gi, 'href="' + basePagePath + '$1"');

		}

		if(h.match(/<!-- <changesTracking state="on"> -->/gi)) {
			tinyMCE.changesTracking = true;
			tinyMCE.activeEditor.controlManager.setActive('enablechangestracking', true);
		} else {
			tinyMCE.changesTracking = false;
			tinyMCE.activeEditor.controlManager.setActive('enablechangestracking', false);
		}
	}

	/*h = h.replace(/(<span[^>]*class="changestracking_original"[^>]*style=")("[^>]*>)/gi,'$1color: red; text-decoration: line-through;$2');
	h = h.replace(/(<span[^>]*class="changestracking_new"[^>]*style=")[^"]*("[^>]*>)/gi,'$1color: red; text-decoration: underline;$2');

	h = h.replace(/<u[^>]*style="[^"]*"[^>]*>(.*?)<\/u>/gi,'<span class="changestracking_new" style="color: red; text-decoration: underline;" title="Changes tracking: new content">$1</span>');
	h = h.replace(/<strike[^>]*style="[^"]*"[^>]*>(.*?)<\/strike>/gi,'<span class="changestracking_original" style="color: red; text-decoration: line-through;" title="Changes tracking: original content">$1</span>');
*/
	// bug 35201
	//if(h.match(/^<table[^>]*>.*<\/table>$/i) == undefined) {
	h = processQTI(h);
	//}

	return h;
}

function processQTI(h) {
	// Prepare QTI base template if file is empty
	if(h == '<br mce_bogus="1" />' || h == '') {
		h = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><assessmentItem title="" xmlns="http://www.ydp.eu/empiria"><itemBody>' + h + '</itemBody></assessmentItem>';
	}
	text = h;
	
	if ('<!-- ?xml' != h.substr(0,9)) {
		var xh = tinymce.EditorManager.activeEditor.XmlHelper;
		xh.loadXML(h);
		//var node = document.createElement('root');
		//node.innerHTML = h;
		var text = '<!-- ?xml version="1.0" encoding="UTF-8" standalone="no"? -->';
		text += qti2htmlParse(xh.actualNode.node);
	}
	return text;
}

function HTML2QTI(h) {
	h = parseToQTI(h);

	basePagePath = tinyMCE.gwtProxy.getPageBasePath();
	if(basePagePath != undefined && basePagePath != '') {

		basePagePath = basePagePath.split('/');
		basePagePath.pop();
		basePagePath = basePagePath.join('/');
		basePagePath += '/';
		var rg = new RegExp('src="(' + basePagePath + ')*([^"]*)"', 'gi');
		h = h.replace(rg, 'src="$2"');
		var rg = new RegExp('href="(' + basePagePath + ')*([^"]*)"', 'gi');
		h = h.replace(rg, 'href="$2"');
	}
	h = applyFormatting(h);
	return h;
}

function parseToQTI(h) {
	var node = document.createElement('root');
	node.innerHTML = h;
	text = html2qtiParse(node);
	return text;
}

function applyFormatting(h) {

	h = h.replace(/(\r\n|\n|\r)/gm,'');
	//h = h.replace(/(>[ ]+<)/gm,'><');

	// TEMPLATE FORMATING
	//before begin
	h = h.replace(/<(section|group class="[^"]+"|simpleText|assessmentItem)([^>]*)>/gi, '\n<$1$2>');
	
	//after begin
	h = h.replace(/<(assessmentItem|styleDeclaration|itemBody|link|responseDeclaration|correctResponse)([^>]*)>/gi, '<$1$2>\n');
	
	//before end
	h = h.replace(/<\/(itemBody)([^>]*)>/gi, '\n</$1$2>');
	
	//after end
	h = h.replace(/<\/(group|section|simpleText|styleDeclaration|value|correctResponse|responseDeclaration|itemBody)([^>]*)>/gi, '</$1$2>\n');
	
	
	//h = h.replace(/<(group class="[^"]+")([^>]*)>/gi, '\n<$1$2>');
	//h = h.replace(/<\/(group)>/gi, '</$1>\n');
	
	
	//PLUGIN FORMATING
	//after begin
	h = h.replace(/<(choiceInteraction)([^>]*)>/gi, '<$1$2>\n');
	//before end
	h = h.replace(/<\/(choiceInteraction)>/gi, '\n</$1>');
	//after end
	h = h.replace(/<\/(choiceInteraction|prompt)>/gi, '</$1>\n');
	return h;
}

function actionOnQTI(e) {
	
	var ed = tinymce.EditorManager.activeEditor;
	
	// fix for writing content before xml template
	if(ed.selection.getStart().attributes != undefined && ed.selection.getStart().hasAttribute('_moz_editor_bogus_node')) {
		ed.selection.dom.doc.body.innerHTML = ed.selection.dom.doc.body.innerHTML.replace(/(.*)(<!-- \?xml[^\?]*\? -->[^<]*<!-- <assessmentItem[^>]*> -->[^<]*<!-- <itemBody> -->)/gi,'$2$1');
	}
	
	// TODO: ZNALEZC OBEJSCIE DLA IE !! WAZNE !!
	if(!tinymce.isIE) { 
		if(ed.selection.getRng().startContainer.nodeName == 'BODY') {
			if(ed.selection.dom.doc.body.getElementsByTagName('p')[0] != undefined && tinyMCE.originalBookmark == undefined) {
				ed.selection.select(ed.selection.dom.doc.body.getElementsByTagName('p')[0]);
				//ed.selection.moveToBookmark(ed.selection.getBookmark());
			} 
		} 
	} 
	
	//selectNodeAfterMouseEvent(e, ed);
	//onDelete if Tracking is disable
	if (e.keyCode == 46 && e.type == 'keypress') {
		var dd = ed.selection.getNode() || ed.getBody();

		if(dd.attributes != undefined) {
			if (dd.id != undefined  && dd.nodeName == 'DIV' && dd.id == 'gapInlineChoiceInteraction') {
				ed.execCommand('mceGapInlineChoiceRemove', false);
			}
		}
		
		if ("P" == dd.nodeName && "&nbsp;" == dd.innerHTML) {
			dd.parentNode.removeChild(dd);
			return false;
		}
		return false;
	}
	
	if(tinyMCE.changesTracking != undefined) {
		if(tinyMCE.changesTracking === true) {
		
			if(tinyMCE.originalBookmark != undefined) {
				ed.selection.moveToBookmark(tinyMCE.originalBookmark);
				delete tinyMCE.originalBookmark;
			}
			
			// Disable editing original content
			if(ed.selection.getNode().nodeName != undefined && ed.selection.getNode().nodeName == 'SPAN' && ed.selection.getNode().getAttribute('class') == 'changestracking_original') {
				if(e.type == 'keypress' && (e.charCode != 0 || e.keyCode == 8 || e.keyCode == 88 || e.keyCode == 46 || e.keyCode == 86)) {
					return false;
				}
			}
			
			// On typing text or pasting
			if(e.type=='keypress' && (e.charCode != 0 || e.keyCode == 86)) {
				
				if(ed.selection.getContent() != '') {
					
					// replace selected text
					ed.windowManager.alert('Text replacing is not allowed in changes tracking mode');
					return false;
					
				} else if(ed.selection.getNode().nodeName != undefined && ed.selection.getNode().nodeName == 'SPAN' && ed.selection.getNode().attributes != undefined && ed.selection.getNode().getAttribute('class') == 'changestracking_new') {
					
					// type inside previously added text
					return true;
					
				} else if(ed.selection.getNode().nodeName != undefined && ed.selection.getNode().nodeName == 'SPAN' && ed.selection.getNode().className != undefined && ed.selection.getNode().className == 'AMedit') {
					
					// type inside math expressions
					ed.selection.getNode().setAttribute('style','color: red;');
					return true;
					
				} else {
					
					// type new text
					tinyMCE.execCommand('mceInsertContent', false, '<span class="changestracking_new" style="color: red; text-decoration: underline;" title="Changes tracking: new content">' + String.fromCharCode(e.charCode) + '</span>');
					return false;
					
				}
				
			}
			
			// Actions on normal text
			if(ed.selection.getNode().nodeName == undefined || ed.selection.getNode().nodeName != 'SPAN' || ed.selection.getNode().attributes == undefined || ed.selection.getNode().getAttribute('class') != 'changestracking_new') {
				// on backspace
				if(e.type == 'keypress' && e.keyCode == 8) {
					var content = ed.selection.getContent();
					if(content != '') {
						
						var myBookmark = ed.selection.getBookmark();
						ed.selection.moveToBookmark(myBookmark);
						tinyMCE.execCommand('mceInsertContent', false, '<span class="changestracking_original" style="color: red; text-decoration: line-through;" title="Changes tracking: original content">' + content + '</span>');
						myBookmark.end = myBookmark.start;
						ed.selection.moveToBookmark(myBookmark);
						
					} else if(ed.selection.getNode().nodeName != undefined && ed.selection.getNode().nodeName == 'SPAN' && ed.selection.getNode().className != undefined && ed.selection.getNode().className == 'AMedit') {
						
						ed.selection.getNode().setAttribute('style','color: red;');
						return true;
						
					} else {
						
						var myBookmark = ed.selection.getBookmark();
						
						myBookmark.start = myBookmark.start - 1;
						ed.selection.moveToBookmark(myBookmark);
						
						var content = ed.selection.getContent();
						tinyMCE.execCommand('mceInsertContent', false, '<span class="changestracking_original" style="color: red; text-decoration: line-through;" title="Changes tracking: original content">' + content + '</span>');
						myBookmark.end = myBookmark.start;
						ed.selection.moveToBookmark(myBookmark);
						
					}
					//reduceNumberOfSpans();
					return false;
				} // eof on backspace
				
				// on delete
				if(e.type == 'keypress' && e.keyCode == 46) {
					var content = ed.selection.getContent();
					if(content != '') {
						var myBookmark = ed.selection.getBookmark();
						ed.selection.moveToBookmark(myBookmark);
						tinyMCE.execCommand('mceInsertContent', false, '<span class="changestracking_original" style="color: red; text-decoration: line-through;" title="Changes tracking: original content">' + content + '</span>');
						myBookmark.start = myBookmark.end;
						ed.selection.moveToBookmark(myBookmark);
					} else {
						ed.windowManager.alert('Delete button is not working properly in changes tracking mode, due to technical reasons');
						//var myBookmark = ed.selection.getBookmark();
						//myBookmark.end = myBookmark.end + 1;
						//ed.selection.moveToBookmark(myBookmark);
						//var content = ed.selection.getContent();
						//tinyMCE.execCommand('mceInsertContent', false, '<span class="changestracking_original" style="color: red; text-decoration: line-through;" title="Changes tracking: original content">' + content + '</span>');
						//myBookmark.start = myBookmark.end;
						//ed.selection.moveToBookmark(myBookmark);
					}
					//reduceNumberOfSpans();
					return false;
				} // eof on delete
			
			}// eof actions on normal text
			
		} else {
			if(e.type == 'keypress' && (e.charCode != 0 || e.keyCode == 8 || e.keyCode == 46)) {
				if(ed.selection.getNode().nodeName != undefined && ed.selection.getNode().nodeName == 'SPAN' && ed.selection.getNode().attributes != undefined && ed.selection.getNode().getAttribute('class') == 'changestracking_new') {
					return false;
				}
				if(ed.selection.getNode().nodeName != undefined && ed.selection.getNode().nodeName == 'SPAN' && ed.selection.getNode().attributes != undefined && ed.selection.getNode().getAttribute('class') == 'changestracking_original') {
					return false;
				}
			}
		}
		
	} // eof changesTracking

	if ((e.type == 'dblclick' && e.button == 0) || (e.type == 'keypress' && e.keyCode == '113')) {
		
		if(e.type == 'dblclick') {
			var selectedNode = e.target;
		} else {
			var selectedNode = ed.selection.getNode();
		}
		
		if(selectedNode.nodeName == 'HTML') {
			return false;
		}
		
		while(selectedNode.nodeName != 'BODY') {
			if(selectedNode.attributes != undefined) {
				
				// MathML
				if (selectedNode.nodeName == 'DIV' && selectedNode.id == 'mathML') {
					runMathMLInteraction(selectedNode);
					break;
				}
				
				// QY Comments
				/*if (selectedNode.nodeName == 'DIV' && selectedNode.getAttribute('class') == 'mceNonEditable qy_comment') {
					//runComment(selectedNode);
					alert('Not implemented yet');
					break;
				}*/

				// Gap InlineChoice
				if (selectedNode.nodeName == 'DIV' && selectedNode.id == 'gapInlineChoiceInteraction') {
					runGapInlineChoiceInteraction(selectedNode);
					//runGapInlineChoice(selectedNode);
					break;
				}
				
				// PlayPause
				/*if (selectedNode.nodeName == 'IMG' && selectedNode.attributes != undefined && selectedNode.getAttribute('id') == 'mcePlayPause') {
					//runPlayPause(selectedNode);
					alert('Not implemented yet');
					break;
				}*/

				// Multiple choice
				if ((selectedNode.nodeName == 'P' && selectedNode.id == 'choiceInteraction' && selectedNode.parentNode.id == 'choiceInteraction') || (selectedNode.nodeName == 'DIV' && selectedNode.id == 'choiceInteraction' || selectedNode.parentNode.id == 'choiceInteraction')) {
					runChoiceInteraction(selectedNode);
					break;
				}
				
				// MediaLib
				if((selectedNode.nodeName == 'IMG' && selectedNode.parentNode.className != 'mediaInputModule') || (selectedNode.nodeName == 'FIELDSET' && selectedNode.id == 'runFileUploadLib')) {
					runMediaLib(selectedNode);
					break;
				}

				// Drag and Drop
				/*if ((selectedNode.nodeName == 'P' && selectedNode.id == 'dragDropInteractionContents') || (selectedNode.nodeName == 'DIV' && selectedNode.id == 'dragDropInteraction')) {
					//runDraggable(selectedNode);
					alert('Not implemented yet');
					break;
				}*/

				// Selection
				if (selectedNode.nodeName == 'DIV' && selectedNode.id == 'selectionInteraction') {
					runSelectionInteraction(selectedNode);
					break;
				}
				
				// Order
				/*if (selectedNode.id == 'orderOption' || (selectedNode.id == 'choiceInteraction' && selectedNode.parentNode.id == 'orderInteraction')) {
					//runOrder(selectedNode);
					alert('Not implemented yet');
					break;
				}*/
				
				// Match
				/*if (selectedNode.id != undefined && (selectedNode.id == 'matchInteraction' || selectedNode.id.match(/canvas_/))) {
					//runMatch(selectedNode);
					alert('Not implemented yet');
					break;
				}*/

				// Identification
				/*if (selectedNode.id == 'identificationInteraction' || selectedNode.id == 'identificationAnswer' || selectedNode.parentNode.id == 'identificationAnswer') {
					//runIdentification(selectedNode);
					alert('Not implemented yet');
					break;
				}*/

			}
			selectedNode = selectedNode.parentNode;
		}
		
	}
	
	//backspace
	if (e.keyCode == 8) {
		var dsc, dec;
        
	    if(e.keyCode == 8 || e.keyCode == 46) {
	        dsc = ed.dom.getParent(ed.selection.getStart(), function(n) {
	            return ed.dom.hasClass(n, 'mceNonEditable');
	        });
	   
	        dec = ed.dom.getParent(ed.selection.getEnd(), function(n) {
	            return ed.dom.hasClass(n, 'mceNonEditable');
	        });
	                   
	        if (dsc || dec) {
	            return false;
	        }
	    }
	}
	return true;
	
}

function runMathMLInteraction(selectedNode) {
	var math = selectedNode.innerHTML;
	math = math.replace(/<math[^>]*>/,'');
	math = math.replace(/<\/math>/,'');
	tinyMCE.selectedNode = selectedNode;
	tinyMCE.execCommand('mceScience', false, math);
}

function runGapInlineChoiceInteractionNode(contentElement, data, body, nodeCounter) {
	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	var contentText = '';
	
	for(var i = 0; i < contentElement.childNodes.length; i++) {
		var node = contentElement.childNodes[i];

		if (3 == node.nodeType) { //text node
			var tn = $('<div/>');
			tn.text(node.nodeValue);
			contentText += tn.html();
			//contentText += node.nodeValue;
		} else if (1 == node.nodeType) { //zwykly html node
			
			if ('SPAN' != node.tagName) {
				
				if ('BR' == node.tagName) {
					contentText += xh.prepareEmptyNode(node);
				} else if ('SUB' == node.tagName || 'SUP' == node.tagName) {
					contentText += xh.prepareNodeBegin(node);
					contentText += runGapInlineChoiceInteractionNode(node, data, body, nodeCounter);
					contentText += xh.prepareNodeEnd(node);
				} else {
					contentText += xh.prepareNode(node);
				}
			} else {
				if ('SPAN' == node.tagName && node.className == 'mediaInputModule') {
					if ('OBJECT' == node.firstChild.nodeName) {
						var alt = tinymce.DOM.encode(node.firstChild.getAttribute("alt"));
						contentText += xh.prepareNode(node.firstChild); //'<img alt="'+alt+'" src="'+node.firstChild.getAttribute("src")+'">';
					} else if ('IMG' == node.firstChild.nodeName) {
						//contentText += '<img alt="'+node.firstChild.getAttribute("alt")+'" src="'+node.firstChild.getAttribute("src")+'">';
						var alt = tinymce.DOM.encode(node.firstChild.getAttribute("alt"));
						contentText += '<img alt="'+alt+'" src="'+node.firstChild.getAttribute("src")+'">';
					}
				}
			}
		} else if (8 == node.nodeType) { //comment node
			var child = $(node.nodeValue).get(0);
			
			if ('TEXTENTRYINTERACTION' == child.tagName) {
				//if (-1 == tmpResponses.indexOf(contentElement.childNodes[i].nextSibling.innerHTML)) {
					//tmpResponses.push(contentElement.childNodes[i].nextSibling.innerHTML);
					contentText += '[gap#'+nodeCounter.value+']';
					var feedback = new Array();
						feedback['onOk'] = '';
						feedback['onWrong'] = '';
				
					for (k = 0; k < child.childNodes.length; k++) {
						if ('CORRECT' == child.childNodes[k].getAttribute('mark')) {
							feedback['onOk'] = child.childNodes[k].innerHTML;
						} 
						if ('WRONG' == child.childNodes[k].getAttribute('mark')) {
							feedback['onWrong'] = child.childNodes[k].innerHTML;
						} 
					}
				
					data['inlineRows'].push({
							answer: contentElement.childNodes[i].nextSibling.innerHTML,
							feedback: feedback,
							id: nodeCounter.value,
							identifier: child.getAttribute('responseIdentifier'),
							type: 'gap'
					});
					nodeCounter.value++;
				/*} else {
					var cResp = xh.getCorrectResponseNodeId(body, child.getAttribute('responseIdentifier'));
					if (null != cResp) {
						cResp.parentNode.removeChild(cResp);
					}
					contentText += '[gap#'+tmpResponses.indexOf(contentElement.childNodes[i].nextSibling.innerHTML)+']';
				}*/
			} else if ('INLINECHOICEINTERACTION' == child.tagName) {

				var span = contentElement.childNodes[i].nextSibling;
				var n = null;
				var comment = null;

				var points = new Array();
				var ids = new Array();
				var answers = new Array();
				var fixed = new Array();
				var feedbacks = new Object();
				var shuffle = false;
				
				if ("true" == child.getAttribute('shuffle')) {
					shuffle = true;
				}
				var tmpAnswers = '';
				for (var j = 0; j < span.childNodes.length; j++) {
					n = span.childNodes[j];

					if (8 == n.nodeType) {
						comment = $(n.nodeValue).get(0);
						
						if ('INLINECHOICE' == comment.tagName) {
    							var correctResponse = xh.getCorrectResponseById(body, child.getAttribute('responseIdentifier'));

							if (correctResponse[0] == comment.getAttribute('identifier')) {
								points.push(1);
							} else {
								points.push(0);
							}
							ids.push(comment.getAttribute('identifier'));
							if ('true' == comment.getAttribute('fixed')) {
								fixed.push(1);
							} else {
								fixed.push(0);
							}
							
							if (comment.lastChild != null && 'FEEDBACKINLINE' == comment.lastChild.tagName) {
								feedbacks[comment.getAttribute('identifier')] = comment.lastChild.innerHTML;
								comment.removeChild(comment.lastChild);
							}
							/*chcemy wyeliminować w formularzu edycyjnym ćwiczenia powtarzające się inlineChoice'y.
							  Dwa inlineChoice'y są takie same jeżeli:
							  1. wszystkie ich odpowiedzi są jednakowe
							  2. wszystkie inlineChoice'y mają zaznaczoną jako poprawną odpowiedź, tą samą wartość odpowiedzi
							  3. wszystkie inlineChoice'y mają tak samo zaznaczone fixed'y
							  Poniżej ztorzymy string będący "id" inlineChoice'a w postaci:
							  "[ans1][isCorrect][ans2][isCorrect][ans3][isCorrect]"
							  Jeżeli w tmpResponses już wcześniej wystąpił taki string to znaczy że jest to duplikat jakiegoś innego inlineChoicea
							  i nie trzeba go wstawiać w zmienną data
							  */
							var isCorrect = 0;
							if (correctResponse[0] == comment.getAttribute('identifier')) {
								isCorrect = 1;
							}
							tmpAnswers += comment.innerHTML+isCorrect+fixed[fixed.length-1];
							answers.push(comment.innerHTML);
							isCorrect = 0;
						}
					}
				}
				
				//if (-1 == tmpResponses.indexOf(tmpAnswers)) {
					contentText += '[inlineChoice#'+nodeCounter.value+']';
					//tmpResponses.push(tmpAnswers);
					data['inlineRows'].push({
						answers: answers,
						feedbacks: feedbacks,
						fixed: fixed,
						id: nodeCounter.value,
						identifier: child.getAttribute('responseIdentifier'),
						ids: ids,
						points: points,
						shuffle: shuffle,
						type: 'inlineChoice'
					});
					nodeCounter.value++;
				/*} else {
					var cResp = xh.getCorrectResponseNodeId(body, child.getAttribute('responseIdentifier'));
					if (null != cResp) {
						cResp.parentNode.removeChild(cResp);
					}
					//contentText += '[inlineChoice#'+tmpResponses.indexOf(tmpAnswers)+']';
					contentText += '[inlineChoice#'+nodeCounter+']';
				}*/
				var tmpNode = node;

				for(;i < contentElement.childNodes.length; i++) {
				
					if (8 == contentElement.childNodes[i].nodeType && $.trim(contentElement.childNodes[i].nodeValue) == '</inlineChoiceInteraction>') {
						break;
					}
				}
				
			}
		}
	}
	return contentText;
}

function runGapInlineChoiceInteraction(selectedNode) {
	
	var body = selectedNode;
	while(body.nodeName != 'BODY') {
		body = body.parentNode;
	}

	var data = new Array();
	data['question'] = selectedNode.children[0].innerHTML;
	data['content'] = null;
	data['inlineRows'] = new Array();
	var contentElement = selectedNode.children[1]; //p gapInlineChoiceInteractionContent
	var contentText = '';
	var nodeCounter = new Object({value: 0});
	//var nodeCounter = 0;
	//var tmpResponses = new Array();
	contentText = runGapInlineChoiceInteractionNode(contentElement, data, body, nodeCounter);
	
	data['content'] = contentText;
	tinyMCE.selectedNode = selectedNode;
	tinyMCE.execCommand('mceGapInlineChoice', false, data);
}

//choiceInteraction DblClick
function runChoiceInteraction(selectedNode) {
	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	var sectionDiv = selectedNode;
	while(sectionDiv.nodeName != 'DIV') {
		sectionDiv = sectionDiv.parentNode;
	}

	var answers = new Array();
	var points = new Array();
	var ids = new Array();
	var fixed = new Array();
	var fdb = new Array();
	var data = new Array();

	//choiceInteraction comment as node
	var ch = sectionDiv.previousSibling.nodeValue;

	var identifier = $(ch).attr('responseIdentifier');
	var shuffle = $(ch).attr('shuffle');
	var maxChoices = $(ch).attr('maxChoices');

	//question content
	data.push(sectionDiv.firstElementChild.innerHTML);	

	var feedback = null;
	var smCh = null;
	var feedbacks = new Array();
	for (i = 0; i < sectionDiv.childNodes.length; i++) {

		if (sectionDiv.childNodes[i].nodeType == 8) { //if Comment

			if (sectionDiv.childNodes[i].nextSibling.nextElementSibling.checked == true) {
				points.push('1');
			} else {
				points.push('0');
			}
			smCh = tinymce.trim(sectionDiv.childNodes[i].nodeValue);
			ids.push($(smCh).attr('identifier'));
			fixed.push($(smCh).attr('fixed'));
			var simpleCh = $(smCh).get(0);
			var ansText = '';
			for (var j = 0; j < simpleCh.childNodes.length; j++) {
				if (1 == simpleCh.childNodes[j].nodeType) {
					if ('IMG' == simpleCh.childNodes[j].tagName) {
						ansText += '<img src="'+simpleCh.childNodes[j].getAttribute('src')+'"/>'
					} else if ('FEEDBACKINLINE' == simpleCh.childNodes[j].tagName) {
						feedbacks[$(smCh).attr('identifier')] = {text: simpleCh.childNodes[j].innerHTML, sound: null};
					} else {
						ansText += xh.prepareNode(simpleCh.childNodes[j]);
						//ansText += '<'+simpleCh.childNodes[j].tagName.toLowerCase()+xh.prepareAttributes(simpleCh.childNodes[j])+'>';
						//ansText += simpleCh.childNodes[j].innerHTML;
						//ansText += '</'+simpleCh.childNodes[j].tagName.toLowerCase()+'>';
					}
				} else {
					ansText += simpleCh.childNodes[j].nodeValue;
				}
			}
			answers.push(ansText);
		}
	}
	fdb[identifier] = feedbacks;

	data.push(answers);
	data.push(points);
	data.push(ids);
	data.push(identifier);
	data.push(shuffle);
	data.push(fixed);
	data.push(maxChoices);
	data.push(fdb);
	data.push(new Array());
	tinyMCE.selectedNode = selectedNode;
	tinyMCE.execCommand('mceChoice', false, data);
}

//selectionInteraction DblClick
function runSelectionInteraction(selectedNode) {
	var sectionDiv = selectedNode;
	while(sectionDiv.nodeName != 'DIV') {
		sectionDiv = sectionDiv.parentNode;
	}

	var body = sectionDiv;
	while(body.nodeName != 'BODY') {
		body = body.parentNode;
	}

	var simpleChoices = new Array();
	var items = new Array();

	var answers = new Array();
	var ids_ch = new Array();
	var ids_ans = new Array();
	var choices = new Array();
	var fixed_ans = new Array();
	var feedbacks = new Array();
	var points = new Array();
	var question = '';

	//choiceInteraction comment as node
	var sh = sectionDiv.previousSibling.nodeValue;

	var identifier = $(sh).attr('responseIdentifier');
	var shuffle = $(sh).attr('shuffle');

	//question content
	question = sectionDiv.firstElementChild.innerHTML;	
	var tBody = sectionDiv.firstElementChild.nextElementSibling.firstElementChild;

	for (var i = 0; i < tBody.childNodes.length; i++) {

		if (i == 0) { //sekcja z options

			for (var j = 1; j < tBody.childNodes[i].childNodes.length; j++) {
				simpleChoices.push($(tBody.childNodes[i].childNodes[j].firstChild.nodeValue).get(0));
			}

		} else { //sekcja z items
			items.push($(tBody.childNodes[i].childNodes[0].firstChild.nodeValue).get(0));
		}
	}

	feedbacks['text'] = new Array();

	for (var i in items) {
		var onOk= '';
		var onWrong = '';

		for (var j = items[i].childNodes.length-1; j > 0; j--) {

			if ('FEEDBACKINLINE' == items[i].childNodes[j].tagName) {
			
				if ('CORRECT' == items[i].childNodes[j].getAttribute('mark')) {
					onOk = items[i].childNodes[j].innerHTML;
					items[i].removeChild(items[i].childNodes[j]);

				} else if ('WRONG' == items[i].childNodes[j].getAttribute('mark')){
					onWrong = items[i].childNodes[j].innerHTML;
					items[i].removeChild(items[i].childNodes[j]);
				}
			}
		}
		fixed_ans.push(items[i].getAttribute('fixed'));
		ids_ans.push(items[i].getAttribute('identifier'));
		feedbacks['text'][items[i].getAttribute('identifier')] = {onOk: onOk, onWrong: onWrong};
		answers.push(items[i].innerHTML);
	}

	for ( var i in simpleChoices) {
		ids_ch.push(simpleChoices[i].getAttribute('identifier'));
		choices.push(simpleChoices[i].innerHTML);
	}

	var xh = tinymce.EditorManager.activeEditor.XmlHelper;
	var correctResponse = xh.getCorrectResponseById(body, identifier);

	for(var i = 0; i < correctResponse.length; i++) {
		var rs = correctResponse[i].split(' ');
		points[rs[0]] = rs[1];
	}

	var data = new Array();
	data['answers'] = answers;
	data['choices'] = choices;
	data['identifier'] = identifier;
	data['question'] = question;
	data['shuffle'] = shuffle;
	data['feedbacks'] = feedbacks;
	data['ids_ans'] = ids_ans;
	data['ids_ch'] = ids_ch;
	data['fixed_ans'] = fixed_ans;
	data['points'] = points;
	data.fd = new Array();

	tinyMCE.selectedNode = selectedNode;
	tinyMCE.execCommand('mceSelection', false, data);
}

//mediaLib DblClick
function runMediaLib(selectedNode) {

	var ed = tinymce.EditorManager.activeEditor;
	if(selectedNode.nodeName == 'IMG') {
		var node = selectedNode;
	} else {
		var node = selectedNode.getElementsByTagName('img')[0];
	}
	
	if(node.getAttribute('id') == 'mceVideo') {
		var src = node.previousSibling.getAttribute('data');
		var title = '';
		if(node.previousSibling.attributes['alt'] != undefined) {
			title = node.previousSibling.getAttribute('alt');
		}
//		title = $('<div/>').html(node.previousSibling.getAttribute('alt')).html();
		/*if (null != node.nextSibling.nextSibling) {
			title = node.nextSibling.nextSibling.nodeValue;
		}*/
		tinyMCE.execCommand('mceAddVideo', false, {src: src, title: title});
	} else {
		var src = node.attributes['src'].value;
		var title = '';
		if(node.attributes['alt'] != undefined) {
			title = node.getAttribute('alt');
			//var title = $('<div/>').html(node.attributes['alt'].value).html();
		}
		var data = {src: src, title: title};
		tinyMCE.execCommand('mceAppendImageToPage', false, data);
	}
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
	content = content.replace(/<p id="choiceInteraction">([^<]*)<\/p>/gi, '');
	content = content.replace(/<!-- (<simpleChoice[^>]*>([^<]*|[^<]*<img[^>]*>[^<]*)<\/simpleChoice>) --><br[^>]*><input id="choiceInteraction" [^>]*>(<img[^>]*>|[^<]*)/gi,'');
	content = content.replace(/<\/p><\/div><!-- end of choiceInteraction -->/gi,'');
	
	content = content.replace(/(?:<p>)?<!-- (<inlineChoiceInteraction[^>]*>) -->(?:<\/p>)?<span id="inlineChoiceInteraction" class="mceNonEditable"[^>]*>/gi, '');
	content = content.replace(/<!-- (<inlineChoice[^>]*>[^<]*<\/inlineChoice>) --><span id="inlineChoiceAnswer"[^>]*>[^<]*(?:<span[^>]*>[^<]*<\/span>)?<\/span>/gi,'');
	content = content.replace(/<\/span>[^<]*(?:<\/p>)?[^<]*<!-- end of inlineChoiceInteraction -->/gi,'');
	
	content = content.replace(/(?:<p>)?<!-- (<orderInteraction[^>]*>) -->(?:<\/p>)?<div id="orderInteraction"[^>]*>/gi, '');
	content = content.replace(/<!-- (<simpleChoice[^>]*>([^<]*|[^<]*<img[^>]*>[^<]*)<\/simpleChoice>) -->(?:<\/p>)?<div id="orderOption" [^>]*>(<img[^>]*>|[^<]*)<\/div>/gi,'');
	content = content.replace(/<\/div><!-- end of orderInteraction -->/gi,'');
	
	content = content.replace(/<!-- (<matchInteraction[^>]*>) --><div id="matchInteraction" class="mceNonEditable"[^>]*>/gi, '');
	content = content.replace(/<p id="matchInteraction">([^<]*)<\/p><table[^>]*><tbody><tr[^>]*>/gi, '');
	content = content.replace(/<td id="canvas_td"[^>]*><canvas[^>]*><\/canvas><\/td>/gi, '');
	content = content.replace(/<!-- (<simpleMatchSet>) --><td[^>]*><table[^>]*><tbody>/gi, '');
	content = content.replace(/(<tr id="canvas_tr"[^>]*><td[^>]*><canvas id="canvas"[^>]*><\/canvas><\/td><\/tr>)/gi,'');
	content = content.replace(/<!-- (<simpleAssociableChoice[^>]*>([^<]*|[^<]*<img[^>]*>[^<]*)<\/simpleAssociableChoice>) --><tr[^>]*><td[^>]*><span[^>]*>[^<]*<\/span><span[^>]*>[^<]*<\/span><span[^>]*>([^<]*|[^<]*<img[^>]*>[^<]*)<\/span><\/td><\/tr>/gi, '');
	content = content.replace(/<!-- (<\/simpleMatchSet>) --><\/tbody><\/table><\/td>/gi, '');
	content = content.replace(/<\/tr><\/tbody><\/table><\/div><!-- end of matchInteraction -->/gi, '');
	
	content = content.replace(/(<!-- (<modalFeedback [^>]*>[^<]*<\/modalFeedback>) -->)(?! -->)/gi, '');
	
	return content;
	
}

function subsup2mathml(text, isInPrompt){
	var firstTag;
	var secondTag;
	var junctionPos;
	while (text.indexOf("</sub><sup>") != -1 || text.indexOf("</sup><sub>") != -1){
		if (text.indexOf("</sub><sup>") != -1){
			juctionPos = text.indexOf("</sub><sup>");
			firstTag = "sub";
			secondTag = "sup";
		} else if (text.indexOf("</sup><sub>") != -1){
			juctionPos = text.indexOf("</sup><sub>");
			firstTag = "sup";
			secondTag = "sub";
		}
		var firstOpenPos = text.lastIndexOf("<"+firstTag+">", juctionPos);
		var secondClosePos = text.indexOf("</"+secondTag+">", juctionPos);
		var leadingSpacePos = text.lastIndexOf(" ", firstOpenPos);
		var leadingCloseTagPos = text.lastIndexOf(">", firstOpenPos);
		if (leadingCloseTagPos > leadingSpacePos)
			leadingSpacePos = leadingCloseTagPos;
		if (firstOpenPos > 0  &&  secondClosePos != -1){
			var baseValue = text.substring(leadingSpacePos+1, firstOpenPos);
			baseValue = baseValue.replace(new RegExp(/<[^>]+>/g), "");
			var firstValue = text.substring(firstOpenPos+5, juctionPos);
			firstValue = firstValue.replace(new RegExp(/<[^>]+>/g), "");
			var secondValue = text.substring(juctionPos+11, secondClosePos);
			secondValue = secondValue.replace(new RegExp(/<[^>]+>/g), "");
			var boldClass = '';
			
			if (isInPrompt) {
				boldClass = ' class="mathBold"';
			}
			var mathml = '<mathText'+boldClass+'><mrow><msubsup><mrow>';
			mathml += "<ms>" + baseValue + "</ms>";
			mathml += "</mrow><mrow>";
			if (firstTag == "sub"){
				mathml += "<ms>" + firstValue + "</ms>";
			} else {
				mathml += "<ms>" + secondValue + "</ms>";
			}
			mathml += "</mrow><mrow>";
			if (firstTag == "sub"){
				mathml += "<ms>" + secondValue + "</ms>";
			} else {
				mathml += "<ms>" + firstValue + "</ms>";
			}
			mathml += "</mrow></msubsup></mrow></mathText>";
			
			text = text.substring(0, leadingSpacePos+1) + mathml + text.substring(secondClosePos+6);
		}
	}
	return text
}

function mathml2subsup(text){

	if (text.toLowerCase().indexOf("<mathtext") != -1){

		var mathTextOpenPos = text.toLowerCase().indexOf("<mathtext");
		var mathTextClosePos = text.toLowerCase().indexOf("</mathtext");
		var firstMsOpenPos = text.indexOf("<ms>", mathTextOpenPos);
		var firstMsClosePos = text.indexOf("</ms>", mathTextOpenPos);
		var secondMsOpenPos = text.indexOf("<ms>", firstMsOpenPos+1);
		var secondMsClosePos = text.indexOf("</ms>", firstMsClosePos+1);
		var thirdMsOpenPos = text.indexOf("<ms>", secondMsOpenPos+1);
		var thirdMsClosePos = text.indexOf("</ms>", secondMsClosePos+1);
		if (firstMsOpenPos != -1  &&  firstMsClosePos != -1  &&
			secondMsOpenPos != -1  &&  secondMsClosePos != -1  &&
			thirdMsOpenPos != -1  &&  thirdMsClosePos != -1  &&
			thirdMsClosePos < mathTextClosePos){
			var firstValue = text.substring(firstMsOpenPos+4, firstMsClosePos);
			var secondValue = text.substring(secondMsOpenPos+4, secondMsClosePos);
			var thirdValue = text.substring(thirdMsOpenPos+4, thirdMsClosePos);
			text = text.substring(0, mathTextOpenPos) + 
				firstValue + "<sub>" + secondValue + "</sub><sup>" + thirdValue + "</sup>" +
				text.substring(mathTextClosePos+11);
		}
	}
	return text;
}

function parseMathHTML2QTI(math, isInPrompt) {
	var className = '';
	if (true == isInPrompt) {
		className = ' class="mathBold"';
	}
	math = math.replace(/<math[^>]*>/g,'<mathText'+className+'>');
	math = math.replace(/<\/math>/g,'</mathText>');
	//Jezeli nie ma <math> to może być fraza </sub><sup> która też powinna być zamieniana na math
	math = subsup2mathml(math, isInPrompt);
	return math;
}

function parseMathQTI2HTML(math) {
	math = mathml2subsup(math);
	math = math.replace(/<mathText[^>]*>/gi, '<math>');
	math = math.replace(/<\/mathText>/gi, '</math>');
	return math;
}

