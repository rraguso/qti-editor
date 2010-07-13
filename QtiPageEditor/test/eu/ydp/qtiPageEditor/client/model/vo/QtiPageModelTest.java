package eu.ydp.qtiPageEditor.client.model.vo;

import com.google.gwt.core.client.GWT;
import com.google.gwt.junit.client.GWTTestCase;
public class QtiPageModelTest extends GWTTestCase {
	
	QTIPageModel _model;
	
	
	@Override
	public String getModuleName() {
		return "eu.ydp.qtiPageEditor.QtiPageEditor";
	}
	
	public void testGetTitle(){
		_model = new QTIPageModel();
		assertEquals("Unknown title", _model.getTitle());
	}
	
	public void testSetTitle(){
		_model = new QTIPageModel();
		String title = "myTitle";		
		String resultTitle;
		
		_model.setTitle(title);
		resultTitle = _model.getTitle();
		
		assertEquals(resultTitle, title);	
		
	}
	
	public void testSetPath(){		
		_model = new QTIPageModel();
		
		assertNull(_model.getTitle());
		
		_model.setPath(GWT.getModuleBaseURL());
		
		assertEquals(GWT.getModuleBaseURL(), _model.getPath());
		
	}

}
