/**
 * Created by lingjianfeng on 15/1/29.
 */

var MenuItemSprite = cc.Sprite.extend({

    _index: -1,
    _menuIndex: -1,
    _touchOffset: cc.p(0, 0),
    ctor: function (menuIndex, index) {
        this._super();
        this.loadConfig(menuIndex, index);
        this.loadInit();
        this.loadTitle();
        this.loadListener();
    },
    loadConfig : function(menuIndex, index){
        this._menuIndex = menuIndex;
        this._index = index;
    },
    loadInit : function(){
        var size = cc.size(GC.w2, GC.h / (GC.menuItem.length / 2 * 3));
        this.setTextureRect(cc.rect(0, 0, size.width, size.height));
        var color = this._index % 2 == 0 ? GC.menuItem[this._menuIndex].color : GC.menuItem[this._menuIndex].labelColor;
        this.setColor(color);
    },
    loadTitle : function(){
        var title = GC.menuItem[this._menuIndex].subItem[this._index];
        var color = this._index % 2 == 0 ? GC.menuItem[this._menuIndex].labelColor : GC.menuItem[this._menuIndex].color;
        var label = new cc.LabelTTF(title, "Arial", 24);
        label.setPosition(this.width / 2, this.height / 2);
        label.setColor(color);
        this.addChild(label);
    },
    loadListener : function(){
        cc.eventManager.addListener({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : false,  // TODO 这里采用不吞噬，为的是scrollView能够滑动。
            onTouchBegan  : this.onTouchBegan,
            onTouchMoved  : this.onTouchMoved,
            onTouchEnded  : this.onTouchEnded
        }, this);
    },
    onTouchBegan: function (touch, event) {
        var target = this.target;
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var size = target.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);
        if (!cc.rectContainsPoint(rect, locationInNode)) {
            return false;
        }

        target._touchOffset = touch.getLocation();
        return true;
    },
    onTouchMoved : function (touch, event) {
        //var target = this.target;
    },
    onTouchEnded : function (touch, event) {
        var target = this.target;

        var isEffective = target.checkTouch(target._touchOffset, touch.getLocation());
        if (isEffective){
            target.onGamePlayEnter();
            target._touchOffset = cc.p(0, 0);
        }
    },
    checkTouch : function(pos1, pos2){
        var offsetX = Math.abs(pos2.x - pos1.x);
        var offsetY = Math.abs(pos2.y - pos1.y);
        return (offsetX <= this.width / 3 && offsetY <= this.height / 3) ? true : false;
    },
    onGamePlayEnter : function(){
        // 游戏启动
        var scene = new cc.Scene();
        var layer = new GamePlayLayer(this._menuIndex, this._index);
        scene.addChild(layer);

        var time = 0.5;
        var finalScene = null;
        var num = Math.floor(Math.random() * 4);
        switch (num){
            case 0 :
                finalScene = new cc.TransitionSlideInL(time,scene);

                break;
            case 1 :
                finalScene = new cc.TransitionSlideInR(time,scene);
                break;
            case 2 :
                finalScene = new cc.TransitionSlideInB(time,scene);
                break;
            case 3 :
                finalScene = new cc.TransitionSlideInT(time,scene);
                break;
            default :
                finalScene = new cc.TransitionSlideInR(time,scene);
        }
        cc.director.runScene(finalScene);
    }

});