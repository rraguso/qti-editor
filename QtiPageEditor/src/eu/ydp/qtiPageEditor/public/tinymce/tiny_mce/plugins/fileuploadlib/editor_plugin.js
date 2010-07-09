(function() {

	tinymce.create('tinymce.plugins.fileUploadLib', {
		
		init : function(ed, url) {
			
			ed.addCommand('mceAppendImageToPage', function(ui, src) {
				
				var browseCallback = {
				
					onBrowseComplete : function(filePath) {
						var imgTag = '<img src="' + filePath + '" border="0" />';
						ed.selection.moveToBookmark(ed.selection.getBookmark());
						tinyMCE.execCommand('mceInsertContent', false, imgTag);
						return true;
					},
					
					onBrowseError : function(error) {
						alert(error);
						return false;
					}
					
				}
				
				var extensions = [".jpg",".jpeg", ".gif", ".bmp", ".png"];
				
				var assetBrowser = tinyMCE.gwtProxy.getAssetBrowser();
				
				if(src != undefined && src != '') {
					srcArr = src.split('/');
					fileName = String(srcArr[srcArr.length-1]);
					assetBrowser.setSelectedFile(fileName);
				}
				
				assetBrowser.browse(browseCallback, extensions);
				
			});
			
			ed.addCommand('mceAppendImageToExercise', function(ui,data) {
			
				var browseCallback = {
				
					onBrowseComplete : function(filePath) {
						var imgSrc = $('#thumb > img').attr('src');
						data.div.innerHTML = '<img style="max-height: 40px; max-width: 80px;" src="' + filePath + '">';
						data.div.previousSibling.setAttribute('value',filePath);
						return true;
					},
					
					onBrowseError : function(error) {
						alert(error);
						return false;
					}
					
				}
				
				var extensions = [".jpg",".jpeg", ".gif", ".bmp", ".png"];
				
				var assetBrowser = tinyMCE.gwtProxy.getAssetBrowser();
				
				if(data.src != undefined && data.src != '') {
					srcArr = data.src.split('/');
					fileName = String(srcArr[srcArr.length-1]);
					assetBrowser.setSelectedFile(fileName);
				}
				
				assetBrowser.browse(browseCallback, extensions);
			
			});
			
			ed.addCommand('mceAddFeedbackSound', function(ui,data) {
				
				var browseCallback = {
				
					onBrowseComplete : function(filePath) {
						filePath = filePath.split('/');
						filePath = String(filePath[filePath.length-2] + '/' + filePath[filePath.length-1]);
						data.dest.setAttribute('value', filePath);
						return true;
					},
					
					onBrowseError : function(error) {
						alert(error);
						return false;
					}
					
				}
				
				var extensions = [".mp3"];
				
				var assetBrowser = tinyMCE.gwtProxy.getAssetBrowser();
				
				if(data.src != undefined && data.src != '') {
					srcArr = data.src.split('/');
					fileName = String(srcArr[srcArr.length-1]);
					assetBrowser.setSelectedFile(fileName);
				}
				
				assetBrowser.browse(browseCallback, extensions);
			
			});
			
			ed.addButton('fileuploadlib_image', {title : 'Upload / insert image', cmd : 'mceAppendImageToPage'});
			
		},

		getInfo : function() {
			return {
				longname : 'Plugin managing picture uploads',
				author : '<a target="_blank" href="http://www.ydp.eu">Young Digital Planet</a>',
				authorurl : '',
				infourl : '',
				version : "2.0"
			};
		}
	});

	tinymce.PluginManager.add('fileuploadlib', tinymce.plugins.fileUploadLib);
})();
