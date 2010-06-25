package eu.ydp.qtitesteditor.client.controller;

import org.puremvc.java.multicore.interfaces.INotification;
import org.puremvc.java.multicore.patterns.command.SimpleCommand;
import org.puremvc.java.multicore.patterns.facade.Facade;

import eu.ydp.qtiPageEditor.client.controller.startupdata.StartupData;
import eu.ydp.qtiPageEditor.client.model.QTIPageModelProxy;
import eu.ydp.qtitesteditor.client.model.QTITestModelProxy;
import eu.ydp.qtitesteditor.client.view.MainViewMediator;

public class StartupCommand extends SimpleCommand {
	
	public void execute(INotification notification)  
	{  
		StartupData startupData = (StartupData)notification.getBody();
		
		Facade facade = getFacade();
		facade.registerProxy(new QTITestModelProxy());
		facade.registerProxy(new QTIPageModelProxy());
		facade.registerMediator(new MainViewMediator(startupData));
		
	}  

}
