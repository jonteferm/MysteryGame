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
		
		this.images = [];
		this.destroying = false;
	}
	
	start(currentFrameNum){
		//console.log(this.frames);
		var increase = currentFrameNum || 0;
		this.backgroundId = this.frames[increase];
    	this.active = true;
    	
    	this.game.time.events.add(Phaser.Timer.SECOND * this.frameTime, function(){
    		if(!this.destroying){
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
	    			if(this.onFinished !== null){
	        			this.onFinished(this.context);
	    			}
	    			
	    			this.active = false;
	    		}
	    		
				this.context.krumilurTopLeft.bringToTop();
				this.context.krumilurTopRight.bringToTop();
				this.context.krumilurBottomRight.bringToTop();
				this.context.krumilurBottomLeft.bringToTop();
				this.context.directionArrows.bringToTop();
				this.context.pendulum.bringToTop();
	
	    		if(this.onEachFrame !== null){
	        		this.onEachFrame(this.context);
	    		}
      
    		}

    	}, this);
    	

	}
	
	
	destroy(){
		this.destroying = true;
		this.frames = [];
		this.activeFrame.destroy();
	}
}