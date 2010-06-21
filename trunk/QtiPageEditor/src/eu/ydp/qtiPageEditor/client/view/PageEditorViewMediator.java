package eu.ydp.qtiPageEditor.client.view;

import org.puremvc.java.multicore.interfaces.INotification;
import org.puremvc.java.multicore.patterns.mediator.Mediator;

import eu.ydp.qtiPageEditor.client.constance.Constances;
import eu.ydp.qtiPageEditor.client.events.TinyMceSaveEvent;
import eu.ydp.qtiPageEditor.client.events.handler.TinyMceSaveEventHandler;
import eu.ydp.qtiPageEditor.client.model.QTIPageModelProxy;
import eu.ydp.qtiPageEditor.client.view.component.PageEditorView;

public class PageEditorViewMediator extends Mediator implements TinyMceSaveEventHandler {
	
	public static final String NAME = "pageEditorViewMediator";	
	
	public PageEditorViewMediator()
	{		
		super(NAME, new PageEditorView());				
	}
	
	public void onRegister(){
		PageEditorView view = (PageEditorView)getViewComponent();		
		view.addTinyMceSaveHandler(this);		
	}
	
	private void showPage(int ix){
		QTIPageModelProxy pageProxy = (QTIPageModelProxy) getFacade().retrieveProxy(QTIPageModelProxy.NAME);
		String page = pageProxy.getDataVO().get(ix).getContent();		
		
		((PageEditorView)getViewComponent()).setText(page);		
	}
	
	
	
	@Override
	public String[] listNotificationInterests() {
		return new String[]{Constances.SHOW_PAGE};				 
	}
	
	@Override
	public void handleNotification(INotification notification) {
		String n = notification.getName();		
		if(n == Constances.SHOW_PAGE)
			showPage((Integer)notification.getBody());
	}
	
	//-------- TinyMceSaveEventHandler impl--------------------
	public void onPageSave(TinyMceSaveEvent event){
		PageEditorView view = (PageEditorView)getViewComponent();
		String content = view.getText();
		
		sendNotification(Constances.UPDATE_PAGE_STATE, content);
	} 
	
	//---------------------------------------------------------
}