class Area5_0 extends World {
	constructor(){
		super();
		this.lightBackground = "area5_0";
		this.tainted = false;
		this.activeLocationOfInterest = null;
	}
	
	createArea(){
		this.directionArrows.setBorderingAreas('', '', '', 'area4_1');
		
		this.drowsingArea = new DrowsingArea(this.game, 500, 400, 100, 100, areaTypes.CRYSTAL_ENERGY);
		this.game.physics.enable(this.drowsingArea, Phaser.Physics.ARCADE);
		
		
		this.findAntTrail = new Happening(function(context){
			context.milestones["Found ant-trail"].reached = true;
			console.log(context.milestones);
		});
		

		this.hiddenAntTrailLocation = new LocationOfInterest(this.game, 500, 400, 0, 0, null);
		
		this.controlPanel.examinationButton.context = this;
		
		this.controlPanel.examinationButton.onClick = function(context){
			if(context.activeLocationOfInterest !== null && context.activeLocationOfInterest.examinationObject === null){
				var antTrail = new ExaminationObject(this.game, 500, 100, 'examinationObject', function(context){
					for(var i = 0; i < 17; i++){
						var min = Math.ceil(-10);
						var max = Math.floor(10);
						var ant = new CrystalAnt(context.game, 300+(Math.random()*(max-min))+min, (i*30)+10);
						ant.id = i;
						ant.scale.setTo(0.3, 0.3);
						context.addChild(ant);
					}
				});
				
				context.game.add.existing(antTrail);
				context.activeLocationOfInterest.examinationObject = antTrail;
				context.activeLocationOfInterest.examine();
			}else{
				context.activeLocationOfInterest.exit();
				
				if(!context.milestones["Found ant-trail"].reached === true){
					context.findAntTrail.happen(context);
					context.controlPanel.addText("I wonder if these ants will lead me somewhere...");
				}
			}
		}
	}
	
	
	updateArea(){

		if(this.milestones["Found ant-trail"].reached === true && this.directionArrows.borderingAreas.forward === ''){
			this.directionArrows.setBorderingAreas('', '', 'area5_1', 'area4p');

		}
		
		if(this.activeLocationOfInterest !== null){
			var antTrail = this.activeLocationOfInterest.examinationObject;


			if(antTrail !== null && antTrail.visible){
				for(var i = 0; i < antTrail.children.length; i++){
					var ant = antTrail.children[i];
					ant.update();
					if(ant.position.y <= 10){
						if(ant.tween === null){
							ant.tween = this.game.add.tween(ant)
							.to({alpha: 0}, 1000, Phaser.Easing.Linear.None);
							
							ant.tween.onComplete.add(function(){
								this.tween = this.game.add.tween(this)
								.to({alpha: 1}, 1000, Phaser.Easing.Linear.None);
								this.tween.onComplete.add(function(){
									this.tween = null;
								},this);
								this.tween.start();
								this.position.y = 525-(this.height);
							}, ant);
							
							ant.tween.start();
						}
					}
				}
			}
		}

		
		if(this.game.physics.arcade.overlap(this.pendulum, this.drowsingArea)){
			this.pendulum.overlappingArea = this.drowsingArea;
			this.activeLocationOfInterest = this.hiddenAntTrailLocation;
		}else{
			this.pendulum.reset();
		}
	}
	
}