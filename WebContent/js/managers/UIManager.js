class UIManager {
	constructor(game, context){
		this.game = game;
		this.context = context;
	}
	
	initUIComponents(prevStateParams){

		this.context.inventory = new Inventory(this.game, 0, (48*4));
		this.context.spellbook = new Spellbook(this.game, 100, 100);		
		this.context.pendulum = new Pendulum(this.game, 750, 20);
		
		this.context.krumilurTopLeft = new Phaser.Image(this.game, 0, 0, 'krumilur_top_left');
		this.context.krumilurTopRight = new Phaser.Image(this.game, 1150, 0, 'krumilur_top_right');
		this.context.krumilurBottomRight = new Phaser.Image(this.game, 1150, 590, 'krumilur_bottom_right');
		this.context.krumilurBottomLeft = new Phaser.Image(this.game, 0, 590, 'krumilur_bottom_left');
		
		this.game.add.existing(this.context.krumilurTopLeft);
		this.game.add.existing(this.context.krumilurTopRight);
		this.game.add.existing(this.context.krumilurBottomRight);
		this.game.add.existing(this.context.krumilurBottomLeft);
		
		this.context.controlPanel = new ControlPanel(this.game, this.game.camera.x, this.game.camera.y+(880-160));
		this.context.controlPanel.fixedToCamera = true;
		this.context.keyManager = new KeyManager(this.game);
		
		
		this.initKeyBindings(this.context.keyManager);
		
		this.context.spellbook.inputEnabled = true;
		this.context.spellbook.input.enableDrag();
		this.context.spellbook.scale.set(0);
		this.game.add.existing(this.context.spellbook);
		this.context.spellbook.fixedToCamera = true;
	
		this.context.inventory.inputEnabled = true;
		this.context.inventory.input.enableDrag();
		this.context.inventory.scale.set(0);
		this.game.add.existing(this.context.inventory);
		this.context.inventory.fixedToCamera = true;
		
		this.game.add.existing(this.context.pendulum);
		this.context.pendulum.inputEnabled = true;
		this.context.pendulum.input.enableDrag();
		this.context.pendulum.fixedToCamera = true;
		this.context.pendulum.scale.set(0);
	}
	
	reassignOldComponents(params){

		this.context.inventory = params.inventory;
		this.context.spellbook = params.spellbook;		
		this.context.pendulum = params.pendulum;
		this.context.controlPanel = params.controlPanel;
		this.context.keyManager = params.keyManager;
		this.context.krumilurTopLeft = params.krumilurTopLeft;
		this.context.krumilurTopRight = params.krumilurTopRight;
		this.context.krumilurBottomRight = params.krumilurBottomRight;
		this.context.krumilurBottomLeft = params.krumilurBottomLeft;
	}
	
	initKeyBindings(keyManager){
		keyManager.initKeyBinding("inventory", Phaser.Keyboard.I, this.onToggleInventory, this);
		keyManager.initKeyBinding("draw", Phaser.Keyboard.SPACEBAR, this.onToggleDraw, this);
		keyManager.initKeyBinding("spellbook", Phaser.Keyboard.S, this.onToggleSpellbook, this);
		keyManager.initKeyBinding("pendulum", Phaser.Keyboard.P, this.onTogglePendulum, this);
		keyManager.initKeyBinding("proceed", Phaser.Keyboard.ENTER, this.doProceed, this);
	}
	
	onToggleInventory(){
		if(this.context.inventory.scale.isZero()){
			this.context.inventory.scale.set(1);
			this.game.world.bringToTop(this.context.inventory);
		}else{
			this.context.inventory.scale.set(0);
		}
	}
	
	onToggleSpellbook(){
		if(this.context.spellbook.scale.isZero()){
			this.context.inventory.content.forEach(function(item){
				if(item.name === 'spellbook'){
					this.spellbook.scale.set(1);
					this.game.world.bringToTop(this.spellbook);
				}
			}, this.context);
		}else{
			this.context.spellbook.scale.set(0);
		}
	}
	
	onTogglePendulum(){
		if(this.context.pendulum.scale.isZero()){
			this.context.pendulum.bringToTop();
			this.context.pendulum.scale.set(0.5);
			this.context.pendulum.dingle();	
		}else{
			this.context.pendulum.scale.set(0);
			this.context.pendulum.animation.stop();
		}
	}
	
	onToggleDraw(){
		if(this.drawMode){
			this.drawSurface = {};
			$("#drawSurface").children().remove();
			this.drawMode = false;
		}else{
			this.initDrawSurface();
			this.drawMode = true;
		}
	}
	
	doProceed(){
		this.context.signals.proceed.dispatch();
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
	    
	    var context = this.context;
	    
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
}