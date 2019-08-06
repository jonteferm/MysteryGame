class ExaminationObject extends Phaser.Sprite{
	constructor(game, x, y, image, init){
		super(game, x, y, image);
		
		this.game = game;
		this.visible = false;
		this.onUpdate = null;
		
		this.inputEnabled = true;
		this.input.enableDrag();
		
		init(this);
	}
	
	

	open(){
		this.visible = true; 
	}
	
	close(){
		this.visible = false;
	}
}