package eu.ydp.qtitesteditor.client;

import com.google.gwt.core.client.EntryPoint;

import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.env.impl.EditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.model.jso.ModuleConfig;
import eu.ydp.qtiPageEditor.client.serviceregistry.ServicesRegistry;
import eu.ydp.webapistorage.client.storage.impl.Storage;
/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class QtiTestEditor implements EntryPoint {
	
	/**
	 * This is the entry point method.
	 */
	public void onModuleLoad() {
		publish();
		
	}
	
	private native void publish()/*-{
		var me = this;
		
		if(typeof($wnd.qti_test_editor) == "object")
		{
			if(typeof($wnd.qti_test_editor.register) != "function"){
				
				$wnd.qti_test_editor.register = function(config){					
					me.@eu.ydp.qtitesteditor.client.QtiTestEditor::register(Leu/ydp/qtiPageEditor/client/model/jso/ModuleConfig;)(config);
				}
			}
			
			if(typeof($wnd.qti_test_editor.onModuleLoaded) == "function")
				$wnd.qti_test_editor.onModuleLoaded();		
		}
		
	}-*/;
	
	private void register(ModuleConfig conf)
	{
		ServicesRegistry reg = new ServicesRegistry();
		IEditorEnvirnoment env = new EditorEnvirnoment(conf.getPageURL(), Storage.getInstance(), reg);		
		
		QtiTestEditorFasade.getInstance(QtiTestEditorFasade.KEY).startup(env, conf.getCellId());
	}

}
