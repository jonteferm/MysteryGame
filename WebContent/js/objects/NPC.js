class NPC extends Phaser.Sprite {
	constructor(game, x, y, image){
		super(game, x, y, image);
		
		this.conversations = [{
			id: 1,
			ended: false,
			linesSpoken: 0,
			questId: 0,
			lines: [{
				spoken: false,
				line:  "Oh, hey you are finally awake!",
				isQuestion: true,
				isAccepted: false,
				isConfirmed: false,
				expression: 'kvinna_standard',
			},
			{
				spoken: false,
				line:  "I really enjoyed watching you sleep though...",
				isQuestion: false,
				isAccepted: false,
				isConfirmed: false,
				expression: 'kvinna_hehe'
			},
			{
				spoken: false,
				line:  "But it's really getting dark fast these days. You can't lie around here when the sun sets!",
				isQuestion: false,
				isAccepted: false,
				isConfirmed: false,
				expression: 'kvinna_omg'
			},
			{
				spoken: false,
				line:  "We need to find you a safe place.",
				isQuestion: false,
				isAccepted: false,
				isConfirmed: false,
				expression: 'kvinna_standard'
			}]
		}];
	}
	
	chat(){
		var question;
		for(var i = 0; i < this.conversations[0].lines.length; i++){
			if(!this.conversations[0].lines[i].spoken){
				if(question === undefined || question.isConfirmed){
					this.conversations[0].lines[i].spoken = true;
					this.conversations[0].linesSpoken++;
					if(this.conversations[0].linesSpoken === this.conversations[0].lines.length){
						this.conversations[0].ended = true;
					}
					
					if(this.conversations[0].lines[i].isQuestion){
						question = this.conversations[0].lines[i];
					}
					
					this.loadTexture(this.conversations[0].lines[i].expression)
					return this.conversations[0].lines[i].line;
				}

			}
			
			if(question !== undefined){
				question = undefined;
			}
		}
	}
}