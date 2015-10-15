/**
 * Created by adin on 10/14/15
 * email: phpgege@163.com
 */
var ListLayer = cc.Layer.extend({
    LINE_SPACE: 45,
    bookName: ['COCOS2D-JS', 'JavaScript', 'HTML5', 'React Native', '工具', '其他'],
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        var size = cc.winSize;
        // 添加个背景
        this.bg = new cc.LayerColor(cc.color(95, 98, 99));
        this._itemMenu = new cc.Menu();
        for (var i = 0, len = listName.length; i < len; i += 1) {
            var label = new cc.LabelTTF(listName[i].title, 'ten', '20');
            var menuItem = new cc.MenuItemLabel(label, this.onMenuCallBack, this);
            menuItem.setColor(cc.color(255,255,255));
            menuItem.attr({
                x: size.width / 2,
                y: size.height - (i + 1) * this.LINE_SPACE
            });
            menuItem.enabled = true;
            this._itemMenu.addChild(menuItem, i + 10000);
        }
        this._itemMenu.width = size.width;
        this._itemMenu.height = (listName.length + 1) * this.LINE_SPACE;
        this._itemMenu.attr({
            x: 0,
            y: -30
        });
        this.bg.addChild(this._itemMenu);
        this.addChild(this.bg);
    },
    onMenuCallBack: function(sender){
        var index = sender.getLocalZOrder() - 10000;
        var listCase = listName[index];
        var res = listCase.res || [];
        cc.LoaderScene.preload(res, function () {
            var scene = listCase.ListScene();
            if(scene){
                cc.director.runScene(scene);
            }
        });
        //cc.log(1234);
    }
});

var ListScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new ListLayer();
        this.addChild(layer);
    }
});


var listName = [
    {
        title: '菜单测试',
        ListScene: function(){
            return new MenuScene();
        }
    },
    {
        title: 'UI测试',
        ListScene: function () {
            return new UIScene();
        }
    }
];