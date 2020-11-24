class Raven extends Phaser.Sprite {
	constructor(game, x, y){
		super(game, x, y, 'korp_spritesheet');
		this.animations.add('closed', [1,2]);
		this.animations.add('open', [1,2]);
		
		this.game.physics.enable(this, Phaser.Physics.ARCADE);

	}
}
