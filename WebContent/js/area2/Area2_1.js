class Area2_1 extends World {
	constructor(){
		super();
		this.lightBackground = "area2_1";
		this.duskBackground = "area2_1_dusk";
		this.wickedDuskBackground = "area2_1_dusk_wicked";
	}

	createArea(){
		this.tainted = this.milestoneManager.getAreasCleared(['5_2', '5_3']) && !this.milestoneManager.getAreasCleared(['2_1']);;

		if(this.tainted){
			this.directionArrows.setBorderingAreas('', '', '', '');
			this.backgroundManager.setBackground();
			
			this.wickednessFrames =  ["area2_1_dusk_wicked_effect", "area2_1_dusk_wicked"];
			this.wickedness = new FrameSwitcher(this.game, this.wickednessFrames, this);
			this.wickedness.easing = true;
			this.wickedness.repeat = true;
			
			this.wickedness.onEachFrame = function(context){
				context.backgroundManager.setTop();
			};
		}else{
			this.directionArrows.setBorderingAreas('area2_0', '', 'area3_0', '');
		}
		
		this.banishDarkPowers = new Happening(function(context){
			context.background.destroy();
			context.wickedness.repeat = false;
			context.wickedness.destroy();
			context.tainted = false;
			context.directionArrows.setBorderingAreas('area2_0', '', 'area3_0', '');
			context.backgroundManager.setBackground();
			context.milestoneManager.setMilestoneReached("Area2_1 banished");
		});
		
		
		this.signals.banishing.add(function(){
			this.banishDarkPowers.happen(this);
		}, this);
	}

	
	updateArea(){
		if(this.tainted && this.wickedness !== undefined && !this.wickedness.active){
			this.wickedness.start();
		}
		
		if(this.tainted){
			this.shakeCanvas();
		}
	}
}




