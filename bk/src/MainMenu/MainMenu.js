/**
 * Created by lingjianfeng on 15/1/29.
 */



var MainMenuLayer = cc.Layer.extend({
    selectIndex : 0,    // 当前选择的菜单
    ctor:function () {
        this._super();
        this.loadMainMenu();
        return true;
    },
    // 加载[主界面菜单]
    loadMainMenu : function(){
        // 层级设置，遮挡后面的subItem。
        var j = GC.menuItem.length;
        for (var i = 0; i < GC.menuItem.length; i++){
            var menuSprite = new MenuSprite(i);
            if (i % 2 == 0){
                menuSprite.x = menuSprite.width / 2;
                menuSprite.y = GC.h - (i / 2 + 1) * menuSprite.height + menuSprite.height / 2;
            }else{
                menuSprite.x = menuSprite.width * 1.5;
                menuSprite.y = GC.h - (i / 2 + 1) * menuSprite.height + menuSprite.height;
            }
            this.addChild(menuSprite, j, i);
            j--;
        }
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});

