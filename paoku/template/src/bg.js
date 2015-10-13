var BgLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
		this.init();
	},
	init: function(){
		this._super();

		var winsize = cc.Director.getInstance().getWinSize();
		var centerPos = cc.p(winsize.width >> 1, winsize.height >> 1);
		var spriteBg = new cc.Sprite(s_images.playBg);
		spriteBg.setPosition(centerPos);
		this.addChild(spriteBg);
	}
})