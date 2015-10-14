/**
 * Created by lingjianfeng on 15/1/29.
 */


var TileType = {};
TileType.START_LINE = 0;    // 起跑线
TileType.TOUCH      = 1;    // 可以踩的[黑块]
TileType.DONT_TOUCH = 2;    // 不能踩的[白块]
TileType.BE_END     = 3;    // 快到终点的时候，变成绿色的块

var TileSprite = cc.Sprite.extend({
    type: TileType.DONT_TOUCH,
    _callBackFunc: null,
    _listener: null,
    ctor: function (size, callBackFunc) {
        this._super();
        this.loadConfig(callBackFunc);
        this.loadInit(size);
        return true;
    },
    // 加载[配置]
    loadConfig : function(callBackFunc){
        this._callBackFunc = callBackFunc;
    },
    // 加载[自身初始化]
    loadInit : function(size){
        this.setTextureRect(cc.rect(0, 0, size.width, size.height));
        this.setColor(cc.color.WHITE); // 默认设为白色
    },
    // 加载[事件]
    loadListener : function(){
        var listener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : true,
            onTouchBegan    : this.onTouchBegan,
            onTouchMoved    : this.onTouchMoved,
            onTouchEnded    : this.onTouchEnded
        });
        cc.eventManager.addListener(listener, this);
    },
    onTouchBegan: function (touch, event) {
        var self = this.target;
        var locationInNode = self.convertToNodeSpace(touch.getLocation());
        var size = self.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);
        if (!cc.rectContainsPoint(rect, locationInNode)) {
            return false;
        }
        // 触摸处理
        self.onTouchDispose();
        return true;

    },
    onTouchMoved : function (touch, event) {
        //var self = this.target;
    },
    onTouchEnded : function (touch, event) {
        var self = this.target;
        // 移除.保证只能点击一次
        cc.eventManager.removeListeners(self);
    },
    onTouchDispose : function(){
        var self = this;
        var callFun = cc.callFunc(function(){
            // 游戏是否结束[如果点击到白块，则游戏结束]
            var isGameOver = self.type == TileType.DONT_TOUCH ? true : false;
            (self._callBackFunc && typeof(self._callBackFunc) === "function") && self._callBackFunc(self, isGameOver);
        });

        var sacleAction = cc.scaleTo(0.1, 1);
        var blinkAction = cc.blink(0.4, 4);
        var touchAction = cc.sequence(sacleAction, callFun);
        var dontTouchAction = cc.sequence(blinkAction, callFun);
        var action = (this.type == TileType.TOUCH) ? touchAction : dontTouchAction;

        // 根据当前类型指定颜色
        var color = (this.type == TileType.TOUCH) ? cc.color.GRAY :cc.color.RED;
        var scale = (this.type == TileType.TOUCH) ? 0.1 : 1;

        var subTile = new cc.Sprite();
        this.addChild(subTile);
        subTile.setPosition(this.width / 2, this.height / 2);
        subTile.setTextureRect(cc.rect(0, 0, this.width, this.height));
        subTile.scale = scale;
        subTile.color = color;
        subTile.runAction(action);
    },
    setType : function(type){
        switch (type){
            case TileType.START_LINE:
                this.setColor(cc.color.YELLOW);
                break;
            case TileType.TOUCH:
                this.setColor(cc.color.BLACK);
                break;
            case TileType.DONT_TOUCH:
                // 默认白色，不做设置
                break;
            case TileType.BE_END:
                this.setColor(cc.color.GREEN);
                this.setTextureRect(cc.rect(0, 0, this.width + 10, this.height));
                break;
        }
        this.type = type;
    }
});
