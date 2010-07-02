package eu.ydp.qtiPageEditor.client.appcallback;

import com.google.gwt.core.client.JavaScriptObject;

public class TinyMceCreatedCallback extends JavaScriptObject {
	
	protected TinyMceCreatedCallback(){		
	}
	
	public final native void onTinyMceCreated()/*-{
		this.onTinyMceCreated()
	}-*/;
	
	

}
