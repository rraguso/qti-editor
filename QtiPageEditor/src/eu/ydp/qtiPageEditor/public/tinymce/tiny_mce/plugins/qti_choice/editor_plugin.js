(function() {
	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack('choice');

	tinymce.create('tinymce.plugins.choicePlugin', {
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
			ed.addCommand('mceChoice', function(ui, data) {

				if(data != undefined) {
					tinyMCE.feedback = new Array;
					tinyMCE.feedback[data[4]] = {text: new Array, sound: new Array}
					if(data[8] != undefined ) {
						tinyMCE.feedback[data[4]] = data[8][data[4]];
					}
					/*if(data[9] != undefined ) {
						tinyMCE.feedback[data[4]].sound = data[9];
					}*/
				}
				
				ed.windowManager.open({
					file : url + '/choice.htm',
					width : 500,
					height : 450,
					inline : 1
				}, {
					plugin_url : url, // Plugin absolute URL
					choicedata : data
				});
				
			});
			
			ed.addCommand('mceChoiceRemove', function(ui, data) {
				
				var node = ed.selection.getNode();
				while(node.nodeName != 'DIV') {
					node = node.parentNode;
				}
				
				var body = node;
				while(body.nodeName != 'BODY') {
					body = body.parentNode;
				}
				var responseId = node.previousSibling.data.match(/responseIdentifier="([^"]*)"/i);
				node.parentNode.removeChild(node.previousSibling);
				node.parentNode.removeChild(node.nextSibling);
				node.parentNode.removeChild(node);
				
				var xh = ed.XmlHelper;
				var correctResponseNode = xh.getCorrectResponseNodeId(body, responseId[1]);
				correctResponseNode.parentNode.removeChild(correctResponseNode);
				
				return true;
				
			});
			
			ed.addCommand('mceFeedbackChoice', function(ui,data) {
				
				if ("undefined" == typeof ed.windowManager.isFeedbackOpened) {
					ed.windowManager.isFeedbackOpened = true;
					ed.windowManager.open({
						file : url + '/feedback.htm',
						width : 400,
						height : 120,
						inline : 1
					}, {
						plugin_url : url, // Plugin absolute URL
						data: {exerciseid: data.exerciseid, identifier: data.identifier, feedback: data.feedback, feedback_sound: data.feedback_sound}
					});
				}
			});
			
			ed.addCommand('mceFeedbackChoiceRemove', function(ui,data) {
				
				var form = data;
				while(form.nodeName != 'FORM') {
					form = form.parentNode;
				}

				if(tinyMCE.feedback != undefined && tinyMCE.feedback[form.exerciseid.value] != undefined) {
					var tempArr = new Array;
					for(i in tinyMCE.feedback[form.exerciseid.value]) {
						if(i != form.identifier.value) {
							tempArr[i] = tinyMCE.feedback[form.exerciseid.value][i];
						}
					}
					tinyMCE.feedback[form.exerciseid.value] = tempArr;
				}
			});

			ed.addButton('insertchoicesection', {title : 'Insert choice activity', cmd : 'mceChoice'});			
			ed.onNodeChange.add(function(ed, cm, n) {

				if ('BODY' == ed.selection.getNode().nodeName) {
					cm.setDisabled('insertchoicesection', true);
				} else {
					cm.setDisabled('insertchoicesection', false);
				}
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
				longname : 'Plugin for creating and managing multiple choice activities',
				author : '<a target="_blank" href="http://www.ydp.eu">Young Digital Planet</a>',
				authorurl : '',
				infourl : '',
				version : "1.2"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('qti_choice', tinymce.plugins.choicePlugin);
})();
