/**
 * Created by adin on 10/9/15
 * email: phpgege@163.com
 */

var PlayLayer = cc.Layer.extend({
    bgSprite: null,
    sushiSprites: null,
    ctor: function(){
        this._super();

        this.sushiSprites = [];
        cc.spriteFrameCache.addSpriteFrames(s_plist.sushi_list);
        //this.addSushi();
        this.schedule(this.update,1,100,1);
        var size = cc.winSize;

        this.bgSprite = new cc.Sprite(s_images.bg);
        this.bgSprite.attr({
            x: size.width >> 1,
            y: size.height >> 1,
            rotation: 180
        });
        this.addChild(this.bgSprite);
        return true;

    },
    addSushi: function(){
        var sushi = new SushiSprite("#sushi_1n.png");
        console.log(sushi)
        var size = cc.winSize;
        var x = sushi.width * .5 + size.width * .5 * cc.random0To1();
        sushi.attr({
            x: x,
            y: size.height - 30
        });
        this.addChild(sushi,2);
        this.sushiSprites.push(sushi);

        var dorpAction = cc.MoveTo.create(4,cc.p(sushi.x,-30));
        sushi.runAction(dorpAction);
    },
    removeSushi: function(){
        for(var i = 0;i < this.sushiSprites.length; i += 1){
            if(this.sushiSprites[i].y == 0){
                this.sushiSprites[i].removeFromParent();
                this.sushiSprites[i] = undefined;
                this.sushiSprites.splice(i,1);
                i -= 1;
            }
        }
    },
    update: function(){
        this.addSushi();
        this.removeSushi();
    }
});

var PlayScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});