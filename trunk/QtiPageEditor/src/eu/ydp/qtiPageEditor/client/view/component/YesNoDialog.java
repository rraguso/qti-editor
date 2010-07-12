package eu.ydp.qtiPageEditor.client.view.component;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.event.shared.HandlerManager;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.VerticalPanel;

import eu.ydp.qtiPageEditor.client.events.DialogYesNoEvent;
import eu.ydp.qtiPageEditor.client.events.handler.DialogYesNoHandler;

public class YesNoDialog extends DialogBox implements ClickHandler {
	
	final private HandlerManager _handlerManager = new HandlerManager(this);
	private Button _okButton;
	private Button _cancelButton;
	
	private HTML _text;
	
	public YesNoDialog(){
		super(false, true);
		setGlassEnabled(true);
		
		VerticalPanel contentPane = new VerticalPanel();
		contentPane.setSpacing(4);
		
		HorizontalPanel buttonsContainer = new HorizontalPanel();
		
		_okButton = new Button("OK",this);
		_cancelButton = new Button("Cancel",this);
		
		buttonsContainer.add(_okButton);
		buttonsContainer.add(_cancelButton);
		buttonsContainer.setCellWidth(_okButton, "100%");
		
		_text = new HTML();
		contentPane.add(_text);
		contentPane.add(buttonsContainer);
		
		setWidget(contentPane);
				
	}
	
	public void showDialog(String title, String message){
		setText(title);
		_text.setText(message);
		this.center();
	}
	
	public void showDialogHtml(String title, String message){
		setText(title);
		_text.setHTML(message);
		this.center();
	}
	
	@Override
	public void onClick(ClickEvent event){
		DialogYesNoEvent dialogEvent;		
		String res = (event.getSource().equals(_okButton)) ? DialogYesNoEvent.DIALOG_YES : DialogYesNoEvent.DIALOG_NO;
		
		dialogEvent = new DialogYesNoEvent(res);
		_handlerManager.fireEvent(dialogEvent);	
		
		hide();
	}
	
	public void addDialogYesNoHandler(DialogYesNoHandler handler){
		_handlerManager.addHandler(DialogYesNoEvent.TYPE, handler);
	}

}
