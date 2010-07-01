package eu.ydp.qtitesteditor.client.model;

import eu.ydp.qtiPageEditor.client.constance.Constances;
import eu.ydp.qtiPageEditor.client.model.QtiProxyBase;
import eu.ydp.qtitesteditor.client.model.vo.QtiTestModel;
import eu.ydp.webapistorage.client.storage.IResource;
import eu.ydp.webapistorage.client.storage.apierror.IApiError;
import eu.ydp.webapistorage.client.storage.callback.IResourceCallback;
import eu.ydp.webapistorage.client.storage.callback.IResourceTextCallback;

public class QTITestModelProxy extends QtiProxyBase {
	
	public static final String NAME = "qtiTestModelProxy";	
	public QTITestModelProxy(){
		super(NAME, new QtiTestModel());		
	}	
	
	public void load(){
		IResource resource = _storage.getResource(_testPath);
		resource.load(new IResourceTextCallback() {
			
			@Override
			public void onRequestError(IResource resource, String command,
					IApiError error) {
				sendNotification(Constances.LOAD_TEST_ERROR, error);
				
			}
			
			@Override
			public void onRequestComplete(IResource resource, String command,
					String content) {
				getVO().setContent(content);
				
				String[] hrefs = getVO().getItemsHrefs();
				
				if(hrefs.length > 0)
				{
					String base = _testPath.substring(0, _testPath.lastIndexOf("/")+1);
					String pagePath = base + hrefs[0];
					sendNotification(Constances.CONFIGURE_PAGE_EDITOR_VIEW, pagePath);
					sendNotification(Constances.LOAD_PAGES, hrefs);
					
				}
				else				
					sendNotification(Constances.ADD_NEW_PAGE_TO_MODEL);				
				
			}
		});
	}	
	
	public void addPage(){
		getVO().addNewPage();
	}
	
	public void removePage(int ix){
		getVO().removePage(ix);
	}
	
	public void swapItems(int from, int to){
		getVO().swapItems(from, to);
		
	}
	
	public void moveDown(int ix){
		getVO().moveDown(ix);
	}
	
	public void moveUp(int ix){
		getVO().moveUp(ix);
	}
	
	public QtiTestModel getVO(){
		return (QtiTestModel)getData();
		
	}	
	
	public void save(){
		
		IResource resource = _storage.getResource(_testPath);
		resource.save( getVO().getContent(), new IResourceCallback() {
			
			@Override
			public void onRequestError(IResource resource, String command,
					IApiError error) {
				sendNotification(Constances.SAVE_TEST_ERROR, error);
				
			}
			
			@Override
			public void onRequestComplete(IResource resource, String command) {
				// TODO Auto-generated method stub
				
			}
		});		
	}
	

}
