package eu.ydp.qtiPageEditor.client.view;

import org.puremvc.java.multicore.interfaces.INotification;
import org.puremvc.java.multicore.patterns.mediator.Mediator;

import com.google.gwt.xml.client.XMLParser;
import com.qtitools.player.client.model.AssessmentItem;
import com.qtitools.player.client.module.IInteractionModule;
import com.qtitools.player.client.module.IStateChangedListener;
import com.qtitools.player.client.util.xml.document.XMLData;

import eu.ydp.qtiPageEditor.client.constance.Constances;
import eu.ydp.qtiPageEditor.client.model.QTIPageModel;
import eu.ydp.qtiPageEditor.client.model.QTIPageModelProxy;
import eu.ydp.qtiPageEditor.client.view.component.PreviewView;

public class PreviewMediator extends Mediator {	
	 
	public static final String NAME = "previewMediator";
	
	public PreviewMediator(){
		super(NAME, new PreviewView());
	}
	
	public void onRegister(){
		
	}
	
	private void showPreview(INotification notification){
		PreviewView preview = (PreviewView)getViewComponent();
		QTIPageModel pageInfo = ((QTIPageModelProxy)getFacade().retrieveMediator(QTIPageModelProxy.NAME)).getCurrentPage();
		XMLData xmldata = new XMLData(XMLParser.parse(pageInfo.getContent()), pageInfo.getPath());
		AssessmentItem ai = new AssessmentItem(xmldata, new IStateChangedListener() {
			
			@Override
			public void onStateChanged(IInteractionModule sender) {
				// TODO Auto-generated method stub
				
			}
		});
		
		preview.showPreview(null, ai, 0);
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
