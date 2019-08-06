class LocationOfInterest extends Phaser.Sprite{
	constructor(game, x, y, width, height, examinationObject){
		super(game, x, y);
		
		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.setSize(width, height);
		this.inputEnabled = true;
		
		this.examinationObject = examinationObject;
		
		/*
		this.area = new Phaser.Rectangle(x, y, width, height);
		this.game.debug.geom(this.area, 'rgba(200,0,0,0.5)');
		*/
	}
	
	examine(){
		this.examinationObject.open();
	}
	
	exit(){
		this.examinationObject.destroy();
		this.examinationObject = null;
	}
}