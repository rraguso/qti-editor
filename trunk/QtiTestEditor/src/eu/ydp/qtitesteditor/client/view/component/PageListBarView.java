package eu.ydp.qtitesteditor.client.view.component;

import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.HorizontalPanel;

public class PageListBarView extends Composite {
	
	private HorizontalPanel _panel;
		
	private Button _addPageButton;
	private Button _removePageButton;
	private Button _moveDownPageButton;
	private Button _moveUpPageButton;
	
	public PageListBarView(){
		
		_panel = new HorizontalPanel();		
		
		_addPageButton = new Button("+");
		_removePageButton = new Button("-");
		_moveUpPageButton = new Button(">");
		_moveDownPageButton = new Button("<");		
				
		_panel.add(_addPageButton);
		_panel.add(_removePageButton);
		_panel.add(_moveUpPageButton);
		_panel.add(_moveDownPageButton);
		
		initWidget(_panel);
		
	}
	
	public Button getAddPageButton(){
		return _addPageButton;
	}
	
	public Button getRemovePageButton(){
		return _removePageButton;
	}
	
	public Button getMoveDownButton(){
		return _moveDownPageButton;
	}
	
	public Button getMoveUpButton(){
		return _moveUpPageButton;
	}

}
