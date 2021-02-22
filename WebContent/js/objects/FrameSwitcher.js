class FrameSwitcher{
	constructor(game, frames, context){
		this.game = game;
		this.frames = frames;
		this.context = context;
		
		this.active = false;
	
		this.onEachFrame = null;
		this.onFinished = null;
		this.easing = false;
		
		this.frameTime = 1;
		
		this.prevFrame = null;
	}
	
	start(currentFrameNum){
		var increase = currentFrameNum || 0;
		this.backgroundId = this.frames[increase];
    	this.active = true;

    	this.game.time.events.add(Phaser.Timer.SECOND * this.frameTime, function(){
			if(this.activeFrame !== undefined){
				this.prevFrame = this.activeFrame;
			}
	    	
			this.activeFrame = this.game.add.image(0, 0, this.backgroundId);

			if(this.easing){
	    		this.activeFrame.alpha = 0;
	    		
	    		this.tween = this.game.add.tween(this.activeFrame)
				.to({alpha: 1}, (this.frameTime*1000)/2, Phaser.Easing.Linear.None);
	    		this.tween.start();
	    		
	    		this.tween.onComplete.add(function(){
	    	 		if(this.prevFrame !== null){
	    	 			if(increase === this.frames.length-1){
	            			this.prevFrame.destroy();
	    	 			}
	        		}
	
	    		}, this);
			}else{
				if(increase < this.frames.length){
					this.prevFrame && this.prevFrame.destroy();
				}
			}
	
    		if(increase <= this.frames.length){
    			this.start(increase + 1);	
    		}else{	
    			this.destroy();
    			if(this.onFinished !== null){
        			this.onFinished(this.context);
    			}
    		}
    		

    		if(this.onEachFrame !== null){
        		this.onEachFrame(this.context);
    		}
    	}, this);
    	
		// TODO: Examine!
		this.game.time.events.start();
	}
	
	
	destroy(){
		this.active = false;
		this.activeFrame.destroy();
		this.game.time.events.stop();
	}
}