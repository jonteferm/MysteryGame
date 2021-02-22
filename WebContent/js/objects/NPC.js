class NPC extends Phaser.Sprite {
	constructor(game, x, y, image, conversation){
		super(game, x, y, image);
		this.conversations = conversation;
		this.awaitingAnswer = null;
		this.conversationEnded = false;
	}
	
	chat(){
		var question;
		for(var i = 0; i < this.conversations.lines.length; i++){
			if(!this.conversations.lines[i].spoken){
				if(this.awaitingAnswer == null || this.awaitingAnswer.isConfirmed){
					if(this.conversations.lines[i].isQuestion){
						this.awaitingAnswer = this.conversations.lines[i];
					}
					
					this.conversations.lines[i].spoken = true;
					this.conversations.linesSpoken++;
					
					if(this.conversations.linesSpoken === this.conversations.lines.length){
						this.conversations.ended = true;
					}
					
					if(this.conversations.lines[i].isQuestion){
						question = this.conversations.lines[i];
					}
					
					this.loadTexture(this.conversations.lines[i].expression)
					
					if(i == this.conversations.lines.length-1){
						this.conversationEnded = true;
					}
					
					return this.conversations.lines[i].line;
				}

			}
			
			if(question !== undefined){
				question = undefined;
			}
		}
	}

}

