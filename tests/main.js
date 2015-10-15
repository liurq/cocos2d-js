/**
 * Created by adin on 10/12/15
 * email: phpgege@163.com
 */
cc.game.onStart = function () {
    cc.view.enableAutoFullScreen(false);
    var designSize = cc.size(414, 736);
    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.SHOW_ALL);
    //cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.NO_BORDER);
    var ROOT_PATH = 'res/weixin';
    cc.loader.resPath = ROOT_PATH;
    cc.loader.audioPath = ROOT_PATH + "/audios";
    cc.LoaderScene.preload(g_resources,function(){
        cc.director.runScene(new ListScene());
    },this);
};

cc.game.run();