package eu.ydp.qtiPageEditor.client.model;

import org.puremvc.java.multicore.patterns.proxy.Proxy;

import com.qtitools.player.client.model.Assessment;
import com.qtitools.player.client.model.Item;
import com.qtitools.player.client.module.ModuleStateChangedEventsListener;

import eu.ydp.qtiPageEditor.client.model.vo.AssessmentProvider;

public class AssessmentProviderProxy extends Proxy {
	
	public static final String NAME = "assessmentProviderProxy";
	
	public AssessmentProviderProxy(){		
		super(NAME, new AssessmentProvider());		
	}
	
	public Assessment getAssessment(String data, String basePath){
		return getVO().getAssessment(data, basePath);
	}
	
	public Item getAssessmentItem(String data, String basePath, ModuleStateChangedEventsListener stateChangedListener){
		return getVO().getAssessmentItem(data, basePath, stateChangedListener);
	}
	
	public AssessmentProvider getVO(){
		return (AssessmentProvider)getData();
	}

}
