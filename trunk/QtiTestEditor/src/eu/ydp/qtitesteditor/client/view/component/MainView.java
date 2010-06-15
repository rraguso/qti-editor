package eu.ydp.qtitesteditor.client.view.component;

import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.VerticalPanel;

import eu.ydp.qtiPageEditor.client.view.component.PageEditorView;


public class MainView extends Composite {
	
	HorizontalPanel _panel;
	VerticalPanel _pageListContainer;
	
	public MainView(){
		_panel = new HorizontalPanel();
		
		_pageListContainer = new VerticalPanel();		
		_panel.add(_pageListContainer);
		
		initWidget(_panel);
		
	}
	
	public void addPageListBar(PageListBarView bar){
		_pageListContainer.add(bar);
	}
	
	public void addPageList(PageListView pageList){
		_pageListContainer.add(pageList);
	}
	
	public void addTinyEditor(PageEditorView editor){
		_panel.add(editor);
	}
}
