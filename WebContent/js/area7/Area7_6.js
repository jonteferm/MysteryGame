class Area7_6 extends World {
	constructor(){
		super();
		this.lightBackground = "area7_6";
		this.activeLocationOfInterest = null;
	}
	
	createArea(){
		this.directionArrows.setBorderingAreas('', '', 'area7_7', 'area7_5');
		
		this.raven = new Raven(this.game, 400, 80);
		this.raven.scale.setTo(2,2);
		this.game.add.existing(this.raven);
		this.raven.animations.play('closed', 4, true);

	}
	
	updateArea(){

	}
	
	
}