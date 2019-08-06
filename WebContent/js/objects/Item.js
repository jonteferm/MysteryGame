class Item extends Phaser.Sprite{
	constructor(game, x, y, type){
		super(game, x, y, type);
		this.id = 0;
		this.name = type;
	}
}


