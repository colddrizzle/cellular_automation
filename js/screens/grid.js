game.Grid = me.Object.extend({
	init: function(pos){
		this.signals = []
		this.pos = pos;
	},
	signal: function(signal){
		this.signals.push(signal);
	},

	occupy: function(entity){
		this.entity = entity;
	},

	destroy: function(){
	}
}); 