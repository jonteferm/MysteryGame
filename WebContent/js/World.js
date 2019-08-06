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
		//console.log(this.cache);
		console.log(params);
		console.log(this.game.state.states);
		
		this.signals = new SignalManager(this.game, this).signals;

		if(params === undefined){
			this.areas = {
					"area1": Area1,
					"area2": Area2,
					"area2p": Area2p,
					"area3": Area3,
					"area4": Area4,
					"area4p": Area4p,
					"area5_0": Area5_0,
					"area5_1": Area5_1,
					"area5_2": Area5_2,
					"area5_3": Area5_3,
					"area6_0": Area6_0,
			};
			
			
			this.inventory = new Inventory(this.game, 0, (48*4));
			this.spellbook = new Spellbook(this.game, 100, 100);		
			this.pendulum = new Pendulum(this.game, 750, 20);
			this.milestones = this.cache.getJSON("milestones");
			
			this.controlPanel = new ControlPanel(this.game, this.game.camera.x, this.game.camera.y+(880-160));
			this.controlPanel.fixedToCamera = true;
			
			this.keyManager = new KeyManager(this.game);
			this.initKeyBindings(this.keyManager);

			this.effectsManager = new EffectsManager(this.game, this);
			
			this.krumilurTopLeft = new Phaser.Image(this.game, 0, 0, 'krumilur_top_left');
			this.krumilurTopRight = new Phaser.Image(this.game, 1150, 0, 'krumilur_top_right');
			this.krumilurBottomRight = new Phaser.Image(this.game, 1150, 590, 'krumilur_bottom_right');
			this.krumilurBottomLeft = new Phaser.Image(this.game, 0, 590, 'krumilur_bottom_left');
			
			this.game.add.existing(this.krumilurTopLeft);
			this.game.add.existing(this.krumilurTopRight);
			this.game.add.existing(this.krumilurBottomRight);
			this.game.add.existing(this.krumilurBottomLeft);

			
		}else{
			params.directionArrows.destroy(true);

			this.areas = params.areas;
			this.inventory = params.inventory;
			this.spellbook = params.spellbook;		
			this.pendulum = params.pendulum;
			this.milestones = params.milestones;
			this.controlPanel = params.controlPanel;
			this.keyManager = params.keyManager;
			this.krumilurTopLeft = params.krumilurTopLeft;
			this.krumilurTopRight = params.krumilurTopRight;
			this.krumilurBottomRight = params.krumilurBottomRight;
			this.krumilurBottomLeft = params.krumilurBottomLeft;
			
			this.initKeyBindings(this.keyManager);
			
		}
	}
	
	create(){
		//TODO: Utfällbar kontrollpanel 
	
		//this.initDrawSurface();
	    
	    //this.game.world.setBounds(-20, -20, game.width+20, game.height+2);	
		
		var transitionScreen = this.game.add.image(0,0, 'transition_screen');
		transitionScreen.alpha = 0;
		
		var transitionTween = this.game.add.tween(transitionScreen).to({alpha: 1}, 2000, Phaser.Easing.Linear.None);
		transitionTween.start();
		
		transitionTween.onComplete.add(function(){
			transitionScreen.destroy();
			this.setBackground();
			this.krumilurTopLeft.bringToTop();
			this.krumilurTopRight.bringToTop();
			this.krumilurBottomRight.bringToTop();
			this.krumilurBottomLeft.bringToTop();
		}, this);

		
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
		
		this.game.time.events.add(Phaser.Timer.SECOND * 2.1, function(){
			this.createArea();

	    }, this);
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
	
	initDrawSurface(){
		var drawSurface = Raphael.sketchpad("drawSurface", {
		    width: 1280,
		    height: 720,
	      	editing: true // default
	    });
		
		var pen = drawSurface.pen();
		pen.color("#ffffff");
		
		var drawing = "";
		
	    drawSurface.change(function() {
	    	drawing = drawSurface.json();
	    });
	    
	    var context = this;
	    
	    this.game.input.keyboard.onUpCallback = function (e) {
	        if(e.keyCode === Phaser.Keyboard.ENTER){
			    if(e.which == 13) {
			    	var castedSpell = context.spellManager.identify(drawing);
			    	
			    	drawSurface.clear();
	
			    	if(castedSpell !== null){
			    		castedSpell.showVisuals();
			    	}
			    }
	        }
	    }; 
	}
	
	setBackground(){
		if(this.tainted){
			this.background = this.game.add.tileSprite(0, 0, 1280, 720, this.darkBackground);
		}else{
			this.background = this.game.add.tileSprite(0, 0, 1280, 720, this.lightBackground);
		}

	}
	
	toggleInventory(){
		if(this.inventory.scale.isZero()){
			this.inventory.scale.set(1);
			this.game.world.bringToTop(this.inventory);
		}else{
			this.inventory.scale.set(0);
		}
	}
	
	toggleSpellbook(){
		if(this.spellbook.scale.isZero()){
			this.inventory.content.forEach(function(item){
				if(item.name === 'spellbook'){
					this.spellbook.scale.set(1);
					this.game.world.bringToTop(this.spellbook);
				}
			}, this);
		}else{
			this.spellbook.scale.set(0);
		}
	}
	
	togglePendulum(){
		if(this.pendulum.scale.isZero()){
			this.pendulum.bringToTop();
			this.pendulum.scale.set(0.5);
			this.pendulum.dingle();	
		}else{
			this.pendulum.scale.set(0);
			this.pendulum.animation.stop();
		}
	}
	
	toggleDraw(){
		if(this.drawMode){
			this.drawSurface = {};
			$("#drawSurface").children().remove();
			this.drawMode = false;
		}else{
			this.initDrawSurface();
			this.drawMode = true;
		}
	}
	
	initKeyBindings(keyManager){
		keyManager.initKeyBinding("inventory", Phaser.Keyboard.I, this.toggleInventory, this);
		keyManager.initKeyBinding("draw", Phaser.Keyboard.SPACEBAR, this.toggleDraw, this);
		keyManager.initKeyBinding("spellbook", Phaser.Keyboard.S, this.toggleSpellbook, this);
		keyManager.initKeyBinding("pendulum", Phaser.Keyboard.P, this.togglePendulum, this);
		
	}
}




