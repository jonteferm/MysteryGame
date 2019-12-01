/**
 * Level state.
 */
class Area2_1 extends World {
	constructor(){
		super();
		this.lightBackground = "area2_1";
		this.duskBackground = "area2_1_dusk";
	}

	createArea(){
		this.directionArrows.setBorderingAreas('area2_0', '', 'area3', '');
	}

	
	updateArea(){
		//this.shakeCanvas();
	}
}




