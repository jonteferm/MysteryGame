class Inventory extends Phaser.Sprite{
	constructor(game, x, y){
		super(game, x, y, 'inventory');
		
		this.content = [];
	}
	
	loadItemsFromFile(){
		
	}
	
	addItem(item){
		this.content.push(item);
		
		var child = this.game.make.sprite(0+(48*(this.content.length-1)), 0, item.key);
		child.scale.setTo(0.04, 0.04);

		var inventorySpace = this.addChild(child);
		
		inventorySpace.inputEnabled = true;
		
		inventorySpace.events.onInputDown.add(function(){
			inventorySpace.destroy();
			statsText.destroy();
			
			
			var newContent = [];
			
			for(var i = 0; i < this.content.length; i++){
				if(this.content[i] !== item){

					newContent.push(this.content[i]);
				}
			}
			
			this.content = newContent;
			
			console.log(this.content);
		}, this);	
	}
}