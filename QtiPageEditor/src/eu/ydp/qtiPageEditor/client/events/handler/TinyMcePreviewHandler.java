package eu.ydp.qtiPageEditor.client.events.handler;

import com.google.gwt.event.shared.EventHandler;

import eu.ydp.qtiPageEditor.client.events.TinyMcePreviewEvent;

public interface TinyMcePreviewHandler extends EventHandler {
	
	void onShowPreview(TinyMcePreviewEvent event);

}
