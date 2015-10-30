/**
 * Created by adin on 10/28/15
 * email: phpgege@163.com
 * 音频处理
 */
var AudioSprite = cc.Sprite.extend({
    rotateAction: null,
    rodStopAction: null,
    rodStartAction: null,
    soundId: null,
    onEnter: function () {
        this._super();
        this.rotateAction = this.createAction();
        this.rodStopAction = this.createRodStopAction();
        this.rodStartAction = this.createRodStartAction();
        this.rotateAction.retain();
        this.rodStopAction.retain();
        this.rodStartAction.retain();

        // 刚开始默认播放音乐
        this.runAction(this.rotateAction.repeatForever());
        //this.soundId = cc.audioEngine.playMusic(res.audioMp3,true);
        this.addTouchEventListenser();
    },
    onExit: function () {
        this._super();
        this.rotateAction.release();
        this.rodStopAction.release();
        this.rodStartAction.release();
    },
    addTouchEventListenser: function () {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch,event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if(cc.rectContainsPoint(target.getBoundingBox(),pos)){


                    // 音乐正在播放则停止
                    if(cc.audioEngine.isMusicPlaying(target.soundId)){
                        cc.audioEngine.pauseMusic(target.soundId);
                        target.getParent().rodSprite.runAction(target.rodStopAction);
                        target.stopAction(target.rotateAction);
                    }else{
                        // 音乐没在播放，则开始播放
                        cc.audioEngine.resumeMusic(target.soundId);
                        target.getParent().rodSprite.runAction(target.rodStartAction);
                        target.runAction(target.rotateAction);
                    }
                }
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    },
    createAction: function () {
        var action = new cc.rotateBy(2,360);
        return action;
    },
    createRodStopAction: function () {
        var action = new cc.RotateTo(.5,-40);
        return action;
    },
    createRodStartAction: function(){
        var action = new cc.RotateTo(.5,0);
        return action;
    }
});