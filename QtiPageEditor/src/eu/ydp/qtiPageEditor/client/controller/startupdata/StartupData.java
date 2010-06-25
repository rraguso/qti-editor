package eu.ydp.qtiPageEditor.client.controller.startupdata;

import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;

public class StartupData {

	private IEditorEnvirnoment _env;
	private String _cellId;
	
	
	public StartupData(IEditorEnvirnoment env, String cellId){
		_env = env;
		_cellId = cellId;
		
	}
	
	public String getCellId(){
		return _cellId;
	}
	
	public IEditorEnvirnoment getEnv(){
		return _env;
	}
	
}
