/**
 * Created by adin on 10/12/15
 * email: phpgege@163.com
 */
cc.game.onStart = function () {
    cc.view.enableAutoFullScreen(false);

    var designSize = cc.size(480, 320);
    cc.loader.resPath = "res/image";
    cc.LoaderScene.preload(g_resources,function(){
        cc.log(123);
        console.log(456);
    },this);
};

cc.game.run();