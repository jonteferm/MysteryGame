class Area7_5 extends World {
	constructor(){
		super();
		this.wickedBackground = "area7_5_wicked"
		this.lightBackground = "area7_5";
		this.activeLocationOfInterest = null;
	}
	
	createArea(){
		this.tainted = true;
		
		if(this.tainted){
			this.backgroundManager.setBackground();	
		}
		
		this.directionArrows.setBorderingAreas('', '', 'area7_6', 'area7_4');

		this.wickedMirror = this.game.add.image(0, 0, 'area7_4_wicked_mirror');
		this.mirrorEase = this.game.add.tween(this.wickedMirror).to({alpha: 0}, 12000, Phaser.Easing.Linear.Out, true, 1000);
		this.mirrorEase.onComplete.add(function(){
			//this.directionArrows.setBorderingAreas('', '', 'area7_5', 'area7_3');
		}, this);

		
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