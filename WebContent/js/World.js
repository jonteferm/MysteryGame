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
		// TODO: What to do with these?
		this.signalManager = new SignalManager(this.game, this);
		this.spellManager = new SpellManager(this.game, this);

		
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
					"area7_0": Area7_0,
					"area7_1": Area7_1,
					"area7_2": Area7_2,
					"area7_3": Area7_3,
					"area7_4": Area7_4,
					"area7_5": Area7_5,
					"area7_6": Area7_6,
					"area7_7": Area7_7,
					"area7_8": Area7_8,
					"area7_9": Area7_9,
					"area8_0": Area8_0,
					"area8_1": Area8_1,
					"area8_2": Area8_2,
					"area8_3": Area8_3,
					"area9_0": Area9_0,
					"area9_labyrinth_0": Area9_labyrinth_0,
					"area9_labyrinth_1": Area9_labyrinth_1,
					"area9_labyrinth_2": Area9_labyrinth_2,
					"area9_labyrinth_3": Area9_labyrinth_3,
					"area9_labyrinth_4": Area9_labyrinth_4,
					"area9_labyrinth_5": Area9_labyrinth_5,
					"area9_labyrinth_6": Area9_labyrinth_6,
					"area9_labyrinth_7": Area9_labyrinth_7,
					"area9_labyrinth_8": Area9_labyrinth_8,
					"area9_labyrinth_9": Area9_labyrinth_9,
					"area9_labyrinth_10": Area9_labyrinth_10,
					"area9_labyrinth_11": Area9_labyrinth_11,
			};
			this.dusk = false;
			this.milestoneManager = new MilestoneManager(this.cache.getJSON("milestones"));
			this.effectsManager = new EffectsManager(this.game, this);
			this.timeManager = new TimeManager(new Date('2010-10-24T17:50:00'), 18, 17);
			this.backgroundManager = new BackgroundManager(this);
			this.uiManager = new UIManager(this.game, this);
		}else{
			params.directionArrows.destroy(true);
			this.areas = params.areas;
			this.milestoneManager = params.milestoneManager;
			this.timeManager = params.timeManager;
			this.dusk = params.dusk;
			this.backgroundManager = params.backgroundManager;
			this.uiManager = params.uiManager;
			this.backgroundManager.context = this;
			this.uiManager.context = this;

		}
		
		this.uiManager.initUIComponents(params);
		this.signals = this.signalManager.signals;
		this.spellManager.initSpells(1)
		this.game.physics.enable(this.pendulum, Phaser.Physics.ARCADE);
	}
	
	create(){
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
		
		/*
		this.area = new Phaser.Rectangle(480, 250, 200, 300);
		this.game.debug.geom(this.area, 'rgba(200,0,0,0.5)');
		*/
		
	}
	
	shakeCanvas(){
	    var min = -30;
        var max = 30;
		$('#drawSurface').css('left', (Math.floor(Math.random() * (max - min + 1)) + min) + 280 + 'px');
		$('#drawSurface').css('top', Math.floor(Math.random() * (max - min + 1)) + min + 'px');
	}
}




