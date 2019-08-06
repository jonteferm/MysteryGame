/**
 * Level state.
 */
class Area2 extends World {
	constructor(){
		super();
		this.lightBackground = "area2";
	}

	createArea(){
		this.directionArrows.setBorderingAreas('area1', 'area2p', 'area6_0', '');

	}

	
	update(){
		//this.shakeCanvas();
	}
}




