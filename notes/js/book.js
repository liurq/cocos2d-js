/**
 * Created by adin on 10/14/15
 * email: phpgege@163.com
 */
var BookSprite = cc.Sprite.extend({
    onEnter: function () {
        this._super();
        this.addTouchEventListenser();
    },
    onExit: function () {
        this._super();
        cc.log('销毁');
    },
    addTouchEventListenser: function () {
        var that = this;
        var size = cc.winSize;
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {

                    cc.eventManager.removeAllListeners();
                    that.zIndex = 2;
                    var moveTo = cc.moveTo(1, cc.p(size.width * .5, size.height * .5));
                    var scaleTo = cc.scaleTo(1,2.555555,2.5555555);
                    var callFunc = cc.callFunc(function(){
                        //cc.director.runScene(new cc.TransitionPageTurn(2,new ListScene()));
                        cc.director.runScene(new cc.TransitionProgressRadialCCW(1,new ListScene()));
                    });
                    that.runAction(cc.sequence(scaleTo));
                    that.runAction(cc.sequence(moveTo,callFunc));
                }
            }
        });

        cc.eventManager.addListener(this.touchListener, this);
    }
});
