package eu.ydp.qtiPageEditor.client.model.vo;

import com.google.gwt.xml.client.Document;
import com.google.gwt.xml.client.XMLParser;
import com.qtitools.player.client.model.Assessment;
import com.qtitools.player.client.model.Item;
import com.qtitools.player.client.module.ModuleStateChangedEventsListener;
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
	
	public Item getAssessmentItem(String data, String basePath,  ModuleStateChangedEventsListener stateChangedListener){
		Document doc = XMLParser.parse(data);
		XMLData xmldata = new XMLData(doc, basePath);
		Item item = new Item(xmldata, stateChangedListener);
		
		return item;
	}

}
