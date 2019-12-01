class ControlPanel extends Phaser.Sprite{
	constructor(game, x, y){
		super(game, x, y, 'panel');
		this.game = game;

		this.gameLogTextHeight = 0;
		this.gameLog = [];
		this.gameLogHistory = [];

		const TIMEBAR_ROW_Y = 540;

	    this.game.add.existing(this);


		//this.addText("Welcome to the forest!");
		
		this.examinationButton = new Button(this.game, 1150, 20, 'examine_button');
		this.drowseButton = new Button(this.game, 1030, 20, 'drowse_button');
		this.spellcastButton = new Button(this.game, 1150, 80, 'spellcast_button');
		this.addChild(this.examinationButton);
		this.addChild(this.drowseButton);
		this.addChild(this.spellcastButton);

	}

	addText(text){
		var bitmapText = this.game.add.bitmapText(20, 740, 'font',text, 24);
		bitmapText.exists = false;
		bitmapText.smoothed = true;
		
		bitmapText.children.forEach(function(char){
			char.alpha = 0;
		}, this);
		
		bitmapText.exists = true;
		
		bitmapText.children.forEach(function(char){
			var bitmapTween = this.game.add.tween(char)
			.to({alpha: 1}, 1000, Phaser.Easing.Linear.None);
			
			bitmapTween.start();	
		}, this);

		this.gameLog.push(bitmapText);
		this.gameLog[this.gameLog.length-1].fixedToCamera = true;
		this.gameLogTextHeight += this.gameLog[this.gameLog.length-1].height;

		if(this.gameLogTextHeight >= 93){
			var firstItem = this.gameLog.shift();
			firstItem.visible = false;
			this.gameLogHistory.push(firstItem);
			this.gameLogTextHeight -= firstItem.height;
		}

		if(this.gameLog.length > 0){
			for(var i = this.gameLog.length-1; i > 0; i--){
				if(i > 0){
					var prevText = "";
					var height = 0;
					prevText = this.gameLog[i-1].text;
					height = this.gameLog[i].height;
					this.gameLog[i-1].destroy();
					this.gameLog[i-1] = this.game.add.bitmapText(20, (this.gameLog[i].y + (24*(height/15.5))), 'font', prevText, 16);
					
					this.gameLog[i-1].fixedToCamera = true;
				}
			}
		}
	}
}
