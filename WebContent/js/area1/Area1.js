class Area1 extends World {
	
	constructor(){
		super();
		this.lightBackground = "area1";	
	}
	
	createArea(){
		this.directionArrows.setBorderingAreas('', 'area2_0', '', '');
		
		this.placeItems();	
		
	}
	
	updateArea(){

	}

	placeItems(){
	    this.spellBook = new Book(this.game, 340, 540, 'spellbook');
	    this.game.add.existing(this.spellBook);
	    this.spellBook.scale.setTo(0.1,0.1);
	    this.spellBook.inputEnabled = true;
	    
	    this.spellBook.events.onInputDown.add(function(item){
	    	this.inventory.addItem(item);
	    	this.spellBook.destroy();
	    }, this);
	}

}

