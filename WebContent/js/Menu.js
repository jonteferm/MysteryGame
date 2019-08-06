/**
 * Menu state.
 */
class Menu extends Phaser.State{
	constructor(){
		super();
	}
	Phaser.State.call(this);
	// TODO: generated method.
	
	preload(){
		var sprite;
		sprite = this.add.sprite(this.world.centerX, this.world.centerY,
				"tap-to-start");
		sprite.anchor.set(0.5);
	}
	
	create(){
		this.input.onDown.addOnce(function() {
			this.game.state.start("level");
		}, this);
	}
}