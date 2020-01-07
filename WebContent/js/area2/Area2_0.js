class Area2_0 extends World {
	constructor(){
		super();
		this.lightBackground = "area2_0";
		this.duskBackground = "area2_0_dusk";
		this.wickedDuskBackground ="area2_0_dusk_wicked";
	}

	createArea(){
		this.tainted = this.milestoneManager.getAreasCleared(['5_2', '5_3']) && !this.milestoneManager.getAreasCleared(['2_0']);
		
		if(this.tainted){
			this.directionArrows.setBorderingAreas('', '', '', '');
			this.backgroundManager.setBackground();
		}else{
			this.directionArrows.setBorderingAreas('area1', 'area2_1', 'area6_0', '');
		}
			
		this.banishDarkPowers = new Happening(function(context){
			context.background.destroy();
			context.tainted = false;
			context.directionArrows.setBorderingAreas('area1', '', '', '');
			context.backgroundManager.setBackground();
			context.milestoneManager.setMilestoneReached("Area2_0 banished");
		});
		
		this.signals.banishing.add(function(){
			this.banishDarkPowers.happen(this);
		}, this);
	}

	updateArea(){
		if(this.tainted){
			this.shakeCanvas();
		}
	}
}




