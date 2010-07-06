package eu.ydp.qtiPageEditor.client.model.vo;

import com.google.gwt.xml.client.Document;
import com.google.gwt.xml.client.XMLParser;
import com.qtitools.player.client.model.Assessment;
import com.qtitools.player.client.model.AssessmentItem;
import com.qtitools.player.client.module.IStateChangedListener;
import com.qtitools.player.client.util.xml.document.XMLData;

public class AssessmentProvider {
	
	public AssessmentProvider(){
		
	}
	
	public Assessment getAssessment(String data, String basePath){
		
		Document doc = XMLParser.parse(data);
		XMLData xmldata = new XMLData(doc, basePath);
		
		Assessment assessment = new Assessment(xmldata);
		
		return assessment;
	}
	
	public AssessmentItem getAssessmentItem(String data, String basePath, IStateChangedListener stateChangedListener){
		Document doc = XMLParser.parse(data);
		XMLData xmldata = new XMLData(doc, basePath);
		AssessmentItem item = new AssessmentItem(xmldata, stateChangedListener);
		
		return item;
	}

}
