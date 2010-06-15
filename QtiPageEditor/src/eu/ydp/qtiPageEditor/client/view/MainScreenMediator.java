package eu.ydp.qtiPageEditor.client.view;

import org.puremvc.java.multicore.interfaces.IMediator;
import org.puremvc.java.multicore.interfaces.INotification;
import org.puremvc.java.multicore.patterns.mediator.Mediator;

import com.google.gwt.user.client.ui.RootPanel;
import eu.ydp.qtiPageEditor.client.constance.Constances;
import eu.ydp.qtiPageEditor.client.view.component.AlertWindow;
import eu.ydp.qtiPageEditor.client.view.component.MainScreenView;
import eu.ydp.qtiPageEditor.client.view.component.PageEditorView;
import eu.ydp.webapistorage.client.storage.apierror.IApiError;

public class MainScreenMediator extends Mediator implements IMediator {
	
	 public static final String NAME = "ApplicationMediator";
	 	  
	 
	 private String _cellId;
	 
	 public MainScreenMediator(String id)
	 {		 
		 super(NAME, new MainScreenView());
		 _cellId = id;
		
	 }
	 
	 public void onRegister()  
	 {		
		MainScreenView ms = (MainScreenView)getViewComponent();		
		RootPanel.get(_cellId).add(ms);			
		getFacade().registerMediator( new PageEditorViewMediator());		
		PageEditorView editor = (PageEditorView)getFacade().retrieveMediator(PageEditorViewMediator.NAME).getViewComponent();
		ms.add(editor);
		
	 }
	 @Override
	public void handleNotification(INotification notification) {
		
		String n = notification.getName();
		
		if(n == Constances.PAGES_LOADED)
		{
			sendNotification(Constances.SHOW_PAGE, 0);
		}
		else if(n == Constances.LOAD_PAGE_ERROR || n == Constances.SAVE_PAGE_ERROR)
		{
			IApiError error = (IApiError)notification.getBody();
			AlertWindow pop = new AlertWindow();
			pop.showErrorMessage(error.getType(), error.getDetails(), error.getErrorCode());
			pop.center();
			pop.show();
			
		}
				
	}
	 
	 @Override
	public String[] listNotificationInterests() {
		
		 return new String[]{Constances.PAGES_LOADED, 
				 Constances.LOAD_PAGE_ERROR,
				 Constances.SAVE_PAGE_ERROR};
	}

}
