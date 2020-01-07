class Area5_1 extends World {
	constructor(){
		super();

		this.lightBackground = "area5_1";
		this.tainted = false;
		this.antSpawner = null;
	}
	
	createArea(){
		this.directionArrows.setBorderingAreas('', '', '', 'area5_0');
		this.milestoneManager.setAreasCleared(['5_1','5_2','5_3', '3_0']);

		if(!this.milestoneManager.getAreasCleared(["5_2"])){
			this.drowsingArea = new DrowsingArea(this.game, 400, 280, 500, 350, areaTypes.CRYSTAL_ENERGY);
			
			this.antStack = new LocationOfInterest(this.game, 500, 400, 0, 0, null);
			
			this.controlPanel.examinationButton.context = this;
			
			this.controlPanel.examinationButton.onClick = function(context){
				context.controlPanel.addText("An unusual glow sorrounds the ant-hill, just like the ants entering it.");
				context.milestoneManager.setMilestoneReached("Examined ant-hill");
			}
			
			var antHillGlow = this.game.add.image(0,0, 'area5_1_glow');

			var tween = this.game.add.tween(antHillGlow).to({alpha: 0}, 1500, Phaser.Easing.Linear.InOut, true, 0, 1500, true);

			var antSpawnPoints = [];	
			antSpawnPoints.push(new SpawnPoint(100, 200, 700, 100, 0));
			antSpawnPoints.push(new SpawnPoint(100, 400, 700, 100, -100));
			antSpawnPoints.push(new SpawnPoint(100, 700, 700, 100, -100));
			antSpawnPoints.push(new SpawnPoint(100, 1000, 700, 100, -200));
			
			var setAngle = function(){
				if(this.angle < 0){
					this.angle = this.angle+0.1;
				}else if(this.angle > 0){
					this.angle = this.angle-0.1;
				}
				
				if(this.position.x > 800 && this.position.x < 1280){
					this.angle = -60;
				}else if(this.position.x > 750 && this.position.x <= 800){
					this.angle = -30;
				}else if(this.position.x < 500 && this.position.x >= 450){
					this.angle = 30;
				}else if(this.position.x < 450){
					this.angle = 60;
				}
				
				if(this.body.velocity.y > 0){
					this.angle = 180;
				}
			};
			
			this.ants = this.game.add.group();
			this.antSpawner = new Spawner(this.game, antSpawnPoints, 'CrystalAnt', 0.12, this.ants, setAngle);
			this.antSpawner.spawnObjects();
		    this.game.time.events.loop(Phaser.Timer.SECOND * 7, function(){this.antSpawner.spawnObjects();}, this);
		}
	}
	
	updateArea(){
		if(this.milestoneManager.getMilestoneReached("Examined ant-hill")){
			this.directionArrows.setBorderingAreas('', '', 'area5_2', 'area5_0');
		}
		
		this.moveAnts();

		if(this.game.physics.arcade.overlap(this.pendulum, this.drowsingArea)){
			this.pendulum.overlappingArea = this.drowsingArea;
			
		}else{
			this.pendulum.reset();
			this.activeLocationOfInterest = null;
		}
	}

	moveAnts(){
		this.antSpawner && this.ants.forEach(function(ant){
			if(ant.position.y > 700){
				ant.visible = false;
			}else{
				ant.visible = true;
			}
			
			if(ant.position.y <= 330){
				if(ant.tween === null){
					ant.tween = this.game.add.tween(ant)
					.to({alpha: 0}, 2000, Phaser.Easing.Linear.None);
					
					ant.tween.onComplete.add(function(){
						this.destroy();
					}, ant);
					
					ant.tween.start();
				}
			}
			
			if(ant.body !== null){
				if(ant.position.x > 880 && ant.position.x < 1280){
					ant.body.velocity.x = -17;
					ant.angle = -60;
				}else if(ant.position.x > 780 && ant.position.x <= 880){
					ant.body.velocity.x = -12;
					ant.angle = -30;
				}else if(ant.position.x < 650 && ant.position.x >= 780){
					ant.body.velocity.x = 5;
					ant.angle = 0;
				}else if(ant.position.x < 600 && ant.position.x >= 550){
					ant.body.velocity.x = 12;
					ant.angle = 30;
				}else if(ant.position.x < 550){
					ant.body.velocity.x = 20;
					ant.angle = 60;
				}
			}

		}, this);
	}
}