/**
 * Created by adin on 10/23/15
 * email: phpgege@163.com
 */
window.onload = function(){
    cc.game.onStart = function(){

        cc.view.enableRetina(true);
        cc.view.enableAutoFullScreen(false);
        var designSize = cc.size(640, 1136);

        cc.loader.resPath = 'res';
        cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.SHOW_ALL);
        //cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.EXACT_FIT);

        //var screenSize = cc.view.getFrameSize();
        //alert(screenSize.width)
        //alert(screenSize.height)
        //alert(screenSize.width / screenSize.height)
        //console.log(screenSize)
        //if(screenSize.width > 414){

        //}else{
        //    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.EXACT_FIT);
        //    //cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.EXACT_FIT);
        //}

        //cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.SHOW_ALL);
        //cc.view.setResolutionPolicy(cc.ResolutionPolicy.NO_BORDER);

        cc.LoaderScene.preload(g_res, function () {
            //cc.director.runScene(new cc.TransitionSlideInR(1,new TestScene(),false));
            //cc.director.runScene(new cc.TransitionSlideInR(1,new ListScene(),false));
            //cc.director.runScene(new cc.TransitionSlideInR(1,new Step1Scene(),false));
            cc.director.runScene(new cc.TransitionSlideInR(1,new IndexScene(),false));
        }, this);
    };
    cc.game.run("gameCanvas");
};