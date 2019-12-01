class Area6_0 extends World {
	constructor(){
		super();
		this.darkBackground = "area6_0_wicked"
		this.lightBackground = "area6_0";
		this.tainted = true;
		this.activeLocationOfInterest = null;
		this.tweenss = [];
	}
	
	createArea(){
		this.directionArrows.setBorderingAreas('', '', '', 'area2_0');

		/*
		var emitter1 = this.game.add.emitter(this.game.world.centerX+100, 400, 10);
		emitter1.setSize(300, 100);
		
		emitter1.makeParticles('coronaAlfa');
		
	    emitter1.setRotation(0, 0);
	    emitter1.setAlpha(0.7, 0.7);
	    emitter1.setScale(1, 1);
	    emitter1.gravity = -50; 
	    
	    emitter1.start(false, 5000, 500);
	   */
		

		this.banishDarkPowers = new Happening(function(context){
			context.background.destroy();
			context.wickedness.destroy();
			context.tainted = false;
	
			context.backgroundManager.setBackground();
			context.initGodHeads();
		});
		
		this.signals.banishing.add(function(){
			this.banishDarkPowers.happen(this);
		}, this);
		
		
		if(this.tainted){
			this.wickednessFrames =  ["area6_0_wicked_twist_1", "area6_0_wicked_twist_2", "area6_0_wicked_twist_3", "area6_0_wicked_twist_2", "area6_0_wicked_twist_1", "area6_0_wicked"];
		    
			this.wickedness = new FrameSwitcher(this.game, this.wickednessFrames, this);
			this.wickedness.frameTime = 3;
			this.wickedness.easing = true;
			
		}else{
			this.initGodHeads();
		}

	}
	
	updateArea(){
		if(this.tainted && this.wickedness !== undefined && !this.wickedness.active){
			this.wickedness.start();
		}
		

		if(this.tainted){
			this.shakeCanvas();
		}
	}
	
	initGodHeads(){
		this.initGodHead(this.game.add.image(0,0,'gumma'), this.game.add.image(-15,-10,'gumma_shadow'), this.game.add.image(50,10,'gumma_shadow'));
		this.initGodHead(this.game.add.image(450,0,'gubbe'), this.game.add.image(435,-10,'gubbe_shadow'), this.game.add.image(500,10,'gubbe_shadow'));
		this.initGodHead(this.game.add.image(850,0,'karl'), this.game.add.image(835,-10,'karl_shadow'), this.game.add.image(900,10,'karl_shadow'));
	}
	
	
	initGodHead(godHead, godHeadShadow1, godHeadShadow2){
		godHead.alpha = 0.3;
		godHeadShadow1.alpha = 0;
		godHeadShadow2.alpha = 0;
		this.tweenss.push(this.game.add.tween(godHead).to({alpha: 1}, 4000, Phaser.Easing.Linear.InOut, true, 0, 5000, true));
		this.tweenss.push(this.game.add.tween(godHeadShadow1).to({alpha: 0.5}, 2000, Phaser.Easing.Linear.InOut, true, 0, 2000, true));
		this.tweenss.push(this.game.add.tween(godHeadShadow2).to({alpha: 0.5}, 3000, Phaser.Easing.Linear.InOut, true, 0, 3000, true));
	}
	
}