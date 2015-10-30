/**
 * Created by adin on 10/28/15
 * email: phpgege@163.com
 * 第2步
 */
/**
 * Created by adin on 10/28/15
 * email: phpgege@163.com
 * 第 2 步
 */
var Step2Scene = cc.Scene.extend({
    size: null,
    nextSprite: null,
    lock: true,
    selectSprites: {},    // 列表
    selectSpritesName: null, // 列表单个名称
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
        this.back();
        // 指示箭头 3
        this.indicate();
        // 文字说明
        this.readme();
        // 选项
        this.selectSex();
        // 下一步
        this.nextImg();
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
    // 返回
    back: function () {
        var backSprite = new cc.Sprite(res.back);
        backSprite.attr({
            x: 56,
            y: this.size.height - 55
        });

        var backSpriteListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    cc.director.runScene(new cc.TransitionMoveInL(1,new Step1Scene(),false));
                }
            }
        });
        cc.eventManager.addListener(backSpriteListener, backSprite);

        this.addChild(backSprite);
    },
    // 指示箭头 2
    indicate: function () {
        var step = new cc.Sprite(res.step2Logo);
        var stepSize = step.getContentSize();
        step.attr({
            x: stepSize.width / 2 + 40,
            y: this.size.height - stepSize.height / 2 - 108
        });
        var action = new cc.moveBy(.8, 0, 20);
        var actionBack = action.reverse();
        step.runAction(cc.sequence(action, actionBack).repeatForever());
        this.addChild(step);
    },
    // 选项
    selectSex: function () {
        var sexSprite = null, sexActiveSprite = null, sexSize;
        var sexs = ['step2Sex2', 'step2Sex1', 'step2Sex3'];
        for (var i = 0, len = sexs.length; i < len; i += 1) {
            sexSprite = new SexSprite(res[sexs[i]]);
            sexSize = sexSprite.getContentSize();
            sexSprite.setName('sex' + i);
            this.selectSprites['sex' + i] = sexSprite;
            sexActiveSprite = new SexSprite(res[sexs[i] + 'Active']);
            sexSprite.attr({
                x: this.size.width / 2,
                y: this.size.height - 400 - i * 180
            });
            sexActiveSprite.attr({
                x: sexSize.width / 2,
                y: sexSize.height / 2
            });
            sexActiveSprite.setName('sex');
            sexActiveSprite.setOpacity(0);
            sexSprite.addChild(sexActiveSprite);
            this.addChild(sexSprite);
        }

    },

    // 文字说明
    readme: function () {
        var readmeSprite = new cc.Sprite(res.step2Readme);
        readmeSprite.attr({
            x: this.size.width / 2,
            y: this.size.height - 240
        });
        this.addChild(readmeSprite);
    },

    // 下一步
    nextImg: function () {

        var that = this;
        var nextDisabledSprite = new cc.Sprite(res.step3ButtonDisabled);
        var nextDisabledSize = nextDisabledSprite.getContentSize();
        var nextSprite = this.nextSprite = new cc.Sprite(res.step3Button);

        nextSprite.attr({
            x: nextDisabledSize.width / 2,
            y: nextDisabledSize.height / 2
        });
        nextSprite.setOpacity(0);
        nextDisabledSprite.attr({
            x: this.size.width / 2,
            y: 190
        });

        var nextDisabledListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    // 如果有选中一个的话，则进行下一步
                    if (that.selectSpritesName) {
                        cc.director.runScene(new cc.TransitionMoveInR(1, new Step3Scene(), false));
                    }
                }
            }
        });
        cc.eventManager.addListener(nextDisabledListener, nextDisabledSprite);

        nextDisabledSprite.addChild(nextSprite);
        this.addChild(nextDisabledSprite);
    }


});