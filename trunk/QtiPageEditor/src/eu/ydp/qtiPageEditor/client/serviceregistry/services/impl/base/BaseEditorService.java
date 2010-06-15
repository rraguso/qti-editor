package eu.ydp.qtiPageEditor.client.serviceregistry.services.impl.base;

import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.serviceregistry.services.IEditorService;

public class BaseEditorService implements IEditorService {

	protected IEditorEnvirnoment _env;
	
	public void setEnvironment(IEditorEnvirnoment env) {
		_env = env;		

	}

}
