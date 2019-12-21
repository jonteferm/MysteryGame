class Area5_3 extends World {
	constructor(){
		super();
		this.lightBackground = "area5_3";
		this.tainted = false;
	}
	
	createArea(){
	
		this.directionArrows.setBorderingAreas('', '', '', 'area5_2');
		
		this.woman = new NPC(this.game, 0, 375, 'kvinna_standard');
		this.woman.alpha = 0;
		this.game.add.existing(this.woman);
		
		var womanFading = this.game.add.tween(this.woman).to({alpha: 1}, 2000, Phaser.Easing.Linear.None);
		womanFading.start();
		
		this.controlPanel.addText("Ragna Lindenstjerna: " + this.woman.chat());
		
		this.signals.proceed.add(function(){
			this.controlPanel.addText("Ragna Lindenstjerna: " + this.woman.chat());
		}, this);
		
		this.milestoneManager.setMilestoneReached("Talked with Ragna");
	}
	
	
	updateArea(){

	}
	
	
	
	
}