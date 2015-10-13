/**
 * Created by adin on 10/9/15
 * email: phpgege@163.com
 */

var StartLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        var size = cc.winSize;

        // 添加背景
        this.bgSprite = new cc.Sprite(s_images.bg);
        this.bgSprite.attr({
            x: size.width >> 1,
            y: size.height >> 1
        });
        this.addChild(this.bgSprite);

        // 添加文字
        //var testLabel = new cc.LabelTTF('test','',30);
        //testLabel.x = size.width >> 1;
        //testLabel.y = size.height >> 1;
        //this.addChild(testLabel,1);

        // 添加菜单
        var startMenu = new cc.MenuItemImage(
            s_images.start_n,
            s_images.start_s,
            this.onPlay,this);
        startMenu.attr({
            x: size.width >> 1,
            y: size.height >> 1,
            anchorX:.5,
            anchorY:.5
        });

        var menu = new cc.Menu(startMenu);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu,2);

        return true;
    },
    onPlay: function(){
        //cc.director.replaceScene(new PlayScene());
        //var director = cc.Director.getInstance();
        cc.director.runScene(new PlayScene());
        //director.replaceScene(new PlayScene());
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});