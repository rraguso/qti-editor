package eu.ydp.qtiPageEditor.client.model.vo;

import com.google.gwt.junit.client.GWTTestCase;
public class QtiPageModelTest extends GWTTestCase {
	
	QTIPageModel _model;
	
	
	@Override
	public String getModuleName() {
		return "eu.ydp.qtiPageEditor.QtiPageEditor";
	}
	
	public void testSetTitle(){
		_model = new QTIPageModel();
		String title = "myTitle";		
		String resultTitle;
		
		_model.setTitle(title);
		resultTitle = _model.getTitle();
		
		assertEquals(resultTitle, title);	
		
	}

}
