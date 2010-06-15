package eu.ydp.qtitesteditor.client.controller;

import org.puremvc.java.multicore.interfaces.INotification;
import org.puremvc.java.multicore.patterns.command.SimpleCommand;

import eu.ydp.qtiPageEditor.client.model.QTIPageModelProxy;

public class SetSelectedIndexCommand extends SimpleCommand {
	
	public void execute(INotification notification){
		int ix = (Integer)notification.getBody();
		QTIPageModelProxy proxy = (QTIPageModelProxy)getFacade().retrieveProxy(QTIPageModelProxy.NAME);
		
		proxy.setSelectedIndex(ix);
	}

}
