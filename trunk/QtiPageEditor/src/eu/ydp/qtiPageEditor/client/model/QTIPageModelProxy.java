package eu.ydp.qtiPageEditor.client.model;

import java.util.ArrayList;
import java.util.Collections;

import eu.ydp.qtiPageEditor.client.constance.Constances;
import eu.ydp.qtiPageEditor.client.model.jso.SaveCallback;
import eu.ydp.webapistorage.client.storage.IResource;
import eu.ydp.webapistorage.client.storage.apierror.IApiError;
import eu.ydp.webapistorage.client.storage.callback.IResourceCallback;
import eu.ydp.webapistorage.client.storage.callback.IResourceTextCallback;
import eu.ydp.webapistorage.client.util.ApiErrorToJs;

public class QTIPageModelProxy extends QtiProxyBase{
	
	public static final String NAME = "qtiPagesDataModelProxy";
	
	private int _selectedIndex;
	
	private SaveCallback _jsSaveCallback;
	
	public QTIPageModelProxy() {
		super(NAME, new ArrayList<QTIPageModel>());
		_selectedIndex = -1;
	}
	
	public void setSaveCallback(SaveCallback jsSaveCallback){
		_jsSaveCallback = jsSaveCallback;
	}
	
	public void load(String[] hrefs){		
		
		if(hrefs.length > 0){		
			loadPages(hrefs);
		}
		
	}
	@SuppressWarnings("unchecked")
	private void loadPages(final String[] hrefs){
		
		final ArrayList<QTIPageModel> pages = (ArrayList<QTIPageModel>)getData();		
		String path = _testPath.substring(0, _testPath.lastIndexOf("/")+1);
		String pagePath = path + hrefs[pages.size()];
		IResource resource = _storage.getResource(pagePath);
		resource.load(new IResourceTextCallback() {
			
			@Override
			public void onRequestError(IResource resource, String command,
					IApiError error) {
				sendNotification(Constances.LOAD_PAGE_ERROR, error);
				
			}
			
			
			@Override
			public void onRequestComplete(IResource resource, String command,String content) {
								
				QTIPageModel page = new QTIPageModel();
				page.setContent(content);
				page.setPath(resource.getPath());
				
				pages.add(page);			
				
				if(pages.size() < hrefs.length){
					loadPages(hrefs);
				}
				else
				{					
					String[] titles = new String[pages.size()];
					int i;
					for(i = 0;i < pages.size(); i++)
						titles[i] = pages.get(i).getTitle();
					
					_selectedIndex = 0;		
					sendNotification(Constances.PAGES_LOADED, titles);
				}
							
			}
			
		});
	}
	
	@SuppressWarnings("unchecked")
	public void reload(int ix){
		final ArrayList<QTIPageModel> pages = (ArrayList<QTIPageModel>)getData();
		final QTIPageModel page = pages.get(ix);
		String path = page.getPath();		
		IResource resource = _storage.getResource(path);
		resource.load(new IResourceTextCallback() {
			
			@Override
			public void onRequestError(IResource resource, String command, IApiError error) {				
				sendNotification(Constances.LOAD_PAGE_ERROR, error);
			}
			
			@Override
			public void onRequestComplete(IResource resource, String command, String content) {				
				page.setContent(content);
				
				String[] titles = new String[pages.size()];
				int i;
				for(i = 0;i < pages.size(); i++)
					titles[i] = pages.get(i).getTitle();
				
				sendNotification(Constances.PAGES_LOADED, titles);
			}
		});

		
	}
	
	public void setSelectedIndex(int ix){
		_selectedIndex = ix;
	}
	
	public int getSelectedIndex(){
		return _selectedIndex;
	}
	
	public void setPagePath(String path){
		setPagePath(path,-1);
	}
	
	@SuppressWarnings("unchecked")
	public void setPagePath(String path, int ix){
		_testPath = path;
		ArrayList<QTIPageModel> pages = (ArrayList<QTIPageModel>)getData();
		int n = (ix > -1) ? ix : 0;
		
		pages.get(n).setPath(path);
		
	}
	
	@SuppressWarnings("unchecked")
	public void addPage(String href){		
		ArrayList<QTIPageModel> pages = (ArrayList<QTIPageModel>)getData();
		
		QTIPageModel page = new QTIPageModel();
		String basePath = _testPath.substring(0, _testPath.lastIndexOf("/")+1);
		page.setPath(basePath + href);
		page.setTitle(href.substring(href.lastIndexOf("/")+1));
		
		pages.add(page);		
		
	}
	
	@SuppressWarnings("unchecked")
	public void addPage(){		
		ArrayList<QTIPageModel> pages = (ArrayList<QTIPageModel>)getData();
		
		QTIPageModel page = new QTIPageModel();		
		pages.add(page);		
	}
	
	@SuppressWarnings("unchecked")
	public void removePage(int ix){
		
		ArrayList<QTIPageModel> pages = (ArrayList<QTIPageModel>)getData();
		pages.remove(ix);
	}
	
	@SuppressWarnings("unchecked")
	public void swapItems(int from, int to){
		ArrayList<QTIPageModel> pages = (ArrayList<QTIPageModel>)getData();
		Collections.swap(pages, from, to);
		
	}
	@SuppressWarnings("unchecked")
	public void moveDown(int ix){
		ArrayList<QTIPageModel> pages = (ArrayList<QTIPageModel>)getData();
		if(ix+1 <pages.size())
			swapItems(ix, ix+1);
		else
			swapItems(0, ix);
	}
	@SuppressWarnings("unchecked")
	public void moveUp(int ix){
		ArrayList<QTIPageModel> pages = (ArrayList<QTIPageModel>)getData();
		if(ix > 0)
			swapItems(ix, ix-1);
		else
			swapItems(pages.size()-1, ix);
	}
	
	
	@SuppressWarnings("unchecked")
	public ArrayList<QTIPageModel> getDataVO(){
		return (ArrayList<QTIPageModel>)getData();
	}
	
	public void updatePageState(int ix, String content){
		getDataVO().get(ix).setContent(content);
	}
	
	@SuppressWarnings("unchecked")
	public void save(int ix){
		
		//String basePath = _testPath.substring(0, _testPath.lastIndexOf("/")+1);
		String path;
		ArrayList<QTIPageModel> pages = (ArrayList<QTIPageModel>)getData();
		QTIPageModel page = pages.get(ix);
			
		path = page.getPath();
		//path = basePath + page.getPath();
		//Window.alert(basePath + "\n" + path);
		IResource resource = _storage.getResource(path);		
		
		resource.save(page.getContent(), new IResourceCallback() {
			
			@Override
			public void onRequestError(IResource resource, String command,IApiError error) {
				sendNotification(Constances.SAVE_PAGE_ERROR, error);
				if(_jsSaveCallback != null)
					_jsSaveCallback.onSaveError(ApiErrorToJs.toJs(error));
				
			}
				
			@Override
			public void onRequestComplete(IResource resource, String command) {
				// TODO Auto-generated method stub
				if(_jsSaveCallback != null)
					_jsSaveCallback.onSaveComplete();
									
			}
		});						
	}
	
	
}
