/**
 * Created by adin on 10/30/15
 * email: phpgege@163.com
 */
var TestScene = cc.Scene.extend({
    containerLayer: null,
    size: null,
    ctor: function () {
        this._super();
        var size = this.size = cc.winSize;
        //var containerLayer = this.containerLayer = new cc.LayerColor(cc.color(0,0,0,200));
        //this.addChild(containerLayer);
        //this.sexLayer();

        var sprite = new cc.Sprite(res.indexInfoBgSex1);
        sprite.attr({
            x: size.width >> 1,
            y: size.height >> 1
        });

        var shape = new cc.DrawNode();
        shape.drawCircle(cc.p(size.width/2,size.height/2), 100, 0, 300, false, 100, cc.color(255, 255, 255, 255));

        //this.addChild(shape);return;
        var clipper = new cc.ClippingNode(shape);
        clipper.x = size.width / 2 - 300;
        clipper.y = size.height / 2 - 300;
        this.addChild(clipper);


        clipper.addChild(sprite);


    },
    sexLayer: function () {
        var sex=[1,2,3];
        var sexSprite = new cc.Sprite(res['indexInfoBgSex'+sex[0]]);
        sexSprite.attr({
            x: this.size.width / 2,
            y: this.size.height / 2
        });
        this.containerLayer.addChild(sexSprite);
    }
});