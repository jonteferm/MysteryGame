/**
 * Level state.
 */
class Area2p extends World {
	constructor(){
		super();
		this.lightBackground = "area2p";
	}

	createArea(){
		this.directionArrows.setBorderingAreas('area2', '', 'area3', '');
	}

	
	update(){
		//this.shakeCanvas();
	}
}




