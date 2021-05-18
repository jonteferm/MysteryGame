class Area7_8 extends World {
	constructor(){
		super();
		this.lightBackground = "area7_8";
		this.activeLocationOfInterest = null;
	}
	
	createArea(){
		this.directionArrows.setBorderingAreas('', '', 'area7_9', 'area7_7');
		
		if(!this.milestoneManager.getMilestoneReached("Talked with Ragna 7_8")){
			this.cache.getJSON("conversations_ragna").forEach(function(conversation){
				if(conversation.id === "ragna_area7_8"){
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
				
				if(this.woman.conversationEnded){
					this.milestoneManager.setMilestoneReached("Talked with Ragna 7_8");
				}
			}, this);
		}
	}
	
	updateArea(){

	}
	
	
}