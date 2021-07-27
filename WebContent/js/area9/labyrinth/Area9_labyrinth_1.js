class Area9_labyrinth_1 extends World {
	constructor(){
		super();
		this.lightBackground = "area9_labyrinth_1";
		this.activeLocationOfInterest = null;
	}
	
	createArea(){
		
		this.directionArrows.setBorderingAreas('area9_labyrinth_0', 'area9_labyrinth_2', '', '');

	}
	
	updateArea(){

	}
	
	
}