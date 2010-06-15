package eu.ydp.qtiPageEditor.client.controller;

import org.puremvc.java.multicore.interfaces.INotification;
import org.puremvc.java.multicore.patterns.command.SimpleCommand;

import eu.ydp.qtiPageEditor.client.constance.Constances;
import eu.ydp.qtiPageEditor.client.model.QTIPageModelProxy;

public class UpdatePageCommand extends SimpleCommand {
	
	public void execute(INotification notification){
		
		QTIPageModelProxy proxy = (QTIPageModelProxy)getFacade().retrieveProxy(QTIPageModelProxy.NAME);		
		String content = (String)notification.getBody();
		int ix = proxy.getSelectedIndex();
		
		if(ix > -1)
		{	
			proxy.updatePageState(ix, content);		
			sendNotification(Constances.SAVE_PAGE, ix);
		}	
		
	}

}
