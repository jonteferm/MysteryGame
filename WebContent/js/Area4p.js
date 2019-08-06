class Area4p extends World{
	constructor(){
		super();
		this.lightBackground = "area4p";
		this.tainted = false;
	}
	
	createArea(){
		this.directionArrows.setBorderingAreas('', '', 'area5_0', 'area4');
	}
	
}