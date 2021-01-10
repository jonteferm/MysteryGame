class NPC extends Phaser.Sprite {
	constructor(game, x, y, image, conversation){
		super(game, x, y, image);
		this.conversations = conversation;
	}
	
	chat(){
		var question;
		for(var i = 0; i < this.conversations.lines.length; i++){
			if(!this.conversations.lines[i].spoken){
				if(question === undefined || question.isConfirmed){
					this.conversations.lines[i].spoken = true;
					this.conversations.linesSpoken++;
					if(this.conversations.linesSpoken === this.conversations.lines.length){
						this.conversations.ended = true;
					}
					
					if(this.conversations.lines[i].isQuestion){
						question = this.conversations.lines[i];
					}
					
					this.loadTexture(this.conversations.lines[i].expression)
					return this.conversations.lines[i].line;
				}

			}
			
			if(question !== undefined){
				question = undefined;
			}
		}
	}
}