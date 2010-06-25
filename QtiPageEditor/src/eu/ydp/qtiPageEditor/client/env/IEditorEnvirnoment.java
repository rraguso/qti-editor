package eu.ydp.qtiPageEditor.client.env;


import eu.ydp.webapistorage.client.storage.IStorage;

public interface IEditorEnvirnoment {
	
	String getBasePath();
	
	String getMediaDirectory();
	
	IStorage getStorage();
	
	Object getService(String type);
}
