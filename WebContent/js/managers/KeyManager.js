class KeyManager{
	constructor(game){
		this.game = game;
		this.keys = {};
	}

	initKeyBinding(name, key, onDown, context){
		this.keys[name] = this.game.input.keyboard.addKey(key);
		this.keys[name].onDown.add(onDown, context);
	}
}