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
    },
    addTouchEventListenser: function () {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch,event) {
                cc.log('touched');
            }
        })
    }
});
