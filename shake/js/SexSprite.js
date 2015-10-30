/**
 * Created by adin on 10/29/15
 * email: phpgege@163.com
 */
var SexSprite = cc.Sprite.extend({
    fadeInAction: null,
    fadeOutAction: null,
    onEnter: function () {
        this._super();
        this.fadeInAction = this.createFadeInAction();
        this.fadeOutAction = this.createFadeOutAction();

        this.fadeInAction.retain();
        this.fadeOutAction.retain();
        this.addTouchEventListenser();
    },
    onExit: function () {
        this._super();
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
                    //target.getChildByName('sex').runAction(target.fadeInAction)
                    //target.getChildByName('sex').setOpacity(110);
                    // 让子元素显示出来setLocalZOrder

                    var opacityVal = target.getChildByName('sex').getOpacity();
                    if(opacityVal === 0){
                        var selectSpritesName = target.getParent().selectSpritesName;
                        // 把选中的去掉
                        if(selectSpritesName){
                            target.getParent().selectSprites[selectSpritesName].getChildByName('sex').runAction(target.fadeOutAction);
                        }
                        if(target.getParent().lock){
                            target.getParent().lock = false;
                            target.getChildByName('sex').runAction(cc.sequence(target.fadeInAction,new cc.callFunc(function(){
                                target.getParent().lock = true;
                                target.getParent().nextSprite.getOpacity() === 0 && target.getParent().nextSprite.runAction(target.fadeInAction);
                                target.getParent().selectSpritesName = target.getName();
                            })));
                        }
                    }
                }
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    },
    createFadeInAction: function () {
        var action = new cc.fadeIn(.5);
        return action;
    },
    createFadeOutAction: function () {
        var action = new cc.fadeOut(.5);
        return action;
    }

});
