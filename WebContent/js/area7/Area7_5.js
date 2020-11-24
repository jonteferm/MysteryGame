class Area7_5 extends World {
	constructor(){
		super();
		this.lightBackground = "area7_5";
		this.activeLocationOfInterest = null;
	}
	
	createArea(){
		//this.directionArrows.setBorderingAreas('', '', 'area8_0', 'area7_4');
		
		this.raven = new Raven(this.game, 400, 80);
		this.raven.scale.setTo(2,2);
		this.game.add.existing(this.raven);
		this.raven.animations.play('closed', 4, true);

	}
	
	updateArea(){

	}
	
	
}