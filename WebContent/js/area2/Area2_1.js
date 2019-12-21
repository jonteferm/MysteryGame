/**
 * Level state.
 */
class Area2_1 extends World {
	constructor(){
		super();
		this.lightBackground = "area2_1";
		this.duskBackground = "area2_1_dusk";
		this.wickedDuskBackground = "area2_dusk_wicked";
	}

	createArea(){
		this.directionArrows.setBorderingAreas('area2_0', '', 'area3', '');
		
		if(this.tainted){
			this.directionArrows.setBorderingAreas('', '', '', '');
		}else{
			this.directionArrows.setBorderingAreas('', '', '', 'area2_0');
		}
		
		
		this.banishDarkPowers = new Happening(function(context){
			context.background.destroy();
			context.tainted = false;
			context.milestones["Area3 banished"].reached = true;
			context.directionArrows.setBorderingAreas('', 'area4_0', '', 'area2_1');
			context.backgroundManager.setBackground();
		});
		
		
		this.signals.banishing.add(function(){
			this.banishDarkPowers.happen(this);
		}, this);
	}

	
	updateArea(){
		//this.shakeCanvas();
	}
}




