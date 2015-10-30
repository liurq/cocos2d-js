/**
 * Created by adin on 10/27/15
 * email: phpgege@163.com
 * 摇一摇首页
 */
var IndexScene = cc.Scene.extend({
    size: null,
    nextSprite: null,
    selectNum: 0,
    onEnter: function () {
        this._super();
        var size = this.size = cc.winSize;
        var bg = new cc.Sprite(res.listBg);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(bg, -1);
        this.audio();
        // 添加红心
        this.addRedHeart();
        // 添加心信息提示
        this.addRedInfo();
        // 主界面
        this.main();
        // 摇出的奖品
        this.popPrize();
        // 查看列表
        this.goList();

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
    // 添加红心
    addRedHeart: function () {
        var redNum = 3; // 有3个红心
        var graySprite = null, redSprite = null,
            graySize, redBgSize;
        var redBgSprite = new cc.Sprite(res.indexRedBg);
        redBgSize = redBgSprite.getContentSize();
        redBgSprite.attr({
            x: this.size.width / 2,
            y: this.size.height - 185
        });

        for (var i = 0; i < 5; i += 1) {
            graySprite = new cc.Sprite(res.indexGrayHeart);
            redSprite = new cc.Sprite(res.indexRedHeart);
            !graySize && (graySize = graySprite.getContentSize());
            graySprite.attr({
                x: 30 + graySize.width / 2 + i * (graySize.width + 20),
                y: redBgSize.height / 2
            });
            redSprite.attr({
                x: graySize.width / 2,
                y: graySize.height / 2
            });
            if (i < redNum) {
                redSprite.setOpacity(255);
            } else {
                redSprite.setOpacity(0);
            }
            graySprite.addChild(redSprite);
            redBgSprite.addChild(graySprite);
        }

        // 添加红心的按钮
        var RedButtonSprite = new cc.Sprite(res.indexAddRedButton);
        RedButtonSprite.attr({
            x: redBgSize.width - 60,
            y: redBgSize.height / 2
        });
        redBgSprite.addChild(RedButtonSprite);

        this.addChild(redBgSprite);
    },
    // 添加心信息提示
    addRedInfo: function () {
        var info = {name: '兔子1，兔子1，兔子1', num: 3};
        var userNameLabel = new cc.LabelTTF(info.name, '', '26');
        userNameLabel.setColor(cc.color(255, 0, 0));
        var heartNumLabel = new cc.LabelTTF('为你增加了' + info.num + '颗心', '', '26');
        heartNumLabel.setColor(cc.color(20, 20, 20));

        userNameLabel.attr({
            x: 200,
            y: this.size.height - 270
        });
        heartNumLabel.attr({
            x: this.size.width - 200,
            y: this.size.height - 270
        });
        this.addChild(userNameLabel);
        this.addChild(heartNumLabel);


    },
    // 主界面
    main: function () {
        var mainSprite = new cc.Sprite(res.indexMain);
        mainSprite.attr({
            x: this.size.width / 2,
            y: this.size.height / 2
        });
        this.addChild(mainSprite);
    },
    // 摇出的奖品
    popPrize: function () {
        var prizeSprite = new cc.Sprite(res.indexPrizeInfo);
        prizeSprite.attr({
            x: this.size.width / 2,
            y: 240
        });
        this.addChild(prizeSprite);
    },
    // 查看列表
    goList: function () {
        var goLabel = new cc.LabelTTF('查看记录 >', '', 26);
        goLabel.setColor(cc.color(10, 10, 10));
        goLabel.attr({
            x: this.size.width / 2,
            y: 100
        });
        // 监听点击
        var goLabelListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    cc.director.runScene(new cc.TransitionSlideInR(1, new ListScene(), false));
                }
            }
        });
        cc.eventManager.addListener(goLabelListener, goLabel);
        this.addChild(goLabel);
    }

});