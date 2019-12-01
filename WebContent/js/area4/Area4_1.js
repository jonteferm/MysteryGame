class Area4_1 extends World{
	constructor(){
		super();
		this.lightBackground = "area4_1";
		this.duskBackground = "area4_1_dusk";
		this.tainted = false;
	}
	
	createArea(){
		this.directionArrows.setBorderingAreas('', '', 'area5_0', 'area4_0');
	}
	
	updateArea(){

	}
}