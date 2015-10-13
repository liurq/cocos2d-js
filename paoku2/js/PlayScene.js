/**
 * Created by adin on 10/13/15
 * email: phpgege@163.com
 */

var PlayScene = cc.Scene.extend({
    space: null,
    shapesToRemove: [],
    gameLayer: null,
    onEnter: function(){
        this._super();
        this.initPhysics();
        //this.shapesToRemove = [];
        this.gameLayer = new cc.Layer();
        this.gameLayer.addChild(new BackgroundLayer(this.space),0,TagOfLayer.background);
        this.gameLayer.addChild(new AnimationLayer(this.space),0,TagOfLayer.Animation);
        this.addChild(this.gameLayer);
        this.addChild(new StatusLayer(),0,TagOfLayer.Status);

        this.scheduleUpdate();

    }, // init space of chipmunk
    initPhysics:function() {
        //1. new space object
        this.space = new cp.Space();
        //2. setup the  Gravity
        this.space.gravity = cp.v(0, -350);

        // 3. set up Walls
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, g_groundHeight),// start point
            cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
            0);// thickness of wall
        this.space.addStaticShape(wallBottom);

        this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.coin,
            this.collisionCoinBegin.bind(this), null, null, null);
        this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.rock,
            this.collisionRockBegin.bind(this), null, null, null);

    },
    update: function (dt) {
        this.space.step(dt);

        for(var i = 0; i < this.shapesToRemove.length; i++) {
            var shape = this.shapesToRemove[i];
            this.gameLayer.getChildByTag(TagOfLayer.background).removeObjectByShape(shape);
        }
        this.shapesToRemove = [];

        var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
        var eyeX = animationLayer.getEyeX();

        this.gameLayer.attr({
            x: -eyeX,
            y: 0
        });
        //// 模拟cpSpaceAddPostStepCallback
        //for(var i = 0; i < this.shapesToRemove.length; i++) {
        //    var shape = this.shapesToRemove[i];
        //    this.gameLayer.getChildByTag(TagOfLayer.background).removeObjectByShape(shape);
        //}
        //this.shapesToRemove = [];
    },
    collisionCoinBegin:function (arbiter, space) {
        var shapes = arbiter.getShapes();
        // shapes[0] is runner
        this.shapesToRemove.push(shapes[1]);
        var statusLayer = this.getChildByTag(TagOfLayer.Status);
        statusLayer.addCoin(1);
    },

    collisionRockBegin:function (arbiter, space) {
        cc.director.pause();
        this.addChild(new GameOverLayer());
    }
});