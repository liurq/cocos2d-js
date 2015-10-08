var TestLayer = cc.Layer.extend({
    perpleSprites: null,
    ctor: function () {
        // console.log(cc.director)
        this._super();
        this.perpleSprites = [];
        // 回调函数  间隔时间 重复次数 延迟时间
        this.schedule(this.update,1,16*1024,1);
    },
    init: function(){
        this._super();

        var winsize = cc.director.getWinSize();
        
        var centerpos = cc.p(winsize.width >> 1, winsize.height >> 1);

        // 背景
        // var spritebg = new cc.Sprite(s_images.helloBg);
        // spritebg.setPosition(centerpos);
        // this.addChild(spritebg);
        this._addPerple();
        
    },
    onPlay: function(){
        
    },
    _addPerple: function(){
        var winsize = cc.director.getWinSize();
        // 人物动起来
        var perple = new cc.Sprite(s_images.runner);
        var x = (perple.width >> 1) + winsize.width * cc.random0To1();
        (x > winsize.width) && (x = winsize.width - 30); 
        perple.attr({
            x: x,
            y: winsize.height - (perple.width >> 1)
        })
        this.perpleSprites.push(perple);
        this.addChild(perple);

        // 让精灵动起来
        /**
         * MoveBy 经过某点 
         * JumpTo 跳动
         * BezierTo 贝尔曲线运动
         * FadeIn 淡入
         * FadeOut 淡出
         * FadeTo 渐变
         * Repeat 重复执行动作
         * Spawn 同时执行一批动作
         * Sequence 使一批动作有序执行
        */
        var dropAction = cc.MoveTo.create(3,cc.p(perple.x,30))
        perple.runAction(dropAction);

        /**
         * 场景切换【导演 Director】
         * pushScene popScene replaceScene runScene
         * 效果：【注意浏览器兼容，翻页效果在浏览器上无效】
         * TransitionFadeDown TransitionPageTurn TransitionJumpZoom
         * 例子：
         * cc.director.replaceScene(cc.TransitionPageTurn(1,new PlayScene()),false);
         *
        */
        
        /**
         * 事件管理器
         * 触摸事件 键盘响应事件 鼠标响应事件 自定义事件 加速计事件
         * cc.spriteFrame 负责管理精灵帧   
         * cc.Animattion  负责管理动画序列  
         * cc.Animate     负责管理帧的动作创建
        */

        /**
         * onTouchBegan onTouchMoved onTouchEnded

         addTOuchEvent: function(){
            this.touchListener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function(touch,event){
                    var pos = touch.getLocation();
                    var target = event.getCurrentTarget();
                    if(cc.reactContainsPoint(target.getBoundingBox(),pos)){
                        return true;
                    }
                    return false;
                }
                cc.eventManager.addListener(this.touchListener,this);
            })            
         } 
         *
        */


    },
    _removePerple: function(){
        for(var i = 0; i < this.perpleSprites.length; i += 1){
            // cc.log('remove '+ i,this.perpleSprites[i].y,this.perpleSprites.length);
            if(Math.round(this.perpleSprites[i].y) == 30){
                
                this.perpleSprites[i].removeFromParent();
                this.perpleSprites[i] = undefined;
                this.perpleSprites.splice(i,1);
                i -= 1;
                // console.log(this.perpleSprites[i].y)
            }
        }
    },
    update: function(){
        this._addPerple();
        this._removePerple();
    }
});

var Test = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TestLayer();
        layer.init();
        this.addChild(layer);
    }
});
