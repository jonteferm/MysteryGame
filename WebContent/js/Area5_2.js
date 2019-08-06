class Area5_2 extends World {
	constructor(){
		super();
		this.lightBackground = "area5_2";
		this.tainted = false;

		
		this.antsAttacking = false;
		this.antSpawner = null;
	}
	
	createArea(){
		this.directionArrows.setBorderingAreas('', '', '', 'area5_1');
		
		this.antHillGlow = this.game.add.image(0,0, 'area5_2_glow');
		this.antHillGlow.alpha = 0;
		this.antHillGlowtween = this.game.add.tween(this.antHillGlow).to({alpha: 1}, 2000, Phaser.Easing.Linear.InOut, true, 0, 2000, true);
		
		var antSpawnPoints = [];
		antSpawnPoints.push(new SpawnPoint(70, 100, 700, 100, -100));
		antSpawnPoints.push(new SpawnPoint(70, 500, 700, 100, -100));
		antSpawnPoints.push(new SpawnPoint(70, 800, 700, 100, -100));
		antSpawnPoints.push(new SpawnPoint(70, 1100, 700, 100, -200));
		
		var antSpawnPointsTemp = [];
		antSpawnPointsTemp.push(new SpawnPoint(100, 300, 530, 100, -100));
		antSpawnPointsTemp.push(new SpawnPoint(100, 500, 530, 100, -100));
		antSpawnPointsTemp.push(new SpawnPoint(100, 700, 530, 100, -100));
		antSpawnPointsTemp.push(new SpawnPoint(100, 900, 530, 100, -200));

		this.antHillClickArea = this.game.add.existing(new LocationOfInterest(this.game, 500, 200, 300, 300, null));
		
		this.game.input.onDown.add(function(){
			if(!this.milestones["Destroyed ant-hill"].reached){
				if(Phaser.Rectangle.contains(this.antHillClickArea.body, this.game.input.activePointer.x, this.game.input.activePointer.y)){
					this.openAntHill();
				}
			}
		}, this);
		
		this.antSpawner = new Spawner(this.game, antSpawnPointsTemp, 'CrystalAnt', 0.16, this.setAngle);
		this.antSpawner.spawnObjects();
		this.antSpawner.spawnPoints = antSpawnPoints;
	    this.game.time.events.loop(Phaser.Timer.SECOND * 5, function(){this.antSpawner.spawnObjects();}, this);
	    
	    this.antAttackSpawner = null;
	  
	}
	
	update(){
		if(this.milestones["Picked-up crystal"].reached && !this.antsAttacking){
			this.antsAttack();
			this.antsAttacking = true;
		}else{
			this.moveAnts();
			
			if(this.antsAttacking){
				this.moveAttackingAnts();
			}
		}
		
		if(this.vertigo !== undefined){
			if(this.vertigo.active && !this.milestones["Attacked by ants"].reached){
				 this.game.camera.shake(0.01, 100, true, Phaser.Camera.SHAKE_BOTH, true);
			}
		}
	}
	
	openAntHill(){
		var antHillHole1 = this.game.add.image(0, 0, 'area5_2_hole_1');
		var antHillHole2 = this.game.add.image(0, 0, 'area5_2_hole_2');
		
		var crystal = this.game.add.existing(new Phaser.Sprite(this.game, 600, 310, 'kristall_topp'));
		var crystalGlowing = this.game.add.existing(new Phaser.Sprite(this.game, 600, 310, 'kristall_topp_glowing'));
		crystalGlowing.inputEnabled = true;
		
		antHillHole1.alpha = 0;
		antHillHole2.alpha = 0;
		
		crystal.alpha = 0;
		crystal.scale.setTo(0.2, 0.2);
		crystalGlowing.alpha = 0;
		crystalGlowing.scale.setTo(0.2, 0.2);

		var tween1 = this.game.add.tween(antHillHole1).to({alpha: 1}, 2000, Phaser.Easing.Linear.In, true);
		var tween2 = this.game.add.tween(antHillHole2).to({alpha: 1}, 2000, Phaser.Easing.Linear.In, true);
		var tween3 = this.game.add.tween(crystal).to({alpha: 1}, 2000, Phaser.Easing.Linear.In, true);
		var tween4 = this.game.add.tween(crystalGlowing).to({alpha: 1}, 2000, Phaser.Easing.Linear.InOut, true, 0, 2000, true);
		
		this.milestones["Destroyed ant-hill"].reached = true;
		
		var bringAntsToTop = function(context){
			context.antAttackSpawner.objects.forEach(function(ant){
				ant.bringToTop();
			}, this);
			context.antSpawner.objects.forEach(function(ant){
				ant.bringToTop();
			}, this);
		}
		
		var setMilestoneFinished = function(context){
			context.milestones["Attacked by ants"].reached = true;
			var timer = context.game.time.create(false);
			timer.add(1000, function(){
				context.signals.newArea.dispatch('area5_3');	
				console.log("hej");
			}, this); 
			

			timer.start();

		}
		
	    crystalGlowing.events.onInputDown.add(function(item){
	    	this.inventory.addItem(item);
	    	crystal.destroy();
	    	crystalGlowing.destroy();
	    	this.milestones["Picked-up crystal"].reached = true;
	    	
	    	
	    	var vertigoFrames = ["area5_2_attack_1", "area5_2_attack_2", "area5_2_attack_3", "area5_2_attack_4", "area5_2_attack_5", "area5_2_attack_6", "area5_2_attack_7"];
	    	this.vertigo = new FrameSwitcher(this.game, vertigoFrames, this);
	    	this.vertigo.onEachFrame = bringAntsToTop;
	    	this.vertigo.onFinished = setMilestoneFinished;
	    	this.vertigo.start();
	    
	    }, this);
	}
	
	moveAnts(){
		this.antSpawner && this.antSpawner.objects.forEach(function(ant){
			if(ant.position.y > 700){
				ant.visible = false;
				if(this.antsAttacking){
					ant.destroy();
				}
			}else{
				ant.visible = true;
				
				if(this.antsAttacking){
					ant.yVelocity = 20;
				}
			}
			
			if((!this.milestones["Destroyed ant-hill"].reached && ant.position.y <= 110) || (this.milestones["Destroyed ant-hill"].reached && ant.position.y <= 400)){
				if(ant.tween === null){
					this.fadeAndDestroy(ant);
				}
			}


			if(ant.body !== null){
				if(ant.position.x > 800 && ant.position.x < 1280){
					ant.body.velocity.x = -17;
				}else if(ant.position.x > 750 && ant.position.x <= 800){
					ant.body.velocity.x = -12;
				}else if(ant.position.x < 700 && ant.position.x >= 750){
					ant.body.velocity.x = 5;
				}else if(ant.position.x < 500 && ant.position.x >= 450){
					ant.body.velocity.x = 12;
				}else if(ant.position.x < 450){
					ant.body.velocity.x = 17;
				}
			}
			

		}, this);
	}
	
	moveAttackingAnts(){
		this.antAttackSpawner && this.antAttackSpawner.objects.forEach(function(ant){
			
			if(ant.position.x > 800 && ant.position.x < 1280){
				ant.body.velocity.x = -80;
			}else if(ant.position.x > 750 && ant.position.x <= 800){
				ant.body.velocity.x = -40;
			}else if(ant.position.x < 700 && ant.position.x >= 750){

			}else if(ant.position.x < 500 && ant.position.x >= 450){
				ant.body.velocity.x = 60;
			}else if(ant.position.x < 450){
				ant.body.velocity.x = 80;
			}					

			ant.yVelocity = -150;
		});
	}
	
	antsAttack(){
		var antAttackSpawnPoints = [];
		antAttackSpawnPoints.push(new SpawnPoint(30, 300, 700, 1200, -800));

		this.antAttackSpawner = new Spawner(this.game, antAttackSpawnPoints, 'ant_neutral_underside', 1.2, this.setAngle);
		this.game.time.events.loop(Phaser.Timer.SECOND * 1, function(){this.antAttackSpawner.spawnObjects();}, this);
		
		/*
		var antEmergeSpawnPoints = [];
		antEmergeSpawnPoints.push(new SpawnPoint(200, 600, 310, 100, -100));
		this.spawnAnts(antEmergeSpawnPoints, 0.16, 'ant_neutral');
		this.game.time.events.loop(Phaser.Timer.SECOND * 3, function(){this.spawnAnts(antEmergeSpawnPoints, 0.16, 'ant_neutral');}, this);
		*/
		this.antsAttacking = true;
	}
	
	setAngle(){
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
	}
	
	fadeAndDestroy(object){
		object.tween = this.game.add.tween(object)
		.to({alpha: 0}, 2000, Phaser.Easing.Linear.None);
		
		object.tween.onComplete.add(function(){
			this.destroy();
		}, object);
		
		object.tween.start();
	}
}