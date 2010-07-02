package eu.ydp.qtiPageEditor.client.model.jso;

import com.google.gwt.core.client.JavaScriptObject;

import eu.ydp.qtiPageEditor.client.appcallback.TinyMceCreatedCallback;

public class ModuleConfig extends JavaScriptObject {
	
	protected ModuleConfig(){};
	
	public final native String getPageURL()/*-{
		return this.pageBasePath
	}-*/;
	
	public final native String getCellId()/*-{
		return this.cellId
	}-*/;
	
	public final native TinyMceCreatedCallback getTinyMceCreatedCallback()/*-{
		return this.tinyMceCreatedCallback
	}-*/;
	
	

	

}
