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
				
				ed.windowManager.open({
					file : url + '/gap.htm',
					width : 400,
					height : 100,
					inline : 1
				}, {
					plugin_url : url, // Plugin absolute URL
					gapdata : data
				});
				
			});
			
			ed.addCommand('mceGapRemove', function(ui, data) {
				
				var selectedNode = ed.selection.getNode();
				if(selectedNode.nodeName == 'SPAN' && selectedNode.id == 'gap') {
					var gapContent = selectedNode.innerHTML;
					selectedNode.parentNode.removeChild(selectedNode.previousSibling);
					selectedNode.parentNode.removeChild(selectedNode);
					tinyMCE.execCommand('mceInsertContent', false, gapContent);
				}
				return true;
			
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
