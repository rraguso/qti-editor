package eu.ydp.qtiPageEditor.client.serviceregistry;

import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.serviceregistry.services.IEditorService;
import eu.ydp.qtiPageEditor.client.serviceregistry.services.ISimpleService;
import eu.ydp.qtiPageEditor.client.serviceregistry.services.impl.SimpleService;

public class ServicesRegistry {
	
	private String[] _services;
	
	private IEditorEnvirnoment _env;
	
	public ServicesRegistry(){				
				
		_services = new String[1];		
		_services[0] = ISimpleService.class.getName();
		
		publish();
		
	}
	
	public void setEnv(IEditorEnvirnoment env)
	{		
		_env = env;
	}
	
	public Object getService(String name)
	{
		int i;
		IEditorService service = null;		
		for(i = 0; i < _services.length; i++)
		{
			if(_services[i] == ISimpleService.class.getName())
			{				
				service = new SimpleService(); 	
				service.setEnvironment(_env);				
			}
		}
		
		return service;
	}
	
	
	
	private native void publish()/*-{
		
		var doc = this;
		
		if(typeof($wnd.qti_page_editor.ServicesRegistry) != "object")
		{
			$wnd.qti_page_editor.ServicesRegistry = function () {    		
	    		this.SIMPLE_SERVICE = "simpleService";
	    		this.getService = function(type)
	    		{
	    			var service;    			
	    			if(type == this.SIMPLE_SERVICE)
	    			{    				
	    				service = doc.@eu.ydp.qtiPageEditor.client.serviceregistry.ServicesRegistry::getService(Ljava/lang/String;)("eu.ydp.qtiPageEditor.client.serviceregistry.services.ISimpleService");    				
	    				return  service.@eu.ydp.qtiPageEditor.client.serviceregistry.services.impl.SimpleService::getJSO()();
	    			}
	    		}		
			}
		}		
	}-*/;
	

}
