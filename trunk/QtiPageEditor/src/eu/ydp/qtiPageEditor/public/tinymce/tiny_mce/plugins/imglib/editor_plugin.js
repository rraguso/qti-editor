(function() {
	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack('imglib');

	tinymce.create('tinymce.plugins.imglibPlugin', {
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
			ed.addCommand('mceImglib', function(ui, src) {
				ed.windowManager.open({
					file : url + '/imglib.htm',
					width : 500,
					height : 350,
					inline : 1
				}, {
					plugin_url : url, // Plugin absolute URL
					src: src
				});
			});
			
			ed.addCommand('mceImgChoice', function(ui, data) {
				ed.windowManager.open({
					file : url + '/imgchoice.htm',
					width : 500,
					height : 350,
					inline : 1
				}, {
					plugin_url : url, // Plugin absolute URL
					src: data.src,
					div: data.div
				});
			});
			
			// Register example button
			ed.addButton('imglib', {
				title : 'Upload / insert image for QTI',
				cmd : 'mceImglib',
				image : url + '/img/imglib.png'
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
	tinymce.PluginManager.add('imglib', tinymce.plugins.imglibPlugin);
})();
