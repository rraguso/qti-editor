package eu.ydp.qtiPageEditor.client.view.component;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.VerticalPanel;

public class AlertWindow extends DialogBox implements ClickHandler {
	
	private VerticalPanel _content;
	private HTML _text;
	private Button _closeButton;
	
	public AlertWindow(){		
		super(false, true);
		_closeButton = new Button("Close");
		_text = new HTML();		
		
		_content = new VerticalPanel();
		_content.setSpacing(4);
		_content.add(_text);
		_content.add(_closeButton);
		
		_closeButton.addClickHandler(this); 
		
		_content.setCellHorizontalAlignment(_closeButton, HasHorizontalAlignment.ALIGN_RIGHT);
		setWidget(_content);
		
		setGlassEnabled(true);
	}
	
	public void showErrorMessage(String type, String details, int code){
		
		StringBuilder sb = new StringBuilder();
		
		sb.append(type);
		
		if(details != "" ){
			sb.append("<br/>");
			sb.append(details);
		}
		
		if(code > -1){
			sb.append("<br/>");		
			sb.append("Error code: ");
			sb.append(code);
		}		
		setText("Error");
		_text.setHTML(sb.toString());
		
	}
	
	public void showErrorMessage(String type, String details){
		showErrorMessage(type, details, -1);
		
	}
	
	public void showErrorMessage(String type){
		showErrorMessage(type, "", -1);		
	}
	
	public void onClick(ClickEvent event){
		this.hide();
	}
	

}
