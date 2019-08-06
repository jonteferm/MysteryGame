class DrowsingArea extends Phaser.Sprite{
	constructor(game, x, y, width, height, areaType){
		super(game, x, y);
		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.areaType = areaType;
		this.examinationObject = null;
		
		this.area = new Phaser.Rectangle(x, y, width, height);
		//game.debug.geom(this.area, 'rgba(200,0,0,0.5)');
		this.body.setSize(width, height);
	}
	
	examine(){
		
	}
}