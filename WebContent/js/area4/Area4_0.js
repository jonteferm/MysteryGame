class Area4_0 extends World{
	constructor(){
		super();
		this.lightBackground = "area4_0";
		this.duskBackground = "area4_0 _dusk";
		this.tainted = false;
	}
	
	createArea(){
		this.directionArrows.setBorderingAreas('area3', '', 'area4_1', '');
		this.drowsingArea = new DrowsingArea(this.game, 500, 400, 100, 100, areaTypes.CRYSTAL_ENERGY);
		this.game.physics.enable(this.drowsingArea, Phaser.Physics.ARCADE);
	}
	
	updateArea(){
		if(this.game.physics.arcade.overlap(this.pendulum, this.drowsingArea)){
			this.pendulum.overlappingArea = this.drowsingArea;

		}else{
			this.pendulum.reset();
		}
	}
}