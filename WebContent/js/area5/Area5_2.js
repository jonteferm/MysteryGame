class Area5_2 extends World {
	constructor(){
		super();
		this.lightBackground = "area5_2";
		this.tainted = false;
		this.antsAttacking = false;
		this.antSpawner = null;
		
		this.ms1 = "Destroyed ant-hill";
		this.ms2 = "Picked-up crystal";
		this.ms3 = "Attacked by ants";
	}
	
	createArea(){
		this.directionArrows.setBorderingAreas('', '', '', 'area5_1');
		if(!this.milestoneManager.getMilestoneReached(this.ms3)){
			this.antHillGlow = this.game.add.image(0,0, 'area5_2_glow');
			this.antHillGlow.alpha = 0;
			this.antHillGlowtween = this.game.add.tween(this.antHillGlow).to({alpha: 1}, 2000, Phaser.Easing.Linear.InOut, true, 0, 2000, true);
			
			
			var antSpawnPoints = [];
			antSpawnPoints.push(new SpawnPoint(2, 150, 700, 50, -50));
			antSpawnPoints.push(new SpawnPoint(2, 200, 700, 50, -50));
			antSpawnPoints.push(new SpawnPoint(2, 300, 700, 50, -50));
			antSpawnPoints.push(new SpawnPoint(2, 500, 700, 50, -50));
			antSpawnPoints.push(new SpawnPoint(2, 700, 700, 50, -50));
			antSpawnPoints.push(new SpawnPoint(2, 800, 700, 50, -50));
			antSpawnPoints.push(new SpawnPoint(2, 900, 700, 50, -50));
			antSpawnPoints.push(new SpawnPoint(2, 1000, 700, 100, -100));

			this.antHillClickArea = this.game.add.existing(new LocationOfInterest(this.game, 500, 200, 300, 300, null));
			
			this.game.input.onDown.add(function(){
				if(!this.milestoneManager.getMilestoneReached(this.ms1)){
					if(Phaser.Rectangle.contains(this.antHillClickArea.body, this.game.input.activePointer.x, this.game.input.activePointer.y)){
						this.openAntHill();
					}
				}
			}, this);
			

		    this.ants = this.game.add.group();
			
			this.antSpawner = new Spawner(this.game, antSpawnPoints, 'CrystalAnt', 0.16, this.ants, this.setAngle);
			this.antSpawner.spawnObjects();
		    this.antSpawnerLoop = this.game.time.events.loop(Phaser.Timer.SECOND * 1, function(){this.antSpawner.spawnObjects()}, this);
		}
	}
	
	updateArea(){
		if(!this.milestoneManager.getMilestoneReached(this.ms3)){
			if(this.antsAttacking && this.ants.children.length < 200){
				if(this.vertigo && this.vertigo.active){
					this.moveAttackingAnts();
				}else{
					this.antsAttack();
				}
			}
	
			this.moveAnts();
			
			this.controlPanel.bringToTop();
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
		
		this.milestoneManager.setMilestoneReached(this.ms1);
		
	    crystalGlowing.events.onInputDown.add(function(item){
	    	this.inventory.addItem(item);
	    	crystal.destroy();
	    	crystalGlowing.destroy();
	    	this.milestoneManager.setMilestoneReached(this.ms2);
	    	
	    	this.game.time.events.remove(this.antSpawnerLoop);

			this.antsAttacking = true;

	    }, this);
	}
	
	moveAnts(){
		this.antSpawner && this.ants.children.forEach(function(ant, index, array){
			if(this.antsAttacking){
				//this.ants.remove(ant, true);
				
				if(ant.position.y > 800){
					this.ants.remove(ant, true);
				}else{
					ant.yVelocity = 50;
				}
			}
			
			if(this.milestoneManager.getMilestoneReached(this.ms1)){
				if(ant.position.y <= 300  && ant.tween === null){
					this.fadeAndDestroy(ant);
				}

			}else{
				if(ant.position.y <= 110 && ant.tween === null){
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
		this.antAttackSpawner && this.attackingAnts.children.forEach(function(ant){
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

			ant.yVelocity = -200;
		});
	}
	
	antsAttack(){
		var antAttackSpawnPoints = [];
		antAttackSpawnPoints.push(new SpawnPoint(10, 300, 600, 1200, -800));
		
		this.attackingAnts = this.game.add.group();
		this.antAttackSpawner = new Spawner(this.game, antAttackSpawnPoints, 'ant_neutral_underside', 1.2, this.attackingAnts ,this.setAngle);
		//this.antAttackSpawner.spawnObjects();
		this.game.time.events.loop(Phaser.Timer.SECOND * 1, function(){this.antAttackSpawner.spawnObjects();}, this);

		
		var bringAntsToTop = function(context){
			context.game.camera.shake(0.008, 1000, true, Phaser.Camera.SHAKE_BOTH, true);
			context.game.world.bringToTop(context.attackingAnts);
			context.game.world.bringToTop(context.ants);

		}
		
		var setMilestoneFinished = function(context){
			context.milestoneManager.setMilestoneReached(context.ms3);
			context.game.time.events.stop();
			context.vertigo.destroy();
			context.signals.newArea.dispatch('area5_3');
		}
		
    	var vertigoFrames = ["area5_2_attack_1", "area5_2_attack_2", "area5_2_attack_3", "area5_2_attack_4", "area5_2_attack_5", "area5_2_attack_6", "area5_2_attack_7"];
    	this.vertigo = new FrameSwitcher(this.game, vertigoFrames, this);
    	this.vertigo.onEachFrame = bringAntsToTop;
    	this.vertigo.onFinished = setMilestoneFinished;
    	this.vertigo.start();
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