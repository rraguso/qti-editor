package eu.ydp.qtiPageEditor.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.JavaScriptObject;
import com.google.gwt.event.shared.HandlerManager;
import com.google.gwt.user.client.DOM;

import eu.ydp.qtiPageEditor.client.constance.Constances;
import eu.ydp.qtiPageEditor.client.controller.startupdata.StartupData;
import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.env.impl.EditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.events.TinyMceSaveEvent;
import eu.ydp.qtiPageEditor.client.model.jso.ModuleConfig;
import eu.ydp.qtiPageEditor.client.model.jso.SaveCallback;
import eu.ydp.qtiPageEditor.client.serviceregistry.ServiceFactory;
import eu.ydp.qtiPageEditor.client.serviceregistry.ServicesRegistry;
import eu.ydp.webapistorage.client.storage.impl.Storage;


/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class QtiPageEditor implements EntryPoint {
		
	private IEditorEnvirnoment _env;
	
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
				
				$wnd.qti_page_editor.setPath = function(path){					
					me.@eu.ydp.qtiPageEditor.client.QtiPageEditor::setPath(Ljava/lang/String;)(path);
				}
				
				$wnd.qti_page_editor.loadPage = function(){					
					me.@eu.ydp.qtiPageEditor.client.QtiPageEditor::loadPage()();
				}
				
				$wnd.qti_page_editor.setSaveCallback = function(callback){					
					me.@eu.ydp.qtiPageEditor.client.QtiPageEditor::setJsSaveCallback(Leu/ydp/qtiPageEditor/client/model/jso/SaveCallback;)(callback);	
				}				
			}
			
			if(typeof($wnd.qti_page_editor.onModuleLoaded) == "function")
				$wnd.qti_page_editor.onModuleLoaded();		
		}
		
	}-*/;
	
	private void register(ModuleConfig conf )
	{	
		ServicesRegistry sr = new ServicesRegistry(new ServiceFactory());
		_env = new EditorEnvirnoment(conf.getPageURL(),"media", Storage.getInstance(), sr);
		StartupData startupData = new StartupData(_env, conf.getCellId());
		ApplicationFasade.getInstance(ApplicationFasade.KEY).startup(startupData);			
	}
	
	private void setPath(String path){		
		ApplicationFasade facade = ApplicationFasade.getInstance(ApplicationFasade.KEY);
		_env.setBasePath(path);
		if(facade != null){
			facade.sendNotification(Constances.SET_PAGE_PATH, path);
		}
	}
	
	private void loadPage(){
		ApplicationFasade facade = ApplicationFasade.getInstance(ApplicationFasade.KEY);
		if(facade != null){
			facade.sendNotification(Constances.RELOAD_PAGE,0);
		}
	}
	
	private void setJsSaveCallback(SaveCallback callback){
		ApplicationFasade facade = ApplicationFasade.getInstance(ApplicationFasade.KEY);
		if(facade != null){
			facade.sendNotification(Constances.SET_JS_SAVE_CALLBACK, callback);
		}	
	}
}
