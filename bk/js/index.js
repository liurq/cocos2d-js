/**
 * Created by adin on 10/14/15
 * email: phpgege@163.com
 */

var indexLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        //this.eachLayer();
        //this.addTouchEventListenser();

        // 添加个背景
        this.bg = new cc.LayerColor(cc.color(95,98,99));
        this.addChild(this.bg);
        this.addBook();
    },
    addBook: function () {
        var size = cc.winSize;
        var width = 162,height = 190;
        for(var i = 0; i < 6; i += 1){
            this['book'+i] = new BookSprite(g_images.book);
            var x,y;
            if(i < 3){
                x = (width >> 1) + 30;
                y = size.height + (height >> 1) - (height + 30) * (i + 1);
            }else{
                x = size.width - ((width >> 1) + 30);
                y = size.height + (height >> 1) - (height + 30) * (i-2);
            }
            this['book'+i].attr({
                x: x,
                y: y
            });
            this.addChild(this['book'+i]);
        }

        //var book = new BookSprite(g_images.book);
        //var size = cc.winSize;
        //book.attr({
        //    x: size.width >> 1,
        //    y: size.height >> 1
        //});
        //this.addChild(book);
    },
    eachLayer: function () {
        this.touchListenner = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch,event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if(cc.rectContainsPoint(target.getBoundingBox(),pos)){
                    cc.log('touched');
                    return true;
                }
                return false;
            }
        });

        var size = cc.winSize;
        var width = 162,height = 190;
        for(var i = 0;i < 6; i += 1){
            this['testLayer'+i] = new cc.LayerColor(cc.color(200,200,200),width,height);
            var x,y;
            if(i < 3){
                x = 30;
                y = size.height - (height + 30) * (i+1);
            }else{
                x = size.width - (width + 30);
                y = size.height - (height + 30) * (i-2);
            }
            this['testLayer'+i].attr({
                x: x,
                y: y
            });
            cc.eventManager.addListener(this.touchListenner,this['testLayer'+i])
            this.addChild(this['testLayer'+i]);
        }
    },
    addTouchEventListenser: function () {
        this.touchListenner = cc.EventListener.create({
           event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch,event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if(cc.rectContainsPoint(target.getBoundingBox(),pos)){
                    cc.log('touched');
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListenner,this)
    }
});

var indexScene = cc.Scene.extend({
   onEnter: function () {
       this._super();
       var layer = new indexLayer();
       this.addChild(layer);
   } 
});