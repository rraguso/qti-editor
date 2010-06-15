package eu.ydp.qtiPageEditor.client;

import com.google.gwt.core.client.EntryPoint;

import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.env.impl.EditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.model.jso.ModuleConfig;
import eu.ydp.qtiPageEditor.client.serviceregistry.ServicesRegistry;
import eu.ydp.webapistorage.client.storage.impl.Storage;


/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class QtiPageEditor implements EntryPoint {
		
	public void onModuleLoad() 
	{
		publish();		
	}
	
	private native void publish()/*-{	
		
		var me = this	
				
		if(typeof($wnd.qti_page_editor) == "object")
		{
			if(typeof($wnd.qti_page_editor.register) != "function"){
				
				$wnd.qti_page_editor.register = function(config){					
					me.@eu.ydp.qtiPageEditor.client.QtiPageEditor::register(Leu/ydp/qtiPageEditor/client/model/jso/ModuleConfig;)(config);
				}
			}
			
			if(typeof($wnd.qti_page_editor.onModuleLoaded) == "function")
				$wnd.qti_page_editor.onModuleLoaded();		
		}
		
	}-*/;
	
	private void register(ModuleConfig conf )
	{	
		ServicesRegistry sr = new ServicesRegistry();
		IEditorEnvirnoment env = new EditorEnvirnoment(conf.getPageURL(), Storage.getInstance(), sr);
		
		ApplicationFasade.getInstance(ApplicationFasade.KEY).startup(env, conf.getCellId());			
	}
	
}
