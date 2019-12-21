class MilestoneManager {
	constructor(milestones) {
		this.milestones = milestones;
	}
	
	setMilestoneReached(milestone) {
		this.milestones[milestone].reached = true
	}
	
	getMilestoneReached(milestone) {
		return this.milestones[milestone].reached;
	}
	
	getReachedFilter(milestone) {
		return milestone.reached;
	}
	
	getAreaFilter(milestone, area) {
		return milestone.area === area;
	}
	
	getCurrentPoints() {
		var points = 0;
		
		Object.keys(this.milestones).filter(key => this.getReachedFilter(this.milestones[key])).forEach(key => {
			points += this.milestones[key].value;
		});
		
		return points;
	}
	
	getMaxPoints() {
		var points = 0;
		
		Object.keys(this.milestones).forEach(key => {
			points += this.milestones(key).value;
		});
		
		return points;
	}

	
	getAreaMaxPoints(area) {
		var points = 0;
		
		Object.keys(this.milestones).filter(key => this.getAreaFilter(this.milestones[key], area)).forEach(key => {
			points += this.milestones[key].value;
		});
		
		return points;
	}
	
	getAreaPoints(area) {
		var points = 0;
		
		Object.keys(this.milestones).filter(key => this.getAreaFilter(this.milestones[key], area)).filter(key => this.getReachedFilter(this.milestones[key])).forEach(key => {
			points += this.milestones[key].value;
		});
		
		return points;
	}
	
	getAreasCleared(areas) {
		return areas.forEach(area => {
			var areaMaxPoints = this.getAreaMaxPoints(area);
			if(areaMaxPoints > 0 && (this.getAreaPoints(area) !== areaMaxPoints)){
				return false;
			}
		});
			
		
		return true; 
	}
	
	/*
	getAllCleared(area) {
		return this.getCurrentPoints() === this.getMaxPoints(); 
	}*/
}