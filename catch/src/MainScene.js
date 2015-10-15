/**
 * Created by adin on 10/15/15
 * email: phpgege@163.com
 */

var MainLayer = cc.Layer.extend({
    flowerSprites: null,
    robot: null,
    ctor: function () {
        this._super();

        this.flowerSprites = [];

        this.schedule(this.update, 1);
        this.schedule(this.collidedUpdate);

        var size = cc.winSize;
        // 添加背景
        this.bgSprite = new cc.Sprite(res.bg, cc.rect(0, 0, 414, 736));
        this.bgSprite.attr({
            x: size.width * 0.5,
            y: size.height * 0.5
        });

        // 添加机器人
        this.robot = new RobotSprite(res.robot);
        var robotSize = this.robot.getContentSize();
        this.robot.attr({
            x: size.width * 0.5,
            y: robotSize.height * 0.5
        });

        this.bgSprite.addChild(this.robot);
        this.addChild(this.bgSprite);
    },
    // 添加花朵
    addFlower: function () {
        var flowerSprite = new FlowerSprite(res.flower);
        var size = cc.winSize;

        var x = flowerSprite.width * 0.5 + ((size.width - flowerSprite.width) * cc.random0To1());

        flowerSprite.attr({
            x: x,
            y: size.height - flowerSprite.height * 0.5
        });
        this.addChild(flowerSprite, 1);
        this.flowerSprites.push(flowerSprite);
        var dorpAction = cc.moveTo(2, cc.p(flowerSprite.x, -100));
        flowerSprite.runAction(dorpAction);

    },
    removeFlower: function () {
        for (var i = 0; i < this.flowerSprites.length; i += 1) {
            var y = Math.round(this.flowerSprites[i].y);
            if (y == -100) {
                this.flowerSprites[i].removeFromParent();
                this.flowerSprites[i] = undefined;
                this.flowerSprites.splice(i, 1);
                i -= 1;
            }
        }
        cc.log(this.flowerSprites.length)
    },
    update: function () {
        this.addFlower();
        this.removeFlower();
    },
    collidedUpdate: function () {
        for(var i = 0;i < this.flowerSprites.length; i += 1){
            var delStatus = this.robot.collide(this.flowerSprites[i]);
            if(delStatus){ this.flowerSprites[i] = undefined;this.flowerSprites.splice(i, 1);}
        }
    }

});

var MainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});