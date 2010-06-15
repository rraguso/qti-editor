package eu.ydp.qtiPageEditor.client.env;


import eu.ydp.webapistorage.client.storage.IStorage;

public interface IEditorEnvirnoment {
	
	String getBasePath();
	
	IStorage getStorage();
	
	Object getService(String type);
}
