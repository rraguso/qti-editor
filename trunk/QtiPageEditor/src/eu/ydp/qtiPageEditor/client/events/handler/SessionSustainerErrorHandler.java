package eu.ydp.qtiPageEditor.client.events.handler;

import com.google.gwt.event.shared.EventHandler;

import eu.ydp.qtiPageEditor.client.events.SessionSustainerErrorEvent;

public interface SessionSustainerErrorHandler extends EventHandler {
	void onSessionSustainerError(SessionSustainerErrorEvent event);

}
