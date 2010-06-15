package eu.ydp.qtitesteditor.client.controller;

import org.puremvc.java.multicore.interfaces.INotification;
import org.puremvc.java.multicore.patterns.command.SimpleCommand;

import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.model.QTIPageModelProxy;
import eu.ydp.qtiPageEditor.client.model.QtiProxyBase;
import eu.ydp.qtitesteditor.client.model.QTITestModelProxy;

public class ConfigureProxyCommand extends SimpleCommand {
	
	public void execute(INotification notification){
		
		IEditorEnvirnoment env = (IEditorEnvirnoment)notification.getBody();		
		QtiProxyBase testProxy = (QtiProxyBase)getFacade().retrieveProxy(QTITestModelProxy.NAME);
		QtiProxyBase pagesProxy = (QtiProxyBase)getFacade().retrieveProxy(QTIPageModelProxy.NAME); 
		
		testProxy.init(env);
		pagesProxy.init(env);
	}

}
