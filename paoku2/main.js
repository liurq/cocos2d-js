/**
 * Created by adin on 10/12/15
 * email: phpgege@163.com
 */
cc.game.onStart = function () {
    cc.view.enableAutoFullScreen(false);
    var designSize = cc.size(480, 320);
    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.NO_BORDER);
    cc.view.resizeWithBrowserSize(true);

    cc.LoaderScene.preload(g_resources,function(){
        cc.director.runScene(new MenuScene());
    },this);
};

cc.game.run();