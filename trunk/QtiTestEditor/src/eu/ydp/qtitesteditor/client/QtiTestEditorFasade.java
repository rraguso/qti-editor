package eu.ydp.qtitesteditor.client;

import org.puremvc.java.multicore.patterns.facade.Facade;

import eu.ydp.qtiPageEditor.client.constance.Constances;
import eu.ydp.qtiPageEditor.client.controller.LoadPagesCommand;
import eu.ydp.qtiPageEditor.client.controller.SavePageCommand;
import eu.ydp.qtiPageEditor.client.controller.UpdatePageCommand;
import eu.ydp.qtiPageEditor.client.controller.startupdata.StartupData;
import eu.ydp.qtitesteditor.client.controller.AddNewPageCommand;
import eu.ydp.qtitesteditor.client.controller.ConfigureProxyCommand;
import eu.ydp.qtitesteditor.client.controller.LoadTestCommand;
import eu.ydp.qtitesteditor.client.controller.MovePageCommand;
import eu.ydp.qtitesteditor.client.controller.RemovePageCommand;
import eu.ydp.qtitesteditor.client.controller.SaveTestCommand;
import eu.ydp.qtitesteditor.client.controller.SetSelectedIndexCommand;
import eu.ydp.qtitesteditor.client.controller.StartupCommand;

public class QtiTestEditorFasade extends Facade {
	
	public static final String  KEY = "QtiTestEditorFacadeKey";	
	public static final String  NAME = "QtiTestEditorFacade";	
	public static final String STARTUP= NAME + "StartUp";	
	
	protected QtiTestEditorFasade(String key) {
		super(key);		
	}
	
	public void startup(StartupData startupData)
	{
		sendNotification(STARTUP,startupData);
		sendNotification(Constances.CONFIGURE_PROXY, startupData.getEnv());
		sendNotification(Constances.LOAD_TEST);
	}
	
	
	protected void initializeController()
	{ 	            
		super.initializeController();
		registerCommand(STARTUP, new StartupCommand());
		registerCommand(Constances.CONFIGURE_PROXY, new ConfigureProxyCommand());
		registerCommand(Constances.LOAD_TEST, new LoadTestCommand());
		registerCommand(Constances.LOAD_PAGES, new LoadPagesCommand());
		registerCommand(Constances.ADD_NEW_PAGE_TO_MODEL,new AddNewPageCommand());
		registerCommand(Constances.SAVE_PAGE, new SavePageCommand());		
		registerCommand(Constances.SAVE_TEST, new SaveTestCommand());
		registerCommand(Constances.REMOVE_PAGE_FROM_MODEL, new RemovePageCommand());
		registerCommand(Constances.MOVE_PAGE_MODEL, new MovePageCommand());
		registerCommand(Constances.UPDATE_PAGE_STATE, new UpdatePageCommand());
		registerCommand(Constances.SET_MODEL_SELECTED_INDEX, new SetSelectedIndexCommand());
		
	}
	
	public synchronized static QtiTestEditorFasade getInstance(String key )
	{
		if (instanceMap.get(key) == null) {
			try {
				 new QtiTestEditorFasade(key); 
			} 
				catch (Exception e) {
			}
		}
		return (QtiTestEditorFasade)instanceMap.get(key);
	}

}
