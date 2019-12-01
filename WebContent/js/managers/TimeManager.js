class TimeManager {
	constructor(currentDateTime, duskTime, dawnTime, moveSpeed, worldSpeed){
		this.worldSpeed = worldSpeed | 1; //1h = 1000s
		this.moveSpeed = moveSpeed | 3;
		this.currentDateTime = moment(currentDateTime);
		this.seconds = 0;
		this.frames = 0;
		this.started = false;
		this.duskTime = duskTime;
	}
	
	start(){
		this.started = true;
	}
	
	stop(){
		this.started = false;
	}
	
	move(){
		this.elapseTime((((this.moveSpeed)/60)*3)/60);
	}
	
	update(){
		if(this.started){
			this.seconds += 1/60;

			if(this.seconds >= (this.worldSpeed/60)/60){
				this.elapseTime(1)
				this.seconds = 0;
			}
		}
	}
	
	getCurrentDateTime(){
		return this.currentDateTime;
	}
	
	setCurrentDateTime(newCurrentDateTime){
		this.currentDateTime = newCurrentDateTime;
	}
	
	elapseTime(seconds){
		this.currentDateTime.add(seconds, 'seconds');
		//console.log(this.currentDateTime.format());
	}
	
	isPastDusk(){
		return this.currentDateTime.get('hour') >= this.duskTime;
	}
	
	isPastDawn(){
		return this.currentDateTime.get('hour') >= this.dawnTime;
	}
	
}