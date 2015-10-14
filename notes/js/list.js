/**
 * Created by adin on 10/14/15
 * email: phpgege@163.com
 */
var ListLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        var size = cc.winSize;

        this.bgLayer = new cc.LayerColor(cc.color(0,0,0));
        //this.bgLayer = new cc.LayerColor(cc.color(95,98,99));


        //this.listRow = new cc.LayerColor(cc.color(234,255,230),350,130);
        //this.listRow.attr({
        //    x: 32,
        //    y: size.height - 150
        //});
        //this.bgLayer.addChild(this.listRow);
        //
        //this.listRow2 = new cc.LayerColor(cc.color(234,255,230),350,130);
        //this.listRow2.attr({
        //    x: 32,
        //    y: size.height - 150 * 2
        //});
        //this.bgLayer.addChild(this.listRow2);
        //
        //this.listRow3 = new cc.LayerColor(cc.color(234,255,230),350,130);
        //this.listRow3.attr({
        //    x: 32,
        //    y: size.height - 150 * 3
        //});
        //this.bgLayer.addChild(this.listRow3);
        //
        //this.listRow4 = new cc.LayerColor(cc.color(234,255,230),350,130);
        //this.listRow4.attr({
        //    x: 32,
        //    y: size.height - 150 * 4
        //});
        //this.bgLayer.addChild(this.listRow4);
        //
        //this.listRow5 = new cc.LayerColor(cc.color(234,255,230),350,130);
        //this.listRow5.attr({
        //    x: 32,
        //    y: size.height - 150 * 5
        //});
        //this.bgLayer.addChild(this.listRow5);
        //
        //this.listRow6 = new cc.LayerColor(cc.color(234,255,230),350,130);
        //this.listRow6.attr({
        //    x: 32,
        //    y: size.height - 150 * 6
        //});
        //this.bgLayer.addChild(this.listRow6);

        //this.fontLabel = new cc.LabelTTF('您好啊','ten',30);
        //this.fontLabel.attr({
        //    x: size.width >> 1,
        //    y: size.height >> 1
        //
        //});
        //this.bgLayer.addChild(this.fontLabel,1);
        this.addChild(this.bgLayer);
    }
});

var ListScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new ListLayer();
        this.addChild(layer);
    }
});