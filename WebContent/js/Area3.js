/**
 * Level state.
 */
class Area3 extends World {
	
	constructor(){
		super();
		this.lightBackground = "area3";
		this.darkBackground = "area3_wicked";
		this.tainted = true;
	}
	
	createArea(){

		if(this.tainted){
			this.directionArrows.setBorderingAreas('', '', '', 'area2p');
		}else{
			this.directionArrows.setBorderingAreas('', 'area4', '', 'area2p');
		}
		
		this.directionArrows.setBorderingAreas('', 'area4', '', 'area2p');
		

		this.mist1 = new Mist(this.game, -200, 400, {x: 3, y: 1}, 0.3, null);
		this.mist2 = new Mist(this.game, 400, 380,{x: 3, y: 1}, 0.3, null);
		
		
		this.banishDarkPowers = new Happening(function(context){
			context.background.tint = 0xffffff;
			context.mist1.destroy();
			context.mist2.destroy();
			context.background.destroy();
			context.tainted = false;
		
			context.setBackground();
		});
		
		
		this.signals.banishing.add(function(){
			this.banishDarkPowers.happen(this);
		}, this);

	}
	
	update(){
		if(this.tainted){
			this.shakeCanvas();
		}
	}
	

}




