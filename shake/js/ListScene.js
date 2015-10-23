/**
 * Created by adin on 10/23/15
 * email: phpgege@163.com
 */


var ListLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.winSize;
        this.bg = new cc.Sprite(res.listBg);
        this.bg.attr({
            x: size.width >> 1,
            y: size.height >> 1
        });
        this.menu();

        this.addChild(this.bg);

    },
    menu: function () {
        //var size = cc.winSize;
        //var spriteNormalFriend = new cc.Sprite(res.listFriendMenu,cc.rect(0,91,172,91));
        //var spriteSelectedFriend = new cc.Sprite(res.listFriendMenu,cc.rect(0,0,172,91));
        //var item1 = new cc.MenuItemSprite(spriteNormalFriend,spriteSelectedFriend,null,this.onMenuFriend,this);
        //var menu = new cc.Menu(item1);
        //
        //menu.x = size.width >> 1;
        //menu.y = size.height >> 1;
        //this.bg.addChild(menu);
        var size = cc.winSize;
        this._horizontalLayout = new ccui.HBox();
        this._horizontalLayout.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this._horizontalLayout.setFocused(true);

        this.bg.addChild(this._horizontalLayout);
        //cc.log(ccui.Widget.LOCAL_TEXTURE)
        var w = new ccui.ImageView(res.listFriendMenu);
        //w.setScale9Enabled(true);
        //w.ignoreContentAdaptWithSize = true;
        //w.setCapInsets(cc.rect(0,0,172,91));
        //cc.log(w.getCapInsets())
        //w.setCapInsets(cc.rect(0,0,172,91));
        w.setTouchEnabled(true);
        w.setTag(1);

        w.addTouchEventListener(this.onImg,this);
        this._horizontalLayout.addChild(w);
        return true;
    },
    onImg: function (widget,touchType) {
        if(touchType == ccui.Widget.TOUCH_ENDED){
            if(widget.isFocusEnabled()){
                widget.setFocusEnabled(false);
                //widget.setImage
                //widget.setDragImage(res.m2)
                //widget.setBackGroundImageCapInsets(res.m2)
                //widget.setColor(cc.color.YELLOW);
                //widget.setSelectedImage(res.m2)
                //widget.setBackGroundImage(res.m2);
            }else{
                widget.setFocusEnabled(true);
                widget.setColor(cc.color.red);
            }
        }

    },
    onMenuFriend: function () {
        cc.log('menu1')
    }
});
var ListScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new ListLayer();
        this.addChild(layer);
    }
});