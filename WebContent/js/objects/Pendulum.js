class Pendulum extends Phaser.Sprite{
	constructor(game, x, y){
		super(game, x, y, 'pendulum');
		
		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		
		this.animations.add('dingle', [2,3,4,3,2,1,0,1]);
		this.animations.add('circle', [0,1,2,3]);
		this.overlappingArea = null;
		

	

		console.log("pendulum: ", this.body);

	}
	
	update(){
		if(this.overlappingArea !== null && this.overlappingArea.areaType === areaTypes.CRYSTAL_ENERGY){
			if(this.key !== 'pendulumCircle'){
				this.loadTexture('pendulumCircle')
				this.dingle();
			}
		}
		

	}
	
	dingle(){
		console.log(this.key);
		if(this.key === 'pendulum'){
			this.animations.play('dingle', 4, true);
		}else if(this.key === 'pendulumCircle'){
			this.animations.play('circle', 4, true);
		}
	
	}
	
	reset(){
		if(this.overlappingArea !== null){
			this.overlappingArea = null;
			this.loadTexture('pendulum');
			this.dingle();
		}
	}
}