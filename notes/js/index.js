/**
 * Created by adin on 10/14/15
 * email: phpgege@163.com
 */

var indexLayer = cc.Layer.extend({
    bookName:['COCOS2D-JS','JavaScript','HTML5','React Native','工具','其他'],
    ctor: function () {
        this._super();

        // 添加个背景
        this.bg = new cc.LayerColor(cc.color(95,98,99));
        this.addChild(this.bg);
        this.addBook();
    },
    addBook: function () {
        var size = cc.winSize;
        var width = 162,height = 190;
        for(var i = 0; i < 6; i += 1){
            this['book'+i] = new BookSprite(g_images.book);
            this['font'+i] = new cc.LabelTTF(this.bookName[i],'ten',20);
            this['font'+i].setColor(cc.color(0,0,0));
            var x,y;
            if(i < 3){
                x = (width >> 1) + 30;
                y = size.height + (height * .5) - (height + 30) * (i + 1);
            }else{
                x = size.width - ((width * .5) + 30);
                y = size.height + (height * .5) - (height + 30) * (i-2);
            }
            this['book'+i].attr({
                x: x,
                y: y
            });

            this['font'+i].attr({
                x: this['book'+i].getContentSize().width * .5,
                y: this['book'+i].getContentSize().height * .5
            });

            this['book'+i].addChild(this['font'+i]);
            this.addChild(this['book'+i]);
        }
    }
});

var indexScene = cc.Scene.extend({
   onEnter: function () {
       this._super();
       var layer = new indexLayer();
       this.addChild(layer);
   } 
});