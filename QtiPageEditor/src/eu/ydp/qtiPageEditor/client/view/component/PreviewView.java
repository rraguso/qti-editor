package eu.ydp.qtiPageEditor.client.view.component;

import com.google.gwt.user.client.ui.DialogBox;
import com.qtitools.player.client.model.Assessment;
import com.qtitools.player.client.model.AssessmentItem;
import com.qtitools.player.client.view.PlayerWidget;

public class PreviewView extends DialogBox {
	
	PlayerWidget _player;
	
	public PreviewView(){		
		
		super(false,true);
		_player = new PlayerWidget(null);
		_player.setSize("400px", "300px");
		//setWidget(_player);		
	}
	
	public void showPreview(Assessment assessment, AssessmentItem assessmentItem, int pageIndex ){
		
		center();
		_player.showPage(assessment, assessmentItem, pageIndex);
		
	}
	
	

}
