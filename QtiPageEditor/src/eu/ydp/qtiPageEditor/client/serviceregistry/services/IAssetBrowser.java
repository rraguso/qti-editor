package eu.ydp.qtiPageEditor.client.serviceregistry.services;

import eu.ydp.qtiPageEditor.client.serviceregistry.services.impl.assetbrowser.AssetBrowserCallback;

public interface IAssetBrowser {
	
	void browse(AssetBrowserCallback browseCallback );
	void browse(AssetBrowserCallback browseCallback, String[] fileFilter );
	void setSelectedAssetPath(String filePath);
	void setSelectedFile(String fileName);
	String getSelectedAssetPath();

}
