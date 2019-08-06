class Spawnable extends Phaser.Sprite {
	constructor(game, x, y, onUpdate, key){
		super(game, x, y, key || 'ant_neutral');
		this.game = game;
		this.id = 0;
		this.onUpdate = onUpdate;
	}
	
	update(){
		this.onUpdate && this.onUpdate();
	}
}