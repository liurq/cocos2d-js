/**
 * Created by adin on 10/13/15
 * email: phpgege@163.com
 */
var StatusLayer = cc.Layer.extend({
    labelCoin: null,
    labelMeter: null,
    coins: 0,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();

        var size = cc.winSize;
        this.labelCoin = new cc.LabelTTF('Coins: 0', '', 20);
        //this.labelCoin.setColor(cc.color(0,0,0));
        this.labelCoin.attr({
            x: 70,
            y: size.height - 20
        });

        this.labelMeter = new cc.LabelTTF('0M', '', 20);
        this.labelMeter.attr({
            x: size.width - 70,
            y: size.height - 20
        });
        this.addChild(this.labelCoin);
        this.addChild(this.labelMeter);
        //this.addChild(this.labelCoin);
    },
    addCoin: function (num) {
        this.coins += num;
        this.labelCoin.setString('Coins ' + this.coins);
    },
    updateMetter: function (px) {
        this.labelMeter.setString(parseInt(px / 10) + "M");
    }
});