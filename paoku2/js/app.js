/**
 * Created by adin on 10/13/15
 * email: phpgege@163.com
 */
var MenuLayer = cc.Layer.extend({
   ctor: function(){
       this._super();
   },
    init: function(){
        this._super();
        var size = cc.winSize;

        var spritebg = new cc.Sprite(g_images.bg);
        spritebg.attr({
            x: size.width >> 1,
            y: size.height >> 1
        });
        this.addChild(spritebg);

        cc.MenuItemFont.setFontSize(60);

        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(g_images.start_n),
            new cc.Sprite(g_images.start_s),
            this.onPlay,this);

        var menu = new cc.Menu(menuItemPlay);
        menu.attr({x: size.width >> 1,y:size.height >> 1});
        this.addChild(menu);
    },
    onPlay: function () {
        cc.director.runScene(new PlayScene());
    }
});

var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
})