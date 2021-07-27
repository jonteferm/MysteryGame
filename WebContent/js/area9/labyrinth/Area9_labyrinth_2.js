class Area9_labyrinth_2 extends World {
	constructor(){
		super();
		this.lightBackground = "area9_labyrinth_2";
		this.activeLocationOfInterest = null;
	}
	
	createArea(){
		
		this.directionArrows.setBorderingAreas('area9_labyrinth_1', 'area9_labyrinth_3', 'area9_labyrinth_6', '');

	}
	
	updateArea(){

	}
	
	
}