package eu.ydp.qtiPageEditor.client.events.handler;

import com.google.gwt.event.shared.EventHandler;

import eu.ydp.qtiPageEditor.client.events.DialogYesNoEvent;

public interface DialogYesNoHandler extends EventHandler {
	void onYesNoClick(DialogYesNoEvent event);
}
