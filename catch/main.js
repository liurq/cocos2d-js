/**
 * Created by adin on 10/9/15
 * email: phpgege@163.com
 */

cc.game.onStart = function(){
    cc.view.enableAutoFullScreen(false);

    var designSize = cc.size(414, 736);

    cc.loader.resPath = "res/weixin";
    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.NO_BORDER);
    cc.view.resizeWithBrowserSize(true);

    cc.LoaderScene.preload(g_res, function () {
        cc.director.runScene(new MainScene());
    }, this);
};
cc.game.run();