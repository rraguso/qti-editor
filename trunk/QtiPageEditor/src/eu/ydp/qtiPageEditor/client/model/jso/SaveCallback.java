package eu.ydp.qtiPageEditor.client.model.jso;

import com.google.gwt.core.client.JavaScriptObject;

public class SaveCallback extends JavaScriptObject {
	
	protected SaveCallback(){
		
	}
	
	public final native void onSaveComplete(String content)/*-{
		this.onSaveComplete(content)
	}-*/;

	public final native void onSaveError(JavaScriptObject error)/*-{
		this.onSaveError(error)
	}-*/;

}
