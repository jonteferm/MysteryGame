class SpellManager{
	constructor(game, context){
		this.game = game;
		this.context = context;
		this.library = [];
	}
	
	initSpells(casterLevel){
		var banishingSpell = new Spell(this.game, "Banishing", new LesserBanishing(), this.context.signals.banishing);
		this.library.push(banishingSpell);
	}
	
	identify(drawing){
		var bestMatch = {matchingGrade: 0, spell: null};
    	
    	this.library.forEach(function(spell, index){
    		var matchingGrade = this.matchSymbols(drawing, spell.formula);
    		
    		if(matchingGrade >= 56 && matchingGrade <= 58){
    			if(matchingGrade > bestMatch.matchingGrade){
    				bestMatch.matchingGrade = matchingGrade;
    				bestMatch.spell = spell;
    			}
    		}
    	}, this);
    	
    	return bestMatch.spell;	
	}
	
	matchSymbols(drawing, formula){
		var percentage = 0;
		var paths = drawing.match(/\{(.*?)\}/g);

		for(var i = 0; i < paths.length; i++){
			paths[i] = "[" + paths[i] + "]";
			if(formula.paths[i]){
				percentage += Sketchy.shapeContextMatch(paths[i], formula.paths[i]);
			}
		}

		percentage = (Math.floor(percentage * 10000)/100);
		percentage = percentage.toString().substring(0,5);
		
		console.log("Match: " + percentage + "%");
		
		return percentage;
	}
}