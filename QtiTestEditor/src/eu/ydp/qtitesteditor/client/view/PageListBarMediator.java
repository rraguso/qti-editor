package eu.ydp.qtitesteditor.client.view;

import org.puremvc.java.multicore.patterns.mediator.Mediator;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;

import eu.ydp.qtiPageEditor.client.constance.Constances;
import eu.ydp.qtiPageEditor.client.events.DialogYesNoEvent;
import eu.ydp.qtiPageEditor.client.events.handler.DialogYesNoHandler;
import eu.ydp.qtiPageEditor.client.model.QTIPageModelProxy;
import eu.ydp.qtiPageEditor.client.view.component.YesNoDialog;
import eu.ydp.qtitesteditor.client.view.component.PageListBarView;

public class PageListBarMediator extends Mediator implements ClickHandler {
	
	public static final String NAME = "pageListBarMediator";
	
	public PageListBarMediator(){		
		super(NAME, new PageListBarView());
		
	}
	
	 public void onRegister()  
	 {		 
		 PageListBarView view = (PageListBarView)getViewComponent();
		 
		 view.getAddPageButton().addClickHandler(this);
		 view.getRemovePageButton().addClickHandler(this);
		 view.getMoveUpButton().addClickHandler(this);
		 view.getMoveDownButton().addClickHandler(this);		 
	 }
	 
	 public void onClick(ClickEvent event) {
		 PageListBarView view = (PageListBarView)getViewComponent();
		 Object b = event.getSource();
		 
		 if(b.equals(view.getAddPageButton()))
		 	 sendNotification(Constances.ADD_NEW_PAGE_TO_MODEL);
		 else if(b.equals(view.getRemovePageButton()))
			 onRemovePage();
			 //sendNotification(Constances.REMOVE_PAGE_FROM_MODEL);
		 else if(b.equals(view.getMoveUpButton()))
			 sendNotification(Constances.MOVE_PAGE_MODEL,1);
		 else if(b.equals(view.getMoveDownButton()))
			 sendNotification(Constances.MOVE_PAGE_MODEL,0);
		 
	 }
	 
	 private void onRemovePage(){		 
		 int ix = ((PageListMediator)getFacade().retrieveMediator(PageListMediator.NAME)).getSelectedIndex();		 
		 
		 if(ix > -1)
		 {
			 String message = "Do you really want to delete selected page?";			 
			 YesNoDialog dialog = new YesNoDialog();
			 dialog.addDialogYesNoHandler(new DialogYesNoHandler() {
				
				@Override
				public void onYesNoClick(DialogYesNoEvent event) {
					if(event.getResult() == DialogYesNoEvent.DIALOG_YES)
						sendNotification(Constances.REMOVE_PAGE_FROM_MODEL);				
				}
			});
			 
			 dialog.showDialog("Warning", message);
		 }
	 }
	 
	 

}
