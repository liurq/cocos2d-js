/**
 * Created by lingjianfeng on 15/1/29.
 */


var MenuSprite = cc.Sprite.extend({
    _index: -1,         // 索引，用来在GC.menuItem取得数据
    _configs: null,     // 当前项的数据数组
    scrollView: null,     // scrollView 用来滚动子项[玩法]
    ctor: function (index) {
        this._super();
        // 加载[配置]
        this.loadConfig(index);
        // 加载[自身初始化]
        this.loadInit();
        // 加载[标题]
        this.loadTitle();
        // 加载[事件]
        this.loadListener();
    },
    // 加载[配置]
    loadConfig : function(index){
        this._index = index;
        this._configs = GC.menuItem[this._index];
    },
    // 加载[自身初始化]
    loadInit : function(){
        this.setTextureRect(cc.rect(0, 0, cc.winSize.width / 2, cc.winSize.height / 4));
        this.setColor(this._configs.color);
    },
    // 加载[标题]
    loadTitle : function(){
        var label = new cc.LabelTTF(this._configs.title, "Arial", 48);
        label.setPosition(this.width / 2, this.height / 2);
        label.setColor(this._configs.labelColor);
        this.addChild(label);
    },
    // 加载[事件]
    loadListener : function(){
        cc.eventManager.addListener({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : true,
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

//        target.unloadSubItem();
        target.loadSubItem();

        cc.log("sss");
        return true;

    },
    onTouchMoved : function (touch, event) {
        //var target = this.target;
    },
    onTouchEnded : function (touch, event) {
        //var target = this.target;
    },
    // 加载[菜单子项]
    loadSubItem : function(){

        // 记录当前选中的菜单，在点击其他菜单时，可以根据此记录，删除对应的subItem。
        this.parent.selectIndex = this._index;

        // 逻辑判断[如果没有子项,则不创建scrollView][即：随机-更多]
        if (this._configs.subItem.length == 0 ){
            // TODO
            return;
        }

        this.scrollView = new ccui.ScrollView();
        this.addChild(this.scrollView);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setBounceEnabled(true);
        this.scrollView.setContentSize(this.getContentSize());
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.y = this.scrollView.height;

        var scrollViewSize = this.scrollView.getContentSize();
        this.scrollView.setInnerContainerSize(cc.size(scrollViewSize.width, scrollViewSize.height / 3 * this._configs.subItem.length));

        var size = this.getContentSize();
        var j = this._configs.subItem.length;
        for (var i = 0; i < this._configs.subItem.length; i++){
            // 两个索引。用来获取GC.subItem.menuItem中的项，得到玩法。
            var node = new MenuItemSprite(this._index, i);
            node.x = size.width / 2;
            node.y = j * size.height / 3 - node.height / 2;
            this.scrollView.addChild(node);
            j--;
        }

        var actionMoveBy = cc.moveBy(0.2, cc.p(0, -size.height));
        var actionEaseSineIn = actionMoveBy.easing(cc.easeSineIn());
        this.scrollView.runAction(actionEaseSineIn);
    }
});