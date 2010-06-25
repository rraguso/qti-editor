package eu.ydp.qtiPageEditor.client.serviceregistry.services.impl.assetbrowser;

import com.google.gwt.core.client.JavaScriptObject;

public class AssetBrowserCallback extends JavaScriptObject {
	
	protected AssetBrowserCallback(){};
	
	public final native void onBrowseComplete(String filePath)/*-{
		this.onFileSelected(filePath);
	}-*/;
	
	public final native void onBrowseError(Object error)/*-{
		this.onFileSelectError(error);
	}-*/;

		
	

}
