var PlayScene = cc.Scene.extend({
	onEnter: function(){
		this._super();

		this.addChild(new BgLayer());
		// this.addChild(new AnimationLayer());
		// this.addChild(new StatusLayer());
	}
});