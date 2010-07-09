package eu.ydp.qtiPageEditor.client.events.handler;

import com.google.gwt.event.shared.EventHandler;

import eu.ydp.qtiPageEditor.client.events.TinyMceResizeEvent;

public interface TinyMceResizeHandler extends EventHandler {
	
	void onTinyResize(TinyMceResizeEvent event);

}
