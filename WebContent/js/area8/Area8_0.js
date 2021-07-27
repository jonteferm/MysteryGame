class Area8_0 extends World {
	constructor(){
		super();
		this.lightBackground = "area8_0";
		this.wickedBackground = "area8_0_dark_normal";
		this.duskBackground = "area8_0_dark_normal";
		this.activeLocationOfInterest = null;
	}
	
	createArea(){
		this.tainted = true;
		
		if(this.tainted){
			this.darkness = this.game.add.image(0, 0, 'area8_0_dark_normal');
			this.darkness.alpha = 0;
			this.darknessEase = this.game.add.tween(this.darkness).to({alpha: 1}, 5000, Phaser.Easing.Linear.Out, true, 1000);
			
			this.darknessEase.onComplete.add(function() {
		    	var vertigoFrames = ["area8_0_dark_blood_1", "area8_0_dark_blood_2", "area8_0_dark_blood_3", "area8_0_dark_blood_4", "area8_0_dark_blood_5"];
		    	this.vertigo = new FrameSwitcher(this.game, vertigoFrames, this);
				this.vertigo.frameTime = 1;
				this.vertigo.easing = true;
		    	this.vertigo.start();
		    	this.vertigo.onFinished =  function(context) {
		    		context.directionArrows.setBorderingAreas('', 'area8_1', '', 'area7_3');
		    	};
			}, this);
		}
	}
	
	
	
	updateArea(){

	}
	
	
}