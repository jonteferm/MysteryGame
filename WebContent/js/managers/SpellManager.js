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
	
	tryCast(drawing){
		var bestMatch = {matchingGrade: 0, spell: null};
    	
    	this.library.forEach(function(spell, index){
    		var matchingGrade = this.matchSymbols(drawing, spell.formula);
    		
    		if(matchingGrade >= 70){
    			if(matchingGrade > bestMatch.matchingGrade){
    				bestMatch.matchingGrade = matchingGrade;
    				bestMatch.spell = spell;
    			}
    		}
    	}, this);
    	
    	
    	if(bestMatch.spell !== null){
    		bestMatch.spell.cast();
    	}
	}
	
	matchSymbols(drawing, formula){
		/*
		console.log(formula.path);
		console.log("_________________________________");
		console.log(drawing);
		*/
		
		var percentage = Sketchy.shapeContextMatch(drawing, formula.path);

		percentage = (Math.floor(percentage * 10000)/100);
		percentage = percentage.toString().substring(0,5);
		
		console.log("Match: " + percentage + "%");
		
		return percentage;
	}
}