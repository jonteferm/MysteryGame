class ParticleEmitter{
	constructor(game, x, y, maxParticles, size, gravity, type){
		this.game = game;
		this.x = x;
		this.y = y;
		this.maxParticles = maxParticles;
		this.size = size;
		this.gravity = gravity;
		this.type = type;
		this.rotation = {min: 0, max: 0};
		this.alpha = {min: 0.8, max: 0.8};
		this.scale = {
				min: {x: 1, y: 1}, 
				max: {x: 1, y: 1}
		};	
		
		this.init();
	}
	
	init(){
		this.emitter = this.game.add.emitter(this.x, this.y, this.maxParticles);
		this.emitter.setSize(this.size.width, this.size.height);
		
		this.emitter.makeParticles(this.type);
		
	    this.emitter.setRotation(this.rotation.min, this.rotation.max);
	    this.emitter.setAlpha(this.alpha.min, this.alpha.max);
	    this.emitter.setScale(this.scale.min, this.scale.max);
	    this.emitter.gravity = this.gravity;
	}
	
	start(explode, lifespan, frequency, quantity, forceQuantity){
		quantity = quantity || 0;
		forceQuantity = forceQuantity || false;
	    this.emitter.start(explode, lifespan, frequency, quantity, forceQuantity);
	}
}