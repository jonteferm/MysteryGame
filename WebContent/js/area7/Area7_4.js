class Area7_4 extends World {
	constructor(){
		super();
		this.wickedBackground = "area7_4_wicked"
		this.lightBackground = "area7_4";
		this.activeLocationOfInterest = null;
	}
	
	createArea(){
		this.tainted = true;
		
		if(this.tainted){
			this.backgroundManager.setBackground();	
		}
		
		this.directionArrows.setBorderingAreas('', '', 'area7_5', 'area7_3');
		
		this.wickednessFrames =  ["area7_4_wicked_mirror", "area7_4_wicked"];
		this.wickedness = new FrameSwitcher(this.game, this.wickednessFrames, this);
		this.wickedness.frameTime = 1;
		this.wickedness.easing = true;
		this.wickedness.repeat = true;
		
		this.wickedness.onEachFrame = function(context){
			context.backgroundManager.setTop();
		}
		
		this.wickedness.start();
		
		this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
			this.ravenDiving = this.game.add.image(660, 0, 'korp_high_diving');
			this.ravenDiving.scale.setTo(0.5, 0.5);
			
			this.diveEase = this.game.add.tween(this.ravenDiving).to({alpha: 0}, 1500, Phaser.Easing.Linear.Out, true, 200);
			this.diveEase.onComplete.add(function(){
				this.ravenOpen = this.game.add.image(330, 0, 'korp_high_open_wings');
				this.ravenOpen.scale.setTo(0.5, 0.5);
				this.openEase = this.game.add.tween(this.ravenOpen).to({alpha: 0}, 1500, Phaser.Easing.Linear.Out, true, 0);
				
				this.openEase.onComplete.add(function(){
					this.ravenClosed = this.game.add.image(50, 0, 'korp_high_closed_wings');
					this.ravenClosed.scale.setTo(0.5, 0.5);
					this.game.add.tween(this.ravenClosed).to({alpha: 0}, 1500, Phaser.Easing.Linear.Out, true, 0);
				}, this);
			}, this);
		}, this);	
	}
	
	updateArea(){

	}
	
	
}