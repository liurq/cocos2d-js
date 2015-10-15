/**
 * Created by adin on 10/15/15
 * email: phpgege@163.com
 */

var MenuMainLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.winSize;
        // Sprite Item
        var spriteNormal = new cc.Sprite(g_images.menu_btn, cc.rect(0, 0, 112, 40));
        var spriteSelected = new cc.Sprite(g_images.menu_btn, cc.rect(0, 40, 112, 40));
        var spriteDisabled = new cc.Sprite(g_images.menu_btn, cc.rect(0, 40 * 2, 112, 40));
        var item1 = new cc.MenuItemSprite(spriteNormal, spriteSelected, spriteDisabled, this.onMenu1CallBack, this);

        // Image Item
        var btnNormal = new cc.SpriteFrame(g_images.btn_normal);
        //var btnActive = new cc.SpriteFrame(g_images.btn_active);
        cc.spriteFrameCache.addSpriteFrame(btnNormal, 'btnNormal');
        //cc.spriteFrameCache.addSpriteFrame(btnActive, 'btnActive');
        var item2 = new cc.MenuItemImage('#btnNormal', g_images.btn_active, this.onMenu2CallBack, this);


        var menu = new cc.Menu(item1, item2);
        menu.attr({
            x: size.width * .5,
            y: size.height * .5
        });
        this.addChild(menu)
    },
    onMenu1CallBack: function () {
        cc.log('item1')
    },
    onMenu2CallBack: function () {
        cc.log('item2')
    }
});

var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MenuMainLayer();
        this.addChild(layer);
    }
});