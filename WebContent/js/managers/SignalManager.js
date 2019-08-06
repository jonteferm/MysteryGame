class SignalManager {
	constructor(game, context){
		this.game = game;
		this.context = context;
		this.signals = {};
		
		this.signals.banishing = new Phaser.Signal();
		this.signals.newArea = new Phaser.Signal();
		

		this.signals.newArea.add(function(area){
			this.game.state.add(area, this.context.areas[area]);

			this.game.state.onStateChange.add(function(newState, oldState){
				console.log(this.game.state.states[oldState]);
			}, this);


			this.game.state.start(area, false, false, this.context);

		}, this);
		

	}
	
}