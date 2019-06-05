game.Universe = me.Container.extend({
	init:function(settings){
		this._super(me.Container, "init", [0, 0,settings.w,settings.h]);
		this.settings = settings;
		this.anchorPoint.x=0;
		this.anchorPoint.y=0;

		this.drawBackground();

		this.widthInGird = settings.w/settings.gs;
		this.heightInGird = settings.h/settings.gs;
		this.grids = [];

		for(var i=0; i< this.settings.h; i+=this.settings.gs){
			for(var j=0;j <this.settings.w;j+=this.settings.gs){
				this.grids.push(me.pool.pull("grid",{x:j ,y: i}));
			}
		}
		//melonJS没有考虑children未初始化的情况
		this.children=[];
	},

	drawBackground: function(){
		me.video.renderer.clearColor("#FFF0CD");
        
		me.video.renderer.setColor("green");
		for(var y=0; y < this.settings.h; y += this.settings.gs){
			me.video.renderer.strokeLine(0, y, this.settings.w ,y);
		}

		for(var x=0; x< this.settings.w; x += this.settings.gs){
			me.video.renderer.strokeLine(x, 0, x, this.settings.h);
		}
	},

	//operations about positions
	posToIdx: function(pos){
		var xIdx = pos.x/this.settings.gs;
		var yIdx = pos.y/this.settings.gs;
		return yIdx*this.widthInGird+xIdx;
	},

	center: function(){
		return {x: this.settings.w/2, y: this.settings.h/2};
	},

	left: function(pos){
		if(pos.x>0){
			return {x:pos.x-this.settings.gs, y:pos.y};
		}
		return undefined;
	},
	right: function(pos){
		if(pos.x < this.settings.w-this.settings.gs){
			return {x:pos.x+this.settings.gs, y:pos.y};
		}
		return undefined;
	},
	top: function(pos){
		if(pos.y >0){
			return {x:pos.x, y:pos.y-this.settings.gs};
		}
		return undefined;
	},
	bottom: function(pos){
		if(pos.y< this.settings.h-this.settings.gs){
			return {x:pos.x, y:pos.y+this.settings.gs};
		}
		return undefined;
	},

	isEmpty: function(pos){
		return !this.grids[this.posToIdx(pos)].entity;
	},

	emptyGrids: function(pos){
		var result=[];
		var left = this.left(pos);
		if(left && this.isEmpty(left)){
			result.push(left);
		}
		var top = this.top(pos);
		if(top && this.isEmpty(top)){
			result.push(top);
		}
		var right = this.right(pos);
		if(right && this.isEmpty(right)){
			result.push(right);
		}
		var bottom = this.bottom(pos);
		if(bottom && this.isEmpty(bottom)){
			result.push(bottom);
		}
		return result;
	},

	//operations about entity
	traversal:function(callback){
		for(var i=0;i< this.grids.length;i++){
			callback(this.grids[i]);
		}
	},

	occupy:function(entity, pos){
		this.grids[this.posToIdx(pos)].entity = entity;
	},

	move: function(entity, newPos){
		this.grids[this.posToIdx(entity.pos)].entity = null;

		this.occupy(entity, newPos);
	},

	update:function(dt){
		game.absolute_time += dt;
		if(game.absolute_time>=200){
			this.drawBackground();//每次需要重新画背景
			this._super(me.Container, "update", [dt]);
        	this.updateChildBounds();
			game.absolute_time = 0;
		}
		return true;
	}
});