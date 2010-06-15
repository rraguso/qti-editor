package eu.ydp.qtiPageEditor.client.model;

import org.puremvc.java.multicore.patterns.proxy.Proxy;

import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;
import eu.ydp.webapistorage.client.storage.IStorage;

public class QtiProxyBase extends Proxy {
	
	protected String _testPath;
	protected IStorage _storage;
	
	public QtiProxyBase(String name, Object data) {
		super(name, data);
	}
	
	public void init(IEditorEnvirnoment env){
		_testPath = env.getBasePath();
		_storage = env.getStorage();
	}	
}
