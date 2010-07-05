/**
 * $Id: editor_plugin_src.js 1056 2009-03-13 12:47:03Z spocke $
 *
 * @author Moxiecode
 * @copyright Copyright © 2004-2008, Moxiecode Systems AB, All rights reserved.
 */

(function() {
	tinymce.create('tinymce.plugins.Preview', {
		init : function(ed, url) {

			ed.addCommand('mcePreview', function() {
				
				tinyMCE.gwtProxy.showPreview();
				
			});

			ed.addButton('preview', {title : 'preview.preview_desc', cmd : 'mcePreview'});
		},

		getInfo : function() {
			return {
				longname : 'Preview with QTI Player',
				author : 'Moxiecode Systems AB / Young Digital Planet',
				authorurl : '',
				infourl : '',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('preview', tinymce.plugins.Preview);
})();