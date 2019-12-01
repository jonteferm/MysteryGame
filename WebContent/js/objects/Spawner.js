class Spawner {
	constructor(game, spawnPoints, type, scale, group, onSpawnObjectUpdate) {
		this.game = game;
		this.spawnPoints = spawnPoints;
		this.scale = scale;
		this.type = type;
		this.group = group;
		this.onSpawnObjectUpdate = onSpawnObjectUpdate;

	}
	
	spawnObjects(){
		this.spawnPoints.forEach(function(spawnPoint){
			for(var i = 0; i < spawnPoint.count; i++){
				this.spawnObject(i, spawnPoint.minX, spawnPoint.minY, spawnPoint.spreadXMin, spawnPoint.spreadXMax);
			}
		}, this);
	}
	
	spawnObject(index, minX, minY, spreadXMin, spreadXMax){
		var max = Math.ceil(spreadXMax);
		var min = Math.floor(spreadXMin);
		
		var object; 
	
		if(this.type === "CrystalAnt"){
			object = new CrystalAnt(this.game, minX + ((Math.random()*(max - min)) + min), minY+(2*index), this.onSpawnObjectUpdate);
		}else if(this.type === "ant_neutral_underside"){
			object = new CrystalAnt(this.game, minX + ((Math.random()*(max - min)) + min), minY+(2*index), this.onSpawnObjectUpdate, "ant_neutral_underside");
		}
		
		object.id = index;
		object.scale.setTo(this.scale, this.scale);
		
		this.group.add(object);

	}
}