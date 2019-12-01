class BackgroundManager {
	constructor(context){
		this.context = context;
		this.background = null;

	}
	
	transition(area, areaContext){		
		var transitionScreen = this.context.game.add.image(0,0, 'transition_screen');
		transitionScreen.alpha = 0;
		this.transitionTween = this.context.game.add.tween(transitionScreen).to({alpha: 1}, 1000, Phaser.Easing.Linear.None);
		this.transitionTween.start();
		
		this.transitionTween.onComplete.add(function(){
			this.game.state.start(area, false, false, areaContext);
		}, this.context);
	}
	

	setBackground(background){
		console.log(this.context);
		if(this.context.background){
			this.context.background.destroy();
		}
		
		if(background){
			this.context.background = this.context.game.add.tileSprite(0, 0, 1280, 720, background);
		}else{
			if(this.context.tainted){
				this.context.background = this.context.game.add.tileSprite(0, 0, 1280, 720, this.context.darkBackground);
			}else{
				this.context.background = this.context.game.add.tileSprite(0, 0, 1280, 720, this.context.lightBackground);
			}
		}
		
		this.context.krumilurTopLeft.bringToTop();
		this.context.krumilurTopRight.bringToTop();
		this.context.krumilurBottomRight.bringToTop();
		this.context.krumilurBottomLeft.bringToTop();
	}
}