/**
 * Created by adin on 10/9/15
 * email: phpgege@163.com
 */
cc.game.onStart = function(){
    // 禁用全屏
    cc.view.enableAutoFullScreen(false);

    //if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
    //    document.body.removeChild(document.getElementById("cocosLoading"));

    var designSize = cc.size(480, 320);
    //var screenSize = cc.view.getFrameSize();

    // if(!cc.sys.isNative && screenSize.height < 800){
    //     designSize = cc.size(320, 480);
    //     cc.loader.resPath = "res/Normal";
    // }else{
    //     cc.loader.resPath = "res/HD";
    // }

    cc.loader.resPath = "res/sushi";
    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);

    

    // cc.log(g_resources)
    //load resources
    cc.LoaderScene.preload(g_resources, function () {        
        cc.director.runScene(new StartScene());
    }, this);
};
cc.game.run();