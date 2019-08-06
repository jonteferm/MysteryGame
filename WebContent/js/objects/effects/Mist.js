class Mist{
	constructor(game, x, y, scale, alpha, tint){
		this.game = game;
		this.x = x;
		this.y = y;
		this.scale = scale;
		this.tint = tint;
		this.alpha = alpha;
		
	    this.mist = this.game.add.image(x, y, 'mist');
	    this.mist.scale.setTo(scale.x, scale.y);
	    this.mist.alpha = alpha;
	}
	
	destroy(){
		this.mist.destroy();
	}
}