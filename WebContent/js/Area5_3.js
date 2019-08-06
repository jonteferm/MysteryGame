class Area5_3 extends World {
	constructor(){
		super();
		this.lightBackground = "area5_3";
		this.tainted = false;
	}
	
	createArea(){
		this.woman = new NPC(this.game, 0, 380, 'kvinna_standard');
		this.game.add.existing(this.woman);
		
		this.controlPanel.addText(this.woman.chat());

	}
	
	
	update(){
		
	}
	
	
}