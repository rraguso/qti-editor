package eu.ydp.qtiPageEditor.client.view.component;


import com.google.gwt.core.client.JavaScriptObject;
import com.google.gwt.event.shared.HandlerManager;
import com.google.gwt.user.client.Command;
import com.google.gwt.user.client.DOM;
import com.google.gwt.user.client.DeferredCommand;
import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.FormPanel;
import com.google.gwt.user.client.ui.HTMLPanel;
import com.google.gwt.user.client.ui.TextArea;

import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.events.TinyMceSaveEvent;
import eu.ydp.qtiPageEditor.client.events.handler.TinyMceSaveEventHandler;
import eu.ydp.qtiPageEditor.client.serviceregistry.services.IAssetBrowser;
import eu.ydp.qtiPageEditor.client.serviceregistry.services.IEditorService;

public class PageEditorView extends Composite {	
	
	 final private HandlerManager _handlerManager = new HandlerManager(this);
	 private TextArea _textArea;
	 private String _id;
	 private IEditorEnvirnoment _env;

	
	public PageEditorView(IEditorEnvirnoment env)
	{
		super();			
		_env = env;
		FormPanel panel = new FormPanel();
        panel.setWidth("100%");

        _id = HTMLPanel.createUniqueId();
        _textArea = new TextArea();      
        DOM.setElementAttribute(_textArea.getElement(), "id", _id);
        DOM.setStyleAttribute(_textArea.getElement(), "width", "100%");
        panel.add(_textArea);

        initWidget(panel);
        
        publish();
	}
	
	/**
     * getID() -
     *
     * @return the MCE element's ID
     */
    public String getID() {
        return _id;
    }

    /**
     * setText() -
     *
     * NOTE:
     * @param text
     */
    public void setText(String text) {        
    	_textArea.setText(text);
    	setEditorContents(getID(), text);
    }

    public String getText() {        
    	return getEditorContents(getID());
    }

    /**
     * @see com.google.gwt.user.client.ui.Widget#onLoad()
     */
    protected void onLoad() {
        super.onLoad();

        DeferredCommand.addCommand(new Command() {			
            public void execute() {
                setWidth("100%");
                setTextAreaToTinyMCE(_id);
                focusMCE(_id);
            }
        });
    }
    
    @Override
    protected void onUnload() {    	
    	super.onUnload();    	
    	DeferredCommand.addCommand(new Command() {			
            public void execute() {
              unload();
            }
        });
    }

    /**
     * focusMCE() -
     *
     * Use this to set the focus to the MCE area
     * @param id - the element's ID
     */
    protected native void focusMCE(String id) /*-{
        $wnd.tinyMCE.execCommand('mceFocus', true, id);
    }-*/;

    /**
     * resetMCE() -
     *
     * Use this if reusing the same MCE element, but losing focus
     */
    protected native void resetMCE() /*-{
        $wnd.tinyMCE.execCommand('mceResetDesignMode', true);
    }-*/;

    /**
     * unload() -
     *
     * Unload this MCE editor instance from active memory.
     * I use this in the onHide function of the containing widget. This helps
     * to avoid problems, especially when using tabs.
     */
    public void unload() {
        unloadMCE(_id);
    }

    /**
     * unloadMCE() -
     *
     * @param id - The element's ID
     * JSNI method to implement unloading the MCE editor instance from memory
     */
    protected native void unloadMCE(String id) /*-{
        $wnd.tinyMCE.execCommand('mceRemoveControl', false, id);
    }-*/;
    

    /**
     * encodeURIComponent() -
     *
     * Wrapper for the native URL encoding methods
     * @param text - the text to encode
     * @return the encoded text
     */
    protected native String encodeURIComponent(String text) /*-{
        return encodeURIComponent(text);
    }-*/;

    /**
     * setTextAreaToTinyMCE() -
     *
     * Change a text area to a tiny MCE editing field
     * @param id - the text area's ID
     */
    protected native void setTextAreaToTinyMCE(String id) /*-{
        $wnd.tinyMCE.execCommand('mceAddControl', true, id);
    }-*/;

    /**
     * removeMCE() -
     *
     * Remove a tiny MCE editing field from a text area
     * @param id - the text area's ID
     */
    protected native void removeMCE(String id) /*-{
        $wnd.tinyMCE.execCommand('mceRemoveControl', true, id);
    }-*/;
    
    protected static native String getEditorContents(
    	String elementId) /*-{
    	return $wnd.tinyMCE.get(elementId).getContent();
    }-*/;

    protected static native void setEditorContents(
       String elementId, String html) /*-{
       $wnd.tinyMCE.execInstanceCommand(
         elementId, 'mceSetContent', false, html, false);
    }-*/;
    
    protected void onSavePage(){
    	TinyMceSaveEvent event = new TinyMceSaveEvent();
    	_handlerManager.fireEvent(event);    	
    }
    
    protected JavaScriptObject getAssetBrowser(){
    	IEditorService service = (IEditorService)_env.getService(IAssetBrowser.class.getName());
    	return service.getJSO();
    }
    
    public void addTinyMceSaveHandler(TinyMceSaveEventHandler handler){
    	
    	_handlerManager.addHandler(TinyMceSaveEvent.TYPE, handler); 	
    }
    
    protected native void publish() /*-{
    	    var ctx = this;
    	    var proxy = new Object();
    	    proxy.savePage = function(){
    	    	ctx.@eu.ydp.qtiPageEditor.client.view.component.PageEditorView::onSavePage()();
    	    }
    	    
    	    proxy.getAssetBrowser = function(){
    	    	return ctx.@eu.ydp.qtiPageEditor.client.view.component.PageEditorView::getAssetBrowser()()
    	    }
    	 
    	    
    	    if(typeof($wnd.tinyMCE.gwtProxy) != "object")
    	    	$wnd.tinyMCE.gwtProxy = proxy;
   	}-*/;



}
