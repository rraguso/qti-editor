tinyMCEPopup.requireLangPack();

var gapDialog = {
	init : function(ed) {
		
		var ed = ed;
		var f = document.forms[0]; 
		var data = tinyMCEPopup.getWindowArg("gapdata");
		
		if(data != undefined) {
			
			f.gap.value = data.value;
			if(data.id != '') {
				f.identifier.value = data.id;
			} else {
				var randid = Math.random();
				randid = String(randid);
				var rg = new RegExp('0.([0-9]*)',"gi");
				exec = rg.exec(randid);
				f.identifier.value = 'id_' + exec[1];
			}
		
		} else {
			
			f = document.forms[0];
			var randid = Math.random();
			randid = String(randid);
			var rg = new RegExp('0.([0-9]*)',"gi");
			exec = rg.exec(randid);
			f.identifier.value = 'id_' + exec[1];

			document.getElementById('gap_content').innerHTML += '<input type="hidden" name="addnew" value="1">';
			
			var removeButton = document.getElementById('remove_button');
			removeButton.parentNode.removeChild(removeButton);
			
			var insertButton = document.getElementById('insert');
			insertButton.setAttribute('value', 'Insert');
			
		}
		
	},

	insertGap : function(form) {
		
		var gap = form.gap.value;
		var identifier = form.identifier.value;
		if(gap != undefined && gap != '') {
			var ed = tinymce.EditorManager.activeEditor;
			ed.selection.moveToBookmark(ed.selection.getBookmark());
			if(form.addnew != undefined && form.addnew.getAttribute('value') == '1') {
				var gapTag = '<!-- <gap identifier="' + identifier + '">' + gap + '</gap> --><span id="gap" class="mceNonEditable" style="border: 1px solid blue; color: blue; background-color: #f0f0f0;">' + gap + '</span>';
				tinyMCE.execCommand('mceInsertContent', false, gapTag);
			} else {
				var gapTag = ed.selection.getNode();
				gapTag.innerHTML = gap;
				gapTag.previousSibling.data = gapTag.previousSibling.data.replace(/<gap>/gi, ' <gap identifier="' + identifier + '">');
				gapTag.previousSibling.data = gapTag.previousSibling.data.replace(/<gap identifier="">/gi, ' <gap identifier="' + identifier + '">');
				gapTag.previousSibling.data = gapTag.previousSibling.data.replace(/ <gap identifier="([^"]*)">[^<]*<\/gap> /gi, ' <gap identifier="$1">' + gap + '</gap> ');
			}
		}
		tinyMCEPopup.close();
		return true;
		
	}

};

tinyMCEPopup.onInit.add(gapDialog.init, gapDialog);

