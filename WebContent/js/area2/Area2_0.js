/**
 * Level state.
 */
class Area2_0 extends World {
	constructor(){
		super();
		this.lightBackground = "area2_0";
		this.duskBackground = "area2_0_dusk";
		this.wickedDuskBackground ="area2_0_dusk_wicked";
	}

	createArea(){
		this.directionArrows.setBorderingAreas('area1', 'area2_1', 'area6_0', '');

	}

	
	updateArea(){
		//this.shakeCanvas();
	}
}




