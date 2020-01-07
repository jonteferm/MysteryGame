class Area3_0 extends World {
	constructor(){
		super();
		this.lightBackground = "area3";
		this.wickedBackground = "area3_wicked";
		this.duskBackground = "area3_dusk";
	}
	
	createArea(){
		this.tainted = !this.milestoneManager.getMilestoneReached("Area3 banished");
		
		if(this.tainted){
			this.backgroundManager.setBackground();
			this.directionArrows.setBorderingAreas('', '', '', 'area2_1');
			
			this.mist1 = new Mist(this.game, -200, 400, {x: 3, y: 1}, 0.3, null);
			this.mist2 = new Mist(this.game, 400, 380,{x: 3, y: 1}, 0.3, null);

		}else{
			this.directionArrows.setBorderingAreas('', 'area4_0', '', 'area2_1');
		}
		

		this.banishDarkPowers = new Happening(function(context){
			context.background.tint = 0xffffff;
			context.mist1.destroy();
			context.mist2.destroy();
			context.background.destroy();
			context.tainted = false;
			context.milestoneManager.setMilestoneReached("Area3 banished");
			context.directionArrows.setBorderingAreas('', 'area4_0', '', 'area2_1');
			context.backgroundManager.setBackground();
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




