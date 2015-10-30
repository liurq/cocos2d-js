/**
 * Created by adin on 10/28/15
 * email: phpgege@163.com
 * 第 1 步
 */
var Step1Scene = cc.Scene.extend({
    size: null,
    contentSize: null,
    codeSprite: null,
    codeSpriteTrue: null,
    opacityLayer: null,
    onEnter: function () {
        this._super();
        var size = this.size = cc.winSize;
        var contentSize = this.contentSize = this.getContentSize();
        var bg = new cc.Sprite(res.listBg);
        bg.attr({
            x: contentSize.width / 2,
            y: contentSize.height / 2
        });
        this.audio();
        // 指示箭头 1
        this.indicate();
        // 监听上传文件
        this.addListenerFileUpload();
        // 文字说明
        this.readme();
        // 二维码
        this.code();
        // 二维码下面
        this.codeBottom();
        // 选择图片
        this.selectImg();
        // 找不到二维码名片
        this.help();
        this.addChild(bg, -1);
        this.schedule(this.codeAction);
        this.helpPage();

    },
    addListenerFileUpload: function(){
        document.getElementById('fileId') && document.getElementById('fileId').addEventListener('change',function(){
            new cc.fileUpload(this.files,'http://10.2.70.8/index.php',function(data){
                //alert('已写好，还未测试');
                //cc.log(data)
                cc.director.runScene(new cc.TransitionMoveInR(1,new Step2Scene(),false));
            });
            //cc.director.runScene(new cc.TransitionMoveInR(1,new Step3Scene(),false));
        },false);
    },
    // 音频
    audio: function () {
        var bgSize = this.getContentSize();
        // 杆
        var rodSprite = this.rodSprite = new cc.Sprite(res.rod);
        var rodSpriteSize = rodSprite.getContentSize();
        rodSprite.attr({
            x: bgSize.width - rodSprite.width - 30,
            y: bgSize.height - rodSpriteSize.height,
            anchorX: 0,
            anchorY: 1,
            ignoreAnchor: true
        });

        // 唱片
        var audioSprite = new AudioSprite(res.audio);
        var audioSpriteSize = audioSprite.getContentSize();

        audioSprite.attr({
            x: bgSize.width - audioSpriteSize.width / 2 - 20,
            y: bgSize.height - audioSpriteSize.height / 2 - 20
        });

        this.addChild(rodSprite, 11);
        this.addChild(audioSprite, 10);
    },
    // 指示箭头 1
    indicate: function () {
        var step = new cc.Sprite(res.step1Logo);
        var stepSize = step.getContentSize();
        step.attr({
            x: stepSize.width / 2 + 40,
            y: this.contentSize.height - stepSize.height / 2 - 108
        });
        var action = new cc.moveBy(.8, 0, 20);
        var actionBack = action.reverse();
        step.runAction(cc.sequence(action, actionBack).repeatForever());
        //step.runAction(action2);
        this.addChild(step);
    },
    // 文字说明
    readme: function () {
        var readmeSprite = new cc.Sprite(res.step1Readme);
        readmeSprite.attr({
            x: this.contentSize.width / 2,
            y: this.contentSize.height - 240
        });
        this.addChild(readmeSprite);
    },
    code: function () {
        var codeSprite = this.codeSprite = new cc.Sprite(res.step1Code, cc.rect(0, 0, 335, 0));
        //cc.log(codeSprite.height);
        codeSprite.attr({
            x: this.contentSize.width / 2,
            y: 427,
            anchorY: 1
        });

        this.codeSpriteTrue = codeSprite.getTextureRect();

        // 862 762   427
        this.addChild(codeSprite, 2);
    },
    // 二维码下面的
    codeBottom: function () {
        var codeBottomSprite = new cc.Sprite(res.step1CodeBottom);
        codeBottomSprite.attr({
            x: this.contentSize.width / 2,
            y: 394
        });
        this.addChild(codeBottomSprite);
    },
    // 选择图片
    selectImg: function () {
        var selectImgSprite = new cc.Sprite(res.step1Button);
        selectImgSprite.attr({
            x: this.contentSize.width / 2,
            y: 253
        });

        var selectImgListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    //target.helpPage();
                    //alert('弹出选择图片');
                    //document.getElementById('fileId').click();
                    cc.director.runScene(new cc.TransitionMoveInR(1,new Step2Scene(),false));
                }
            }
        });
        cc.eventManager.addListener(selectImgListener, selectImgSprite);

        this.addChild(selectImgSprite);
    },
    // 找不到二维码名片
    help: function () {
        var helpSprite = new cc.Sprite(res.step1Text);
        helpSprite.attr({
            x: this.contentSize.width / 2,
            y: 140
        });
        var that = this;
        var helpListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    //target.helpPage();
                    that.opacityLayer.setVisible(true);
                }
            }
        });
        cc.eventManager.addListener(helpListener, helpSprite);
        this.addChild(helpSprite);
    },
    codeAction: function () {
        var speed = 2;
        if (this.codeSprite.y <= 762) {
            this.codeSpriteTrue.height += speed
        }
        if (this.codeSprite.y >= 862) {
            this.codeSprite.y = 427;
            this.codeSpriteTrue.height = 0;
        }
        //
        this.codeSprite.setTextureRect(this.codeSpriteTrue, this.codeSprite.isTextureRectRotated());
        this.codeSprite.y += speed;
    },
    helpPage: function () {
        var that = this;
        var opacityLayer = this.opacityLayer = new cc.LayerColor(cc.color(0, 0, 0, 235));
        var helpLayer = new cc.LayerColor(cc.color(255,0,0,0),581,1200);
        helpLayer.attr({
            x: this.size.width / 2,
            y: this.size.height / 2,
            anchorX:.5,
            anchorY:.5,
            ignoreAnchor: false
        });

        opacityLayer.addChild(helpLayer);

        var scrollHelp = new ccui.ScrollView();
        scrollHelp.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollHelp.setTouchEnabled(true);
        scrollHelp.setContentSize(cc.size(581, 1200));
        scrollHelp.attr({
            x: 0,
            y: 0
        });

        var innerWidth = scrollHelp.width;
        var innerHeight = 3000;
        scrollHelp.setInnerContainerSize(cc.size(innerWidth, innerHeight));
        helpLayer.addChild(scrollHelp);

        var helpImgSprite = new cc.Sprite(res.help);
        var helpImgSpriteSize = helpImgSprite.getContentSize();
        helpImgSprite.attr({
            x: scrollHelp.getInnerContainerSize().width / 2,
            y: scrollHelp.getInnerContainerSize().height - helpImgSpriteSize.height / 2 - 100
        });
        scrollHelp.addChild(helpImgSprite);
        opacityLayer.setVisible(false);


        // 监听透明层
        var opacityLayerListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    //target.helpPage();
                    that.opacityLayer.setVisible(false);
                }
            }
        });
        cc.eventManager.addListener(opacityLayerListener, opacityLayer);

        this.addChild(opacityLayer, 101);
    }
});