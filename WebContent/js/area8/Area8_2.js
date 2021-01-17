class Area8_2 extends World {
	constructor(){
		super();
		this.lightBackground = "area8_2";
		this.activeLocationOfInterest = null;
	}
	
	createArea(){
		this.directionArrows.setBorderingAreas('', '', '', 'area8_1');
		
		this.cache.getJSON("conversations_ragna").forEach(function(conversation){
			if(conversation.id === "ragna_area8_2"){
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
		
		this.vaettirLairClickArea = this.game.add.existing(new LocationOfInterest(this.game, 480, 250, 200, 300, null));
		this.game.input.onDown.add(function(){
			if(Phaser.Rectangle.contains(this.vaettirLairClickArea.body, this.game.input.activePointer.x, this.game.input.activePointer.y)){
				//Play language-like sound
				this.woman.awaitingAnswer.isConfirmed = true;
				this.controlPanel.addText(this.woman.chat());
			}
		}, this);
		

	}
	
	updateArea(){

	}
	
}