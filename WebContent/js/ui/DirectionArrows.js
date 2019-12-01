class DirectionArrows{
	constructor(game, x, y, signals){
		this.game = game;
		this.signals = signals;
		
		this.borderingAreas = {
				left: '',
				right: '',
				forward: '',
				back: ''
		};
		

		this.leftArrow = game.add.sprite(530, 600, "arrow_left");

		this.leftArrow.scale.setTo(0.13, 0.13);
		this.leftArrow.visible = false;
		this.leftArrow.inputEnabled = true;
		
		this.rightArrow = game.add.sprite(670, 600, "arrow_right");
		this.rightArrow.scale.setTo(0.13, 0.13);
		this.rightArrow.visible = false;
		this.rightArrow.inputEnabled = true;

		this.forwardArrow = game.add.sprite(600, 550, "arrow_forward");
		this.forwardArrow.scale.setTo(0.13, 0.13);
		this.forwardArrow.visible = false;
		this.forwardArrow.inputEnabled = true;
		
		this.backArrow = game.add.sprite(600, 650, "arrow_back");
		this.backArrow.scale.setTo(0.13, 0.13);
		this.backArrow.visible = false;
		this.backArrow.inputEnabled = true;
		
		this.leftArrow.events.onInputDown.add(function(){
			if(this.borderingAreas.left !== ''){
				this.signals.newArea.dispatch(this.borderingAreas.left);
			}
		}, this);
		
		this.rightArrow.events.onInputDown.add(function(){
			if(this.borderingAreas.right !== ''){
				this.signals.newArea.dispatch(this.borderingAreas.right);
			}
		}, this);
		
		this.forwardArrow.events.onInputDown.add(function(){
			if(this.borderingAreas.forward !== ''){
				this.signals.newArea.dispatch(this.borderingAreas.forward);
			}

		}, this);
		
		this.backArrow.events.onInputDown.add(function(){
			if(this.borderingAreas.back !== ''){
				this.signals.newArea.dispatch(this.borderingAreas.back);
			}
		}, this);
		
	}

	
	setBorderingAreas(left, right, forward, back){
		this.borderingAreas.left = left;
		this.leftArrow.visible = left.length > 0;
		
		this.borderingAreas.right = right;
		this.rightArrow.visible = right.length > 0;
		
		this.borderingAreas.forward = forward;
		this.forwardArrow.visible = forward.length > 0;
		
		this.borderingAreas.back = back;
		this.backArrow.visible = back.length > 0;
	}
	
	destroy(){
		this.leftArrow.destroy();
		this.rightArrow.destroy();
		this.backArrow.destroy();
		this.forwardArrow.destroy();
	}
	
	bringToTop(){
		this.leftArrow.bringToTop();
		this.rightArrow.bringToTop();
		this.backArrow.bringToTop();
		this.forwardArrow.bringToTop();
	}
}