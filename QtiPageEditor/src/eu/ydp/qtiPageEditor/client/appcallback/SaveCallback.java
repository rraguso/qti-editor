package eu.ydp.qtiPageEditor.client.appcallback;

import com.google.gwt.core.client.JavaScriptObject;

public class SaveCallback extends JavaScriptObject {
	
	protected SaveCallback(){
		
	}
	
	public final native void onSaveComplete()/*-{
		this.onSaveComplete()
	}-*/;

	public final native void onSaveError(JavaScriptObject error)/*-{
		this.onSaveError(error)
	}-*/;

}
