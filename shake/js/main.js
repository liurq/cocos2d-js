/**
 * Created by adin on 10/23/15
 * email: phpgege@163.com
 */
window.onload = function(){
    cc.game.onStart = function(){
        cc.view.enableAutoFullScreen(false);
        var designSize = cc.size(640, 1136);

        cc.loader.resPath = 'res';
        cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.SHOW_ALL);
        cc.view.resizeWithBrowserSize(true);

        //load resources
        cc.LoaderScene.preload(g_res, function () {
            var MyScene = cc.Scene.extend({
                onEnter:function () {
                    this._super();
                    var size = cc.winSize;
                    this.bg = new cc.Sprite(res.listBg);
                    this.bg.attr({
                        x: size.width >> 1,
                        y: size.height >> 1
                    });
                    this.addChild(this.bg);
                }
            });

            cc.director.runScene(new ListScene());
        }, this);
    };
    cc.game.run("gameCanvas");
};