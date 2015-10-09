/**
 * Created by adin on 10/9/15
 * email: phpgege@163.com
 */

var SushiSprite = cc.Sprite.extend({
    disappearAction: null,
    onEnter: function(){
       cc.log('onenter')
        this._super();
        this.disappearAction = this.createDisappearAction();
        this.disappearAction.retain();
        this.addTouchEventListenser();
    },
    onExit: function(){
        cc.log('onexit');
        this.disappearAction.release();
        this._super();

    },
    addTouchEventListenser: function(){
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch,event){
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                target.removeTouchEventListenser();

                //if(cc.rectContainsPoint(target.getBoundingBox(),pos)){
                //    cc.log('touched');
                //    return true;
                //}
                return false;
                console.log(target)
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    },
    createDisappearAction: function(){
        var frames = [];
        for(var i = 0;i < 11; i += 1){
            var str = "sushi_1n_"+i+".png";
            //cc.log(str)
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }

        var animation = new cc.Animation(frames,.02);
        var action = new cc.Animate(animation);
        return action;
    }


});