tinyMCE.init({  
				theme : "advanced",  
				mode: "textareas",  
				elements : "content",  
				plugins : "safari,spellchecker,pagebreak,style,layer,table,save,advhr,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,imagemanager,filemanager,noneditable,choice,gap,inlinechoice,order,imglib,applink",
			    
				theme_advanced_toolbar_location : "top",
				theme_advanced_toolbar_align : "left",
				theme_advanced_statusbar_location : "bottom",
				theme_advanced_resizing : true,  
				theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",  
				theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,applink,cleanup,help,|,insertdate,inserttime,preview,|,forecolor,backcolor",			
				theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
				theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,spellchecker,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,blockquote,pagebreak,|,code,|,gap,inlinechoice,choice,order,|,imglib",  
				
			    extended_valid_elements : "gap[identifier],choiceInteraction[shuffle|maxChoices,responseIdentifier],prompt,simpleChoice[identifier|fixed],inlineChoiceInteraction,inlineChoice[score],assessmentItem[xmlns|identifier|title|adaptive|timeDependent],responseDeclaration[identifier|cardinality|baseType],correctResponse,value,itemBody,applink[lid|title]",
			    handle_event_callback : "actionOnQTI",
			    noneditable_leave_contenteditable : true,
				remove_linebreaks : false,
				apply_source_formatting : true, 
				entity_encoding : "",
				dialog_type : "modal",
				height:"85%",  
				width:"100%",  
				
				paste_auto_cleanup_on_paste : true,
				paste_preprocess : function(pl, o) {
					o.content = cutQTI(o.content);
				}
			    
			}); 		