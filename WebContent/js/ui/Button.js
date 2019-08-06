class Button extends Phaser.Sprite{
	constructor(game, x, y, type, onClick, context){
		super(game, x, y, type);
		
		this.onClick = onClick;
		this.context = context;
		this.inputEnabled = true;
		
		this.events.onInputDown.add(function(){this.onClick(this.context)}, this);
	}
	
	
}