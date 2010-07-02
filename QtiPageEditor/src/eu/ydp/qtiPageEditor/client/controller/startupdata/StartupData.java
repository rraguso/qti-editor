package eu.ydp.qtiPageEditor.client.controller.startupdata;

import eu.ydp.qtiPageEditor.client.appcallback.TinyMceCreatedCallback;
import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;

public class StartupData {

	private IEditorEnvirnoment _env;
	private String _cellId;
	private TinyMceCreatedCallback _tinyCreatedCallback;
	
	
	public StartupData(IEditorEnvirnoment env, String cellId, TinyMceCreatedCallback tinyCreatedCallback){
		_env = env;
		_cellId = cellId;
		_tinyCreatedCallback = tinyCreatedCallback;
		
	}
	
	public String getCellId(){
		return _cellId;
	}
	
	public IEditorEnvirnoment getEnv(){
		return _env;
	}
	
	public TinyMceCreatedCallback getTinyMceCreatedCallback(){
		return _tinyCreatedCallback;
	}
	
}
