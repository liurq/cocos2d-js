/**
 * Created by adin on 10/9/15
 * email: phpgege@163.com
 */

var PlayLayer = cc.Layer.extend({
    bgSprite: null,
    sushiSprites: null,
    timeout: 5,
    score: 0,
    ctor: function(){
        this._super();
        this.sushiSprites = [];
        cc.spriteFrameCache.addSpriteFrames(s_plist.sushi_list);
        //this.addSushi();
        this.schedule(this.update,1,100,1);
        this.schedule(this.timer,1,this.timeout,1);
        var size = cc.winSize;


        // 添加背景
        this.bgSprite = new cc.Sprite(s_images.bg);
        this.bgSprite.attr({
            x: size.width >> 1,
            y: size.height >> 1,
            rotation: 180
        });
        this.addChild(this.bgSprite);

        // 添加得分与倒计时标签
        this.scoreLabel = new cc.LabelTTF('score: '+this.score,'',20);
        this.scoreLabel.attr({
            x: size.width - 50,
            y: size.height - 20
        });
        this.addChild(this.scoreLabel,4);

        // timeout 60
        this.timeoutLabel = new cc.LabelTTF(''+this.timeout,'',30);
        this.timeoutLabel.attr({
            x: 20,
            y: size.height - 20
        });
        this.addChild(this.timeoutLabel,4);


        return true;

    },
    addSushi: function(){
        var sushi = new SushiSprite("#sushi_1n.png");
        //console.log(sushi)
        var size = cc.winSize;
        var x = sushi.width * .5 + size.width * .5 * cc.random0To1();
        sushi.attr({
            x: x,
            y: size.height - 30
        });
        this.addChild(sushi,2);
        this.sushiSprites.push(sushi);

        var dorpAction = new cc.MoveTo(4,cc.p(sushi.x,-50));
        sushi.runAction(dorpAction);
    },
    addScore: function(){
        this.score += 1;
        this.scoreLabel.setString('score:'+ this.score);
    },
    removeSushi: function(){
        for(var i = 0;i < this.sushiSprites.length; i += 1){
            //cc.log(this.sushiSprites[i].y)

            if(Math.round(this.sushiSprites[i].y) == -50){
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
    },
    timer: function(){
        if(this.timeout == 0){

            var gameOver = new cc.LayerColor(cc.color(225,225,225,100));
            var size = cc.winSize;
            var titleLabel = new cc.LabelTTF('Game Over','',30);
            titleLabel.attr({
                x: size.width >> 1,
                y: size.height >> 1
            });
            gameOver.addChild(titleLabel,15);

            var TryAginItem = new cc.MenuItemFont(
                'Try Again',
                function(){
                    var transition = cc.TransitionFade(1,new PlayScene(),cc.color(255,255,255,255));
                    cc.director.runScene(new PlayScene());
                },this);
            TryAginItem.attr({
                x: size.width >> 1,
                y: (size.height >> 1) - 60,
                anchorX:.5,
                anchorY:.5
            });
            var menu = new cc.Menu(TryAginItem);
            menu.x = 0;
            menu.y = 0;
            gameOver.addChild(menu,1);
            this.getParent().addChild(gameOver);
            this.unschedule(this.update);
            this.unschedule(this.timer);
            return;
        }
        this.timeout -= 1;
        this.timeoutLabel.setString(''+this.timeout)
    }
});

var PlayScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});