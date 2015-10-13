/**
 * Created by adin on 10/13/15
 * email: phpgege@163.com
 */

var TestLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        var size = cc.winSize;

        this.bgLayer = new cc.LayerColor(cc.color(222,222,222,80));
        this.bgLayer.attr({

        });

        this.fontLabel = new cc.LabelTTF('您好啊','ten',30);
        this.fontLabel.attr({
            x: size.width >> 1,
            y: size.height >> 1

        });
        this.bgLayer.addChild(this.fontLabel,1);
        this.addChild(this.bgLayer);
    }
});

var TestScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new TestLayer();
        this.addChild(layer);
    }
});