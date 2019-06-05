game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // reset the score
        game.data.score = 0;

        game.universe = new game.Universe(game.settings);

        me.game.world.addChild(game.universe, 0);

        this.setUp();
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.game.world.removeChild(this.universe);
    },

    setUp: function(){
        var center = game.universe.center();
        var cell = me.pool.pull("cell", center.x, center.y);
        game.universe.occupy(cell, center);
        game.universe.addChild(cell);
        
        game.universe.updateChildBounds();
    }
});
