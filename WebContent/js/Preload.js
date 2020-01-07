/**
 * Preloader state.
 */
class Preload extends Phaser.State {
	constructor(){
		super();
	}
	
	preload(){
		// Load the assets of the game, including the scripts.
		this.load.pack("area1", "assets/pack.json");
		this.load.pack("area2", "assets/pack.json");
		this.load.pack("area3", "assets/pack.json");
		this.load.pack("area4", "assets/pack.json");
		this.load.pack("area5", "assets/pack.json");
		this.load.pack("area6", "assets/pack.json");
		this.load.pack("ui", "assets/pack.json");
		this.load.pack("resources", "assets/pack.json");
	}
	
	create(){
		// Add the next states of the game
		//this.game.state.add("menu", Menu);

		this.game.state.add("area6_0", Area6_0);
		
		//this.game.state.start("menu");
		this.game.state.start("area6_0");
	}
}