class World extends Phaser.State {
	constructor(){
		super();
		this.backgroundId = "";
		this.drawMode = false;
		this.drawSurface = {};
		this.spellLibrary = [];
		this.activeLocationOfInterest = null;

	}

	init(params){	
		if(params === undefined){
			this.areas = {
					"area1": Area1,
					"area2_0": Area2_0,
					"area2_1": Area2_1,
					"area3_0": Area3_0,
					"area4_0": Area4_0,
					"area4_1": Area4_1,
					"area5_0": Area5_0,
					"area5_1": Area5_1,
					"area5_2": Area5_2,
					"area5_3": Area5_3,
					"area6_0": Area6_0,
			};
			this.dusk = false;
			this.milestoneManager = new MilestoneManager(this.cache.getJSON("milestones"));
			this.effectsManager = new EffectsManager(this.game, this);
			this.timeManager = new TimeManager(new Date('2010-10-24T17:50:00'), 18, 17);
			this.backgroundManager = new BackgroundManager(this);
		}else{
			params.directionArrows.destroy(true);
			this.areas = params.areas;
			this.milestoneManager = params.milestoneManager;
			this.timeManager = params.timeManager;
			this.dusk = params.dusk;
			this.backgroundManager = new BackgroundManager(this);
		}
		
		this.signals = new SignalManager(this.game, this).signals;
		this.uiManager = new UIManager(this.game, this);
		this.uiManager.initUIComponents(params);
	}
	
	create(){
		//TODO: Utfällbar kontrollpanel 
	
		//this.initDrawSurface();
	    
	    //this.game.world.setBounds(-20, -20, game.width+20, game.height+2);	
		this.directionArrows = new DirectionArrows(this.game, this.game.camera.x, this.game.camera.y, this.signals);

		this.spellbook.inputEnabled = true;
		this.spellbook.input.enableDrag();
		this.spellbook.scale.set(0);
		this.game.add.existing(this.spellbook);
		this.spellbook.fixedToCamera = true;
	
		this.inventory.inputEnabled = true;
		this.inventory.input.enableDrag();
		this.inventory.scale.set(0);
		this.game.add.existing(this.inventory);
		this.inventory.fixedToCamera = true;
		
		this.game.add.existing(this.pendulum);
		this.pendulum.inputEnabled = true;
		this.pendulum.input.enableDrag();
		this.pendulum.fixedToCamera = true;
		this.pendulum.scale.set(0);
		this.game.physics.enable(this.pendulum, Phaser.Physics.ARCADE);
		
		this.spellManager = new SpellManager(this.game, this);
		this.backgroundManager.setBackground();

		this.createArea();
	}
	
	update(){
		this.timeManager.update();

		if(!this.dusk && this.timeManager.isPastDusk()){
			this.dusk = true;
			this.backgroundManager.setBackground();
		}

		this.updateArea();
	}
	
	render(){
		this.directionArrows.bringToTop();
	}
	
	shakeCanvas(){
	    var min = -30;
        var max = 30;
		$('#drawSurface').css('left', (Math.floor(Math.random() * (max - min + 1)) + min) + 280 + 'px');
		$('#drawSurface').css('top', Math.floor(Math.random() * (max - min + 1)) + min + 'px');
	}
}




