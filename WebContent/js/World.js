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
			this.signalManager = new SignalManager(this.game, this);
			this.uiManager = new UIManager(this.game, this);
			this.spellManager = new SpellManager(this.game, this);
		}else{
			params.directionArrows.destroy(true);
			this.areas = params.areas;
			this.milestoneManager = params.milestoneManager;
			this.timeManager = params.timeManager;
			this.dusk = params.dusk;
			this.backgroundManager = params.backgroundManager;
			this.signalManager = params.signalManager;
			this.uiManager = params.uiManager;
			this.spellManager = params.spellManager;
			
			this.backgroundManager.context = this;
			this.signalManager.context = this;
			this.uiManager.context = this;
			this.spellManager.context = this;
		}
		

		this.uiManager.initUIComponents(params);
		this.signals = this.signalManager.signals;
		this.spellManager.initSpells(1)
		this.game.physics.enable(this.pendulum, Phaser.Physics.ARCADE);
	}
	
	create(){
		//TODO: Utfällbar kontrollpanel 
	
		//this.initDrawSurface();
	    
	    //this.game.world.setBounds(-20, -20, game.width+20, game.height+2);	
		this.directionArrows = new DirectionArrows(this.game, this.game.camera.x, this.game.camera.y, this.signals);

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




