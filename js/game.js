
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },

    settings:{
        w:960, //universe width
        h:840, //universe height
        gs:20  // one grid size
    },

    absolute_time : 0,


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(this.settings.w, this.settings.h, {wrapper : "screen", scale : "fill-min"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // add our player entity in the entity pool
        me.pool.register("cell", game.Cell);
        me.pool.register("grid", game.Grid);

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
