package eu.ydp.qtiPageEditor.client.serviceregistry.services.impl.assetbrowser;

import java.util.Iterator;
import java.util.List;

import com.google.gwt.core.client.JavaScriptObject;
import com.google.gwt.core.client.JsArrayString;
import com.google.gwt.event.dom.client.ChangeEvent;
import com.google.gwt.event.dom.client.ChangeHandler;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.FormPanel;
import com.google.gwt.user.client.ui.HasVerticalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Image;
import com.google.gwt.user.client.ui.ListBox;
import com.google.gwt.user.client.ui.VerticalPanel;
import eu.ydp.qtiPageEditor.client.env.IEditorEnvirnoment;
import eu.ydp.qtiPageEditor.client.serviceregistry.services.IAssetBrowser;
import eu.ydp.qtiPageEditor.client.serviceregistry.services.IEditorService;
import eu.ydp.qtiPageEditor.client.view.component.AlertWindow;
import eu.ydp.webapistorage.client.storage.IResource;
import eu.ydp.webapistorage.client.storage.apierror.IApiError;
import eu.ydp.webapistorage.client.storage.callback.IResourceCallback;
import eu.ydp.webapistorage.client.storage.callback.IResourceListDirCallback;
import eu.ydp.webapistorage.client.storage.resource.listdir.IListDirItemDescriptor;


public class AssetBrowser extends DialogBox  implements IAssetBrowser, IResourceCallback, IEditorService {
	
	private String _selectedFilePath;
	
	private IEditorEnvirnoment _env;
	
	private VerticalPanel _contentPane;
	private HorizontalPanel _hFormUploadPanel;
	private FormPanel _uploadPanel;
	private ListBox _listBox;
	private Image _image;
	private Button _okButton;
	private Button _cancelButton;
	private String[] _fileFilter;
	
	public AssetBrowser(){		
		super(false, true);		
		setText("Upload / insert media for qti");
		
		setGlassEnabled(true);		
		
		
	}
	
	private void buildForm(){
		_contentPane = new VerticalPanel();	
		_contentPane.setSize("500px", "380px");
		_contentPane.setSpacing(4);
		_contentPane.setBorderWidth(1);
		
		_hFormUploadPanel = new HorizontalPanel();			
		
		HorizontalPanel hListPanel = new HorizontalPanel();
		HorizontalPanel hButtonPanel = new HorizontalPanel();
		
		
		hListPanel.setVerticalAlignment(HasVerticalAlignment.ALIGN_MIDDLE);
		
		_listBox = new ListBox(false);
		_listBox.setWidth("200px");
		_listBox.setVisibleItemCount(7);
		_listBox.addChangeHandler(new ChangeHandler() {
			
			@Override
			public void onChange(ChangeEvent event) {
				_image.setUrl(_listBox.getValue(_listBox.getSelectedIndex()));				
			}
		});
		
		_image = new Image();
		
		hListPanel.add(_listBox);
		hListPanel.add(_image);
		
		
		_okButton = new Button("Ok");
		_cancelButton = new Button("Cancel");
		
		_cancelButton.addClickHandler(new ClickHandler() {
			
			@Override
			public void onClick(ClickEvent event) {
				onButtonClick(event);
				
			}
		});
		
		
		hButtonPanel.add(_okButton);
		hButtonPanel.add(_cancelButton);	
		
		_contentPane.add(_hFormUploadPanel);
		_contentPane.add(hListPanel);
		_contentPane.add(hButtonPanel);
		
		setWidget(_contentPane);		
	}
	
	@Override
	public void setEnvironment(IEditorEnvirnoment env){
		_env = env;
		buildForm();
	}	
	
	@Override
	public void browse(AssetBrowserCallback browseCallback) {
		browse(browseCallback, null);
	}
	
	private void browseJSFilter(AssetBrowserCallback browseCallback, JsArrayString fileFilter ){
		String[] ff = new String[fileFilter.length()];
		int i;
		for(i = 0; i < ff.length; i++)
			ff[i] = fileFilter.get(i);
		
		browse(browseCallback, ff);
	}

	@Override
	public void browse(AssetBrowserCallback browseCallback, String[] fileFilter) {
		
		String basePath = _env.getBasePath();
		String mediaPath = basePath.substring(0,basePath.lastIndexOf("/")+1) + _env.getMediaDirectory();
		
		IResource uploadResource = _env.getStorage().getResource(mediaPath);
		if(fileFilter == null)
			_uploadPanel = uploadResource.startPutDialog(this);
		else
			_uploadPanel = uploadResource.startPutDialog(this, fileFilter);
		
		_hFormUploadPanel.add(_uploadPanel);
		
		this.center();
		
		if(fileFilter != null)
			_fileFilter = fileFilter;		
		
		IResource listDirResource = _env.getStorage().getResource(mediaPath);
		listDirResource.listDir(new IResourceListDirCallback() {			
			@Override
			public void onListDirError(IResource resource, IApiError error) {
				onListDirErrorListener(resource, error);
				
			}
			
			@Override
			public void onListDirComplete(IResource resource, List<IListDirItemDescriptor> dirList) {
				onListDirCompleteListener(resource, dirList);
				
			}
		});
	}

	@Override
	public String getSelectedAssetPath() {
		return _selectedFilePath;
	}

	@Override
	public void setSelectedAssetPath(String filePath) {
		_selectedFilePath = filePath;

	}
	
	//--------------------- IResourceCallback-------------------------
	@Override
	public void onRequestError(IResource resource, String command,IApiError error) {
		Window.alert(error.getDetails() +"\n" + "Error code:" + error.getErrorCode());		
		
	}
	
	@Override
	public void onRequestComplete(IResource resource, String command) {	
		
	}
	//----------------------------Click handler---------------------------------
	
	private void onButtonClick(ClickEvent event) {
		if(event.getSource().equals(_cancelButton))
			this.hide();
			
	}
	
	//------------------ IResourceListDirCallBack------------------------------
	
	
	private void onListDirErrorListener(IResource resource, IApiError error) {
		Window.alert(error.getDetails() +"\n" + "Error code:" + error.getErrorCode());		
	}
	
	
	private void onListDirCompleteListener(IResource resource, List<IListDirItemDescriptor> dirList) {
		Iterator<IListDirItemDescriptor> iterator = dirList.iterator();
		IListDirItemDescriptor item;
		int i;
		String fileName;
		while(iterator.hasNext()){			
			item =iterator.next();			
			if(_fileFilter != null){
				for(i = 0; i < _fileFilter.length; i++){
					fileName = item.getFileName().toLowerCase();
					if(fileName.indexOf(_fileFilter[i].toLowerCase()) == fileName.length() - _fileFilter[i].length())
						_listBox.addItem(item.getFileName(), item.getAbsolutePath());	
				}
			}
			else
				_listBox.addItem(item.getFileName(), item.getAbsolutePath());
			
		}
		
	}
	
	//----------------------------------------------------------------------
	
	public  native JavaScriptObject getJSO()/*-{
	
		var doc = this;		
		AssetBrowser = function(){									
			this.browse = function(browseCallback, fileFilter){				
				if(fileFilter != null)
					doc.@eu.ydp.qtiPageEditor.client.serviceregistry.services.impl.assetbrowser.AssetBrowser::browseJSFilter(Leu/ydp/qtiPageEditor/client/serviceregistry/services/impl/assetbrowser/AssetBrowserCallback;Lcom/google/gwt/core/client/JsArrayString;)(browseCallback,fileFilter )
				else
					doc.@eu.ydp.qtiPageEditor.client.serviceregistry.services.impl.assetbrowser.AssetBrowser::browse(Leu/ydp/qtiPageEditor/client/serviceregistry/services/impl/assetbrowser/AssetBrowserCallback;)(browseCallback);
			}
			
			this.setSelectedAssetPath = function(path){
				doc.@eu.ydp.qtiPageEditor.client.serviceregistry.services.impl.assetbrowser.AssetBrowser::setSelectedAssetPath(Ljava/lang/String;)(path);
			}
			
			this.getSelectedAssetPath = function(){
				doc.@eu.ydp.qtiPageEditor.client.serviceregistry.services.impl.assetbrowser.AssetBrowser::getSelectedAssetPath()();
			}    				
		}
		
		return new AssetBrowser();	

	}-*/;
	
	//------------------------------------------------------------
}
