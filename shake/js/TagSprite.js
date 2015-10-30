/**
 * Created by adin on 10/28/15
 * email: phpgege@163.com
 * 第三步的标签精灵
 */
var TagSprite = cc.Sprite.extend({
    moveAction: null,
    fadeInAction: null,
    fadeOutAction: null,
    onEnter: function () {
        this._super();
        this.moveAction = this.createAction();
        this.fadeInAction = this.createFadeInAction();
        this.fadeOutAction = this.createFadeOutAction();

        this.moveAction.retain();
        this.fadeInAction.retain();
        this.fadeOutAction.retain();
        // 上下动一动
        this.runAction(this.moveAction.repeatForever());
        this.addTouchEventListenser();
    },
    onExit: function () {
        this._super();
        this.moveAction.release();
        this.fadeInAction.release();
        this.fadeOutAction.release();
    },
    addTouchEventListenser: function () {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch,event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if(cc.rectContainsPoint(target.getBoundingBox(),pos)){

                    // 让子元素显示出来setLocalZOrder
                    var opacityVal = target.getChildByName('childBg').getOpacity();
                    if(opacityVal === 0){
                        if(target.getParent().selectNum == 5){ return false;}
                        target.getChildByName('childBg').runAction(cc.sequence(target.fadeInAction,new cc.callFunc(function(){
                            if(target.getParent().selectNum > 2) {
                                target.getParent().nextSprite.runAction(target.fadeInAction);
                            }
                        })));
                        target.getParent().selectNum += 1;
                    }

                    if(opacityVal === 255){
                        target.getChildByName('childBg').runAction(cc.sequence(target.fadeOutAction,new cc.callFunc(function(){
                            if(target.getParent().selectNum <= 2){
                                target.getParent().nextSprite.runAction(target.fadeOutAction);
                            }
                        })));
                        target.getParent().selectNum -= 1;
                    }
                }
                return false
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    },
    // 上下动一动动画
    createAction: function(){
        // 区间：-25 25
        var rand = (cc.random0To1() - .5) * 50;
        rand = Math.abs(rand) > 3 ? rand : (rand + 8);
        var action = new cc.moveBy(1,0,rand);
        var actionback = action.reverse();
        return cc.sequence(action,actionback);
    },
    // 选中效果动画
    createFadeInAction: function () {
        var action = new cc.fadeIn(.3);
        return action;
    },
    createFadeOutAction: function () {
        var action = new cc.fadeOut(.3);
        return action;
    }
    
});