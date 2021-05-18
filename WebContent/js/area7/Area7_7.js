class Area7_7 extends World {
	constructor(){
		super();
		this.lightBackground = "area7_7";
		this.activeLocationOfInterest = null;
	}
	
	createArea(){
		if(this.milestoneManager.getMilestoneReached("Talked with Ragna 7_7")){
			this.setUpdatedBorderingAreas();
		}else{
			this.directionArrows.setBorderingAreas('', '', '', 'area7_6');
			
			this.cache.getJSON("conversations_ragna").forEach(function(conversation){
				if(conversation.id === "ragna_area7_7"){
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
					this.milestoneManager.setMilestoneReached("Talked with Ragna 7_7");
					this.setUpdatedBorderingAreas();
				}
			}, this);
		}
	}
	
	updateArea(){

	}
	
	setUpdatedBorderingAreas(){
		this.directionArrows.setBorderingAreas('', '', 'area7_8', 'area7_6');
	}
	
}