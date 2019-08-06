class CrystalAnt extends Spawnable {
	constructor(game, x, y, onUpdate, key){
		super(game, x, y, onUpdate, key || 'ant_neutral');
		
		this.animations.add('walk', [0,1,2,1,0,3,4]);
		this.animations.play('walk', 8, true);
	    this.game.physics.arcade.enable(this);
	    this.tween = null;
	    this.yVelocity = -20;
	}
	
	create(){


	}
	
	update(){
		super.update();
		this.body.velocity.y = this.yVelocity;
	}
}