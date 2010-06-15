package eu.ydp.qtiPageEditor.client;

import org.puremvc.java.multicore.interfaces.IFacade;
import org.puremvc.java.multicore.patterns.facade.Facade;

import eu.ydp.qtiPageEditor.client.constance.Constances;
import eu.ydp.qtiPageEditor.client.controller.ConfigurePageProxyCommand;
import eu.ydp.qtiPageEditor.client.controller.LoadPagesCommand;
import eu.ydp.qtiPageEditor.client.controller.SavePageCommand;
import eu.ydp.qtiPageEditor.client.controller.StartupCommand;
import eu.ydp.qtiPageEditor.client.controller.UpdatePageCommand;
import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;

public class ApplicationFasade extends Facade implements IFacade {

	public static final String  KEY = "ApplicationFacadeKey";
	public static final String  NAME = "ApplicationFacade";	
	public static final String STARTUP= NAME + "StartUp";
	public static final String CONFIGURE_PROXY = NAME + "ConfigureProxy";
	
	
	protected ApplicationFasade(String key) {
		super(key);
		// TODO Auto-generated constructor stub
	}	
	
	public void startup(IEditorEnvirnoment env, String cellId)
	{		
		String[] hrefs = new String[1];
		String base = env.getBasePath();
		hrefs[0] = base.substring(base.lastIndexOf("/")+1);		
		
		sendNotification( STARTUP, cellId 	);		
		sendNotification(CONFIGURE_PROXY, env);	
		sendNotification(Constances.LOAD_PAGES, hrefs);
	}
	
	
	protected void initializeController()
	{ 	            
		super.initializeController();		
		
		registerCommand(STARTUP, new StartupCommand() );
		registerCommand(CONFIGURE_PROXY, new ConfigurePageProxyCommand());
		registerCommand(Constances.LOAD_PAGES, new LoadPagesCommand());
		registerCommand(Constances.UPDATE_PAGE_STATE, new UpdatePageCommand());
		registerCommand(Constances.SAVE_PAGE, new SavePageCommand());
		
	}
	
	public synchronized static ApplicationFasade getInstance(String key )
	{
		if (instanceMap.get(key) == null) {
			try {
				 new ApplicationFasade(key); 
			} catch (Exception e) {
			}
		}
		return (ApplicationFasade)instanceMap.get(key);
	}

}
