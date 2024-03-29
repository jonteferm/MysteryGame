class Inventory extends Phaser.Sprite{
	constructor(game, x, y){
		super(game, x, y, 'inventory');
		this.game = game;
		this.content = [];
	}
	
	load(){
		if(this.content.length > 0){
			this.content.forEach(function(item){
				var child = this.game.make.sprite(0+(48*(this.content.length-1)), 0, item.key);
				child.scale.setTo(0.04, 0.04);
				this.addChild(child);
			}, this);
		}
	}
	
	loadItemsFromFile(){
		
	}
	
	addItem(item){
		this.content.push(item);
		this.load();
	}
	
	containsItem(itemName){
		for(var i = 0; i < this.content.length; i++){
			if(this.content[i].name === itemName){
				return true;
	
			}
		}
	
		return false;
	}
}