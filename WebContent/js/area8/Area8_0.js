class Area8_0 extends World {
	constructor(){
		super();
		this.lightBackground = "area8_0";
		this.activeLocationOfInterest = null;
	}
	
	createArea(){
		this.directionArrows.setBorderingAreas('', '', 'area8_1', 'area7_5');
					
		this.cache.getJSON("conversations_ragna").forEach(function(conversation){
			if(conversation.id === "ragna_area8_0"){
				this.woman = new NPC(this.game, 0, 375, 'kvinna_standard', conversation);
			}
		}, this);	

		this.woman.alpha = 0;
		this.game.add.existing(this.woman);
		
		var womanFading = this.game.add.tween(this.woman).to({alpha: 1}, 2000, Phaser.Easing.Linear.None);
		womanFading.start();
		
		this.controlPanel.addText(this.woman.chat());
		
		this.signals.proceed.add(function(){
			this.controlPanel.addText(this.woman.chat());
		}, this);
		

	}
	
	updateArea(){

	}
	
	
}