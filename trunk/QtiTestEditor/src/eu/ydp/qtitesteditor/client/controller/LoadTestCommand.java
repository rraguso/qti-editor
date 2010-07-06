package eu.ydp.qtitesteditor.client.controller;

import org.puremvc.java.multicore.interfaces.INotification;
import org.puremvc.java.multicore.patterns.command.SimpleCommand;

import eu.ydp.qtiPageEditor.client.model.QTITestModelProxy;
public class LoadTestCommand extends SimpleCommand {
	
	public void execute(INotification notification){
		
		QTITestModelProxy proxy = (QTITestModelProxy)getFacade().retrieveProxy(QTITestModelProxy.NAME);
		proxy.load();	
	}

}
