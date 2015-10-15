/**
 * Created by adin on 10/15/15
 * email: phpgege@163.com
 */
 var StatusLayer = cc.Layer.extend({
 	coins: 0,
 	ctor: function(){
 		this._super();
 		this.init();
 	},
 	init: function(){
 		this._super();

 		var size = cc.winSize;
 		this.labelCoin = new cc.LabelTTF('0 朵','',30);
 		this.labelCoin.attr({
 			x: size.width - 100,
 			y: size.height - 30
 		});
 		this.addChild(this.labelCoin);
 	},
 	addCoin: function(num){
 		this.coins += num;
 		this.labelCoin.setString(this.coins + ' 朵');
 	}
 });