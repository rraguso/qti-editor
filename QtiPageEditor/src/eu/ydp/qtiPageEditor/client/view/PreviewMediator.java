package eu.ydp.qtiPageEditor.client.view;

import org.puremvc.java.multicore.interfaces.INotification;
import org.puremvc.java.multicore.patterns.mediator.Mediator;


import com.google.gwt.user.client.Window;
import com.qtitools.player.client.model.Assessment;
import com.qtitools.player.client.model.AssessmentItem;
import com.qtitools.player.client.module.IInteractionModule;
import com.qtitools.player.client.module.IStateChangedListener;

import eu.ydp.qtiPageEditor.client.constance.Constances;
import eu.ydp.qtiPageEditor.client.model.AssessmentProviderProxy;
import eu.ydp.qtiPageEditor.client.model.QTIPageModelProxy;
import eu.ydp.qtiPageEditor.client.model.QTITestModelProxy;
import eu.ydp.qtiPageEditor.client.model.vo.QTIPageModel;
import eu.ydp.qtiPageEditor.client.view.component.PreviewView;

public class PreviewMediator extends Mediator {	
	 
	public static final String NAME = "previewMediator";
	
	public PreviewMediator(){
				
		super(NAME, new PreviewView());
	}
	
	public void onRegister(){	
		
		PreviewView preview = (PreviewView)getViewComponent();		
		preview.init();		
	}
	
	private void showPreview(INotification notification){		
		
		String content;
		
		PreviewView preview = (PreviewView)getViewComponent();
		
		QTIPageModelProxy pageProxy = (QTIPageModelProxy)getFacade().retrieveProxy(QTIPageModelProxy.NAME);
		QTIPageModel pageInfo = pageProxy.getCurrentPage();
		QTITestModelProxy testProxy = (QTITestModelProxy)getFacade().retrieveProxy(QTITestModelProxy.NAME);
		
		String testPath = testProxy.getHref();
		testPath = testPath.substring(0, testPath.lastIndexOf("/")+1);
		String pagePath = pageInfo.getPath();
		pagePath = pagePath.substring(0, pagePath.lastIndexOf("/")+1);
		
		AssessmentProviderProxy assessmentProxy = (AssessmentProviderProxy)getFacade().retrieveProxy(AssessmentProviderProxy.NAME);
		Assessment assessment = assessmentProxy.getAssessment(testProxy.getContent(), testPath);
		
		content = notification.getBody() != null ? (String)notification.getBody() : pageInfo.getContent(); 
		AssessmentItem  assessmentItem = assessmentProxy.getAssessmentItem(content, pagePath, new IStateChangedListener() {
			
			@Override
			public void onStateChanged(IInteractionModule sender) {
				// TODO Auto-generated method stub				
			}
		});		
		
		preview.showPreview(assessment, assessmentItem, pageProxy.getSelectedIndex());
	}
	
	@Override
	public void handleNotification(INotification notification) {
		String n = notification.getName();
		if(n == Constances.SHOW_PREVIEW){
			showPreview(notification);
		}
	}
	
	@Override
	public String[] listNotificationInterests() {
		return new String[]{Constances.SHOW_PREVIEW};
	}
	
	
}
