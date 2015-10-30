/**
 * Created by adin on 10/30/15
 * email: phpgege@163.com
 */

cc.LoaderScene = cc.Scene.extend({
    _interval : null,
    _label : null,
    _className:"LoaderScene",
    cb: null,
    target: null,
    /**
     * Contructor of cc.LoaderScene
     * @returns {boolean}
     */
    init : function(){
        var self = this;
        //logo
        var logoWidth = 160;
        var logoHeight = 200;

        // bg
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(32, 32, 32, 255));
        self.addChild(bgLayer, 0);

        //image move to CCSceneFile.js
        var fontSize = 24, lblHeight =  -logoHeight / 2 + 100;
        if(cc._loaderImage){
            //loading logo
            cc.loader.loadImg(cc._loaderImage, {isCrossOrigin : false }, function(err, img){
                logoWidth = img.width;
                logoHeight = img.height;
                self._initStage(img, cc.visibleRect.center);
            });
            fontSize = 14;
            lblHeight = -logoHeight / 2 - 10;
        }
        //loading percent
        var label = self._label = new cc.LabelTTF("加载中... 0%", "Arial", fontSize);
        label.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, lblHeight)));
        label.setColor(cc.color(180, 180, 180));
        bgLayer.addChild(this._label, 10);
        return true;
    },

    _initStage: function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logo = self._logo = new cc.Sprite(texture2d);
        logo.setScale(cc.contentScaleFactor());
        logo.x = centerPos.x;
        logo.y = centerPos.y;
        self._bgLayer.addChild(logo, 10);
    },
    /**
     * custom onEnter
     */
    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },
    /**
     * custom onExit
     */
    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = "Loading... 0%";
        this._label.setString(tmpStr);
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     * @param {Object} target
     */
    initWithResources: function (resources, cb, target) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
        this.target = target;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                self._label.setString("加载中... " + percent + "%");
            }, function () {
                if (self.cb)
                    self.cb.call(self.target);
            });
    }
});
/**
 * <p>cc.LoaderScene.preload can present a loaderScene with download progress.</p>
 * <p>when all the resource are downloaded it will invoke call function</p>
 * @param resources
 * @param cb
 * @param target
 * @returns {cc.LoaderScene|*}
 * @example
 * //Example
 * cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new HelloWorldScene());
    }, this);
 */
cc.LoaderScene.preload = function(resources, cb, target){
    var _cc = cc;
    if(!_cc.loaderScene) {
        _cc.loaderScene = new cc.LoaderScene();
        _cc.loaderScene.init();
    }
    _cc.loaderScene.initWithResources(resources, cb, target);

    cc.director.runScene(_cc.loaderScene);
    return _cc.loaderScene;
};