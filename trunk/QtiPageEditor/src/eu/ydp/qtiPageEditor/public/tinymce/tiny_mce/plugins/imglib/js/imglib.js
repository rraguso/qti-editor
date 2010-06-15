tinyMCEPopup.requireLangPack();

var imglibDialog = {
	init : function(ed) {
		
		this.ed = ed;
		var f = document.forms[0]; 
		this.selectedSrc = tinyMCEPopup.getWindowArg("src");
		this.div = tinyMCEPopup.getWindowArg("div");
		$('#uploading_file_form').attr('action', parent.apiPrefixUrl + 'mceUpload' + parent.requestedPath);
		
	},
	
	getImagesList : function() {
		
		$.ajax({
			url: parent.apiPrefixUrl + 'mceListImages' + parent.requestedPath,
			data: {},
			type: 'POST',
			dataType: 'json',
			success: function (json) {
				imglibDialog.prepareImagesList(json);
			}
		});
		
	},
	
	prepareImagesList : function(json) {
		
		i = 0;
		for(i in json) {
			var option = '<option value="' + json[i] + '"';
			if(this.selectedSrc != undefined && this.selectedSrc == i) {
				option += ' selected';
			}
			option += '>' + i + '</option>';
			$('#available_files').append(option);
		}
		this.viewThumb($('#available_files')[0]);
		
	},
	
	viewThumb : function(select) {
		$('#thumb').html('<img style="max-height: 120px; max-width: 200px;" src="' + select.value + '" border=0>');
	},
	
	insertImageIntoPage : function() {
	
		var ed = this.ed;
		var imgSrc = $('#thumb > img').attr('src');
		var imgTag = '<img src="' + imgSrc + '" border="0" />';
		ed.selection.moveToBookmark(ed.selection.getBookmark());
		tinyMCE.execCommand('mceInsertContent', false, imgTag);
		tinyMCEPopup.close();
		return true;
		
	},
	
	insertImageIntoChoiceWindow : function() {
		
		var imgSrc = $('#thumb > img').attr('src');
		this.div.innerHTML = '<img style="max-height: 40px; max-width: 80px;" src="' + imgSrc + '">';
		this.div.previousSibling.setAttribute('value',imgSrc);
		tinyMCEPopup.close();
		return true;
		
	}

};

tinyMCEPopup.onInit.add(imglibDialog.init, imglibDialog);

