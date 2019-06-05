game.Cell = me.Entity.extend({
	init: function(x, y){
		this._super(me.Entity, "init", [x, y, { width: game.settings.gs, height: game.settings.gs }]);
		this.z = 1;
		this.renderable = new (me.Renderable.extend({
            init : function () {
                this._super(me.Renderable, "init", [0, 0, game.settings.gs, game.settings.gs]);
            },
            destroy : function () {},
            draw : function (renderer) {
                var color = renderer.getColor();
                renderer.setColor('green');
                renderer.fillRect(0, 0, this.width, this.height);
                renderer.setColor(color);
            }
        }));
	},

	update: function(dt){
		if(this.life==0){
			return false;
		}
		var emptyGrids = game.universe.emptyGrids(this.pos);
		for(var i=0;i<emptyGrids.length;i++){
			var cell = me.pool.pull("cell", emptyGrids[i].x, emptyGrids[i].y);
			cell.life = this.life-1;
			game.universe.occupy(cell, emptyGrids[i]);
			game.universe.addChild(cell);
		}
		return true;
	}
});