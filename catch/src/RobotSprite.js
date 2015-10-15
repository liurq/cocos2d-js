/**
 * Created by adin on 10/15/15
 * email: phpgege@163.com
 */
var RobotSprite = cc.Sprite.extend({
    onEnter: function () {
        this._super();
        //cc.log('onEnter');
        this.addTouchEventListenser();
    },
    onExit: function () {
        this._super();
        //cc.log('onExit');
    },
    // 触摸瞬间
    //onTouchBegan: function (touch) {
    //    cc.log(12311);
    //    //var bool = this.containsTouchLocation(touch, event);
    //
    //    //return bool;
    //},
    addTouchEventListenser: function () {
        var that = this;
        var size = cc.winSize;
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch,event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                var checked = cc.rectContainsPoint(target.getBoundingBox(),pos);
                return checked;
            },
            onTouchMoved: function (touch) {
                var pos = touch.getLocation();
                if((pos.x < that.width * 0.5) || (pos.x > (size.width - that.width * 0.5))){
                    return;
                }
                that.setPositionX(pos.x);
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    },
    collide: function (flowerObj) {
        var distance = cc.pDistance(this.getPosition(),flowerObj.getPosition());
        if(distance < this.getContentSize().height * 0.5 + flowerObj.getContentSize().height * 0.5){
            flowerObj.removeFromParent();
            return true;
        }
    }
   

});

