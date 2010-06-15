package eu.ydp.qtiPageEditor.client.events.handler;

import com.google.gwt.event.shared.EventHandler;

import eu.ydp.qtiPageEditor.client.events.TinyMceSaveEvent;

public interface TinyMceSaveEventHandler extends EventHandler {
	
	public void onPageSave(TinyMceSaveEvent event);

}
