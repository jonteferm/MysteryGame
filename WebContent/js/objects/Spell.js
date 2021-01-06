class Spell {
	constructor(game, name, formula, signal){
		this.game = game;
		this.name = name;
		this.formula = formula;
		this.signal = signal;
		
		this.initVisuals();
	}
	
	initVisuals(){
		this.visual = new Visual(this.game, this.game.world.centerX, this.game.world.centerY, 'pentagram');
		this.visual.anchor.setTo(0.5, 0.5);
		this.visual.alpha = 0;
	}
	
	showVisuals(){
		this.game.add.existing(this.visual);
	    var pentagramTween = this.game.add.tween(this.visual).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
	    
	    var self = this;
	    pentagramTween.onComplete.add(function(){
	    	self.signal.dispatch();
	    	self.visual.destroy();
	    });
	}
}

