(function() {
	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack('gap');

	tinymce.create('tinymce.plugins.gapPlugin', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
			ed.addCommand('mceGap', function(ui, data) {
				
				if(data != undefined) {
					if((data.onok != undefined && data.onok != '') || (data.onwrong != undefined && data.onwrong != '')) {
						tinyMCE.feedback = new Array;
						tinyMCE.feedback[data.id] = {};
					}
					if(data.onok != undefined && data.onok != '') {
						tinyMCE.feedback[data.id].onok = data.onok;
					}
					if(data.onwrong != undefined && data.onwrong != '') {
						tinyMCE.feedback[data.id].onwrong = data.onwrong;
					}
				}
				
				ed.windowManager.open({
					file : url + '/gap.htm',
					width : 400,
					height : 110,
					inline : 1
				}, {
					plugin_url : url, // Plugin absolute URL
					gapdata : data
				});
				
			});
			
			ed.addCommand('mceGapRemove', function(ui, data) {
				
				var selectedNode = ed.selection.getNode();
				if(selectedNode.nodeName == 'SPAN' && selectedNode.id == 'gap') {
					var gapComment = selectedNode.previousSibling;
					var gapId = /<gap[^>]*identifier="([^"]*)"[^>]*>/i.exec(gapComment.data);
					gapId = gapId[1];
					var rg = new RegExp('<!-- <modalFeedback[^>]*outcomeIdentifier="' + gapId + '"[^>]*>[^<]*<\/modalFeedback> -->','gi');
					
					var gapContent = selectedNode.innerHTML;
					selectedNode.parentNode.removeChild(selectedNode.previousSibling);
					selectedNode.parentNode.removeChild(selectedNode);
					tinyMCE.execCommand('mceInsertContent', false, gapContent);
					tinyMCE.activeEditor.selection.dom.doc.body.innerHTML = tinyMCE.activeEditor.selection.dom.doc.body.innerHTML.replace(rg,'');
				}
				return true;
			
			});
			
			ed.addCommand('mceFeedbackGap', function(ui,data) {
				
				ed.windowManager.open({
					file : url + '/feedback.htm',
					width : 400,
					height : 130,
					inline : 1
				}, {
					plugin_url : url, // Plugin absolute URL
					data: {identifier: data.identifier, feedback: data.feedback}
				});
				
			});
			
			ed.addCommand('mceFeedbackGapRemove', function(ui,data) {
				
				var form = data;
				while(form.nodeName != 'FORM') {
					form = form.parentNode;
				}
				if(tinyMCE.feedback != undefined) {
					var tempArr = new Array;
					for(i in tinyMCE.feedback) {
						if(i != form.identifier.value) {
							tempArr[i] = tinyMCE.feedback[i];
						}
					}
					tinyMCE.feedback = tempArr;
				}
				
			});

			// Register example button
			ed.addButton('gap', {
				title : 'Insert gap',
				cmd : 'mceGap',
				image : url + '/img/gap_add.png'
			});

		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'Plugin for creating and managing QTI',
				author : 'Olaf Galazka',
				authorurl : '',
				infourl : '',
				version : "1.0"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('gap', tinymce.plugins.gapPlugin);
})();