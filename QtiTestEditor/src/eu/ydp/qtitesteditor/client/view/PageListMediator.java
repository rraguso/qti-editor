package eu.ydp.qtitesteditor.client.view;

import org.puremvc.java.multicore.interfaces.IMediator;
import org.puremvc.java.multicore.interfaces.INotification;
import org.puremvc.java.multicore.patterns.mediator.Mediator;

import com.google.gwt.event.dom.client.ChangeEvent;
import com.google.gwt.event.dom.client.ChangeHandler;
import com.google.gwt.event.dom.client.MouseUpEvent;
import com.google.gwt.event.dom.client.MouseUpHandler;

import eu.ydp.qtiPageEditor.client.constance.Constances;
import eu.ydp.qtiPageEditor.client.events.TinyMceResizeEvent;
import eu.ydp.qtiPageEditor.client.model.QTIPageModelProxy;
import eu.ydp.qtiPageEditor.client.view.PageEditorViewMediator;
import eu.ydp.qtiPageEditor.client.view.component.PageEditorView;
import eu.ydp.qtitesteditor.client.view.component.PageListBarView;
import eu.ydp.qtitesteditor.client.view.component.PageListView;

public class PageListMediator extends Mediator implements IMediator, ChangeHandler {
	
	public static final String NAME = "pageListMediator";
	
	public PageListMediator(){		
		super(NAME, new PageListView() );		
	}
	
	public void onRegister() {	
		
		PageListView view = (PageListView)getViewComponent();		
		view.getListBox().addChangeHandler(this);		
			
	}
	
	public int getSelectedIndex(){
		return ((PageListView)getViewComponent()).getSelectedIndex();
	}
	
	public int getItemCount(){
		return ((PageListView)getViewComponent()).getItemCount();
	}	
	
	public void onChange(ChangeEvent event) {		
		PageListView view = (PageListView)getViewComponent();
		QTIPageModelProxy pagesProxy = (QTIPageModelProxy)getFacade().retrieveProxy(QTIPageModelProxy.NAME);
		int oldIx = pagesProxy.getSelectedIndex();		
		int ix = view.getSelectedIndex();
		view.setSelectedIndex(ix);
		PageEditorView pev = (PageEditorView)getFacade().retrieveMediator(PageEditorViewMediator.NAME).getViewComponent();
		String newState = pev.getText();		
		String oldState = pagesProxy.getPageContent(oldIx);
		
		if(newState != oldState)
			sendNotification(Constances.UPDATE_PAGE_STATE,newState);
		
		sendNotification(Constances.SET_MODEL_SELECTED_INDEX, ix); 
		sendNotification(Constances.SHOW_PAGE, ix);
		
	}
	
	@Override
	public void handleNotification(INotification notification) {		
		String n = notification.getName();
		
		if(n == Constances.PAGES_LOADED)
			showPages((String[])notification.getBody());
		else if(n == Constances.ADD_PAGE_TO_LIST)
			addPage((String)notification.getBody());
		else if(n == Constances.REMOVE_PAGE_FROM_LIST)
			removePage((Integer)notification.getBody());
		else if(n == Constances.MOVE_PAGE_UP_LIST)
			moveUpPage((Integer)notification.getBody());
		else if(n == Constances.MOVE_PAGE_DOWN_LIST)
			moveDownPage((Integer)notification.getBody());			
		
	}
	
	@Override
	public String[] listNotificationInterests() {		
		return new String[]{Constances.PAGES_LOADED,
				Constances.ADD_PAGE_TO_LIST,
				Constances.REMOVE_PAGE_FROM_LIST,
				Constances.MOVE_PAGE_UP_LIST,
				Constances.MOVE_PAGE_DOWN_LIST};				 
	}
	
	
	//-----------------------------------------------------
	
	private void showPages(String[] titles){
		PageListView view = (PageListView)getViewComponent();
		view.showPages(titles);
		view.setSelectedIndex(0);
		sendNotification(Constances.SHOW_PAGE, 0);
	}
	
	private void addPage(String title){
		PageListView view = (PageListView)getViewComponent();
		if(view.getItemCount() == 0)
			sendNotification(Constances.BLOCK_EDITOR, false);
		
		view.addPage(title);
		view.setSelectedIndex(view.getItemCount()-1);
		sendNotification(Constances.SET_MODEL_SELECTED_INDEX,view.getItemCount()-1 );		
		sendNotification(Constances.SHOW_PAGE, view.getSelectedIndex());
		
	}
	
	private void removePage(int ix){		
		PageListView view = (PageListView)getViewComponent();
		view.removePage(ix);
		if(view.getItemCount() > 0)		{			
			view.setSelectedIndex(ix-1);			
			sendNotification(Constances.SHOW_PAGE, view.getSelectedIndex());
		}
		else{
			sendNotification(Constances.CLEAR_EDITOR);
			sendNotification(Constances.BLOCK_EDITOR, true);
		}
			
		sendNotification(Constances.SET_MODEL_SELECTED_INDEX, view.getSelectedIndex() );
	}
	
	private void moveUpPage(int ix){
		PageListView view = (PageListView)getViewComponent();
		view.moveUpPage(ix);
		if(ix > 0)
			view.setSelectedIndex(ix-1);
		else
			view.setSelectedIndex(view.getItemCount() - 1);
		
		sendNotification(Constances.SET_MODEL_SELECTED_INDEX,view.getSelectedIndex() );
	}
	
	private void moveDownPage(int ix){
		PageListView view = (PageListView)getViewComponent();
		view.moveDownPage(ix);
		if(ix+1 < view.getItemCount())
			view.setSelectedIndex(ix+1);
		else
			view.setSelectedIndex(0);
		
		sendNotification(Constances.SET_MODEL_SELECTED_INDEX,view.getSelectedIndex()); 
		
	}
}
