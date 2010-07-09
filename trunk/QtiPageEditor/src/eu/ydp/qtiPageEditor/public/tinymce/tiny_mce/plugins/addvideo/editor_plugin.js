(function() {

	tinymce.create('tinymce.plugins.addVideoPlugin', {
		
		init : function(ed, url) {
			
			ed.addCommand('mceAddVideo', function(ui, src) {
				
				var browseCallback = {
				
					onBrowseComplete : function(filePath) {
						srcArr = filePath.split('/');
						if(src != undefined && src != '') {
							var embed = ed.selection.getNode().previousSibling;
							if(embed.nodeName == 'EMBED') {
								embed.parentNode.removeChild(embed);
							}
						}
						var videotag = '<embed type="" src="' + String(srcArr[srcArr.length-2] + '/' + srcArr[srcArr.length-1]) + '" /><img id="mceVideo" src="/work/tools/qtitesteditor/tinymce/tiny_mce/plugins/addvideo/img/movie.png" />';
						ed.selection.moveToBookmark(ed.selection.getBookmark());
						tinyMCE.execCommand('mceInsertContent', false, videotag);
						return true;
					},
					
					onBrowseError : function(error) {
						alert(error);
						return false;
					}
					
				}
				
				var extensions = [".mp4",".swf", ".flv", ".avi"];
				
				var assetBrowser = tinyMCE.gwtProxy.getAssetBrowser();
				
				if(src != undefined && src != '') {
					srcArr = src.split('/');
					fileName = String(srcArr[srcArr.length-1]);
					assetBrowser.setSelectedFile(fileName);
				}
				
				assetBrowser.browse(browseCallback, extensions);
				
			});
			
			ed.addButton('addvideo', {title : 'Add video / flash movie', cmd : 'mceAddVideo'});
			
		},

		getInfo : function() {
			return {
				longname : 'Plugin uploading video',
				author : 'Young Digital Planet',
				authorurl : '',
				infourl : '',
				version : "1.0"
			};
		}
	});

	tinymce.PluginManager.add('addvideo', tinymce.plugins.addVideoPlugin);
})();
