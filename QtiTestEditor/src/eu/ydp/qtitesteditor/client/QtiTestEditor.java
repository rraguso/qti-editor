package eu.ydp.qtitesteditor.client;

import com.google.gwt.core.client.EntryPoint;


import eu.ydp.qtiPageEditor.client.constance.Constances;
import eu.ydp.qtiPageEditor.client.controller.startupdata.StartupData;
import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.env.impl.EditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.model.jso.ModuleConfig;
import eu.ydp.qtiPageEditor.client.serviceregistry.ServiceFactory;
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
				
				$wnd.qti_test_editor.setTinyMCECellWidth = function(width){
					me.@eu.ydp.qtitesteditor.client.QtiTestEditor::onSetTinyMceWidth(Ljava/lang/String;)(width)
				}
				
				$wnd.qti_test_editor.setTinyMCECellHeight = function(height){
					me.@eu.ydp.qtitesteditor.client.QtiTestEditor::onSetTinyMceHeight(Ljava/lang/String;)(height)
				}
			}
			
			if(typeof($wnd.qti_test_editor.onModuleLoaded) == "function")
				$wnd.qti_test_editor.onModuleLoaded();		
		}
		
	}-*/;
	
	private void register(ModuleConfig conf)
	{
		ServicesRegistry reg = new ServicesRegistry(new ServiceFactory());
		IEditorEnvirnoment env = new EditorEnvirnoment(conf.getPageURL(), "script_00001/media", Storage.getInstance(), reg);		
		StartupData startupData = new StartupData(env, conf.getCellId());
		QtiTestEditorFasade.getInstance(QtiTestEditorFasade.KEY).startup(startupData);
	}
	
	private void onSetTinyMceWidth(String width){
		
		QtiTestEditorFasade facade = QtiTestEditorFasade.getInstance(QtiTestEditorFasade.KEY);
		if(facade != null)
			facade.sendNotification(Constances.SET_TINY_CELL_SIZE, width, "width");
		
	}
	
	private void onSetTinyMceHeight(String height){
		QtiTestEditorFasade facade = QtiTestEditorFasade.getInstance(QtiTestEditorFasade.KEY);
		if(facade != null)
			facade.sendNotification(Constances.SET_TINY_CELL_SIZE, height, "height");
	}

}
