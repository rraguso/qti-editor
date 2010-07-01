package eu.ydp.qtitesteditor.client.view.component;

import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.ListBox;

public class PageListView extends Composite {
		
	private ListBox _listBox;	
	
	public PageListView(){		
		_listBox = new ListBox();
		_listBox.setWidth("100%");
		_listBox.setVisibleItemCount(14);
		initWidget(_listBox);		
	}
	
	public ListBox  getListBox(){
		return _listBox;
	}
	
	public void showPages(String[] titles){
		int i;
		for(i = 0; i < titles.length; i++)		
			_listBox.addItem(titles[i]);
		
	}
	
	public void addPage(String title){
		_listBox.addItem(title);		
	}
	
	public void removePage(int ix){
		_listBox.removeItem(ix);
	}
	
	public int getSelectedIndex(){
		return _listBox.getSelectedIndex();
	}
	
	public void setSelectedIndex(int ix){
		_listBox.setSelectedIndex(ix);
	}
	
	public int getItemCount(){
		return _listBox.getItemCount();
	}
	
	public void moveUpPage(int ix){
		if(ix > 0)
			swapItems(ix, ix-1);
		else
			swapItems(getItemCount()-1, 0);
	}
	
	public void moveDownPage(int ix){
		if(ix + 1 < getItemCount())
			swapItems(ix, ix+1);
		else
			swapItems(ix, 0);
			
		
	}
	
	private void swapItems(int n0, int n1){
		String item0 = _listBox.getItemText(n0);
		String item1 = _listBox.getItemText(n1);
		String temp = item0;
		item0 = item1;
		item1 = temp;
		
		_listBox.setItemText(n0, item0);
		_listBox.setItemText(n1, item1);
	}
	
	
	
	
	

}
