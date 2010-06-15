package eu.ydp.qtiPageEditor.client.env.impl;

import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.serviceregistry.ServicesRegistry;
import eu.ydp.webapistorage.client.storage.IStorage;

public class EditorEnvirnoment implements IEditorEnvirnoment {

	String _basePath;
	IStorage _storage;
	ServicesRegistry _servicesRegistry;
	
	public EditorEnvirnoment(String basePath, IStorage storage, ServicesRegistry reg)
	{		
		_basePath = basePath;
		_storage = storage;
		_servicesRegistry = reg;
		
		reg.setEnv(this);
	}
	
	
	@Override
	public String getBasePath() {		
		return _basePath;
	}

	@Override
	public Object getService(String type){
		return _servicesRegistry.getService(type);
	}

	@Override
	public IStorage getStorage() {
		
		return _storage; 
	}

}
