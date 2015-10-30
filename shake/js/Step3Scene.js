/**
 * Created by adin on 10/28/15
 * email: phpgege@163.com
 * 第 3 步
 */
var Step3Scene = cc.Scene.extend({
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
        this.back();
        // 指示箭头 3
        this.indicate();
        // 文字说明
        this.readme();
        // 选择标签
        this.showTag();
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
                    cc.director.runScene(new cc.TransitionMoveInL(1,new Step2Scene(),false));
                }
            }
        });
        cc.eventManager.addListener(backSpriteListener, backSprite);

        this.addChild(backSprite);
    },
    // 指示箭头 3
    indicate: function () {
        var step = new cc.Sprite(res.step3Logo);
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
    // 文字说明
    readme: function () {
        var readmeSprite = new cc.Sprite(res.step3Readme);
        readmeSprite.attr({
            x: this.size.width / 2,
            y: this.size.height - 240
        });
        this.addChild(readmeSprite);
    },
    showTag: function () {
        var tagSprite, tagSpriteSize, tagBgSpriteLg, tagBgSpriteLgSize, scaleXVal, scaleYVal;
        var tags = [
            {x: 80, y: 230, res: 'step3Circle1'},
            {x: 220, y: 250, res: 'step3Circle2'},
            {x: 420, y: 230, res: 'step3Circle3'},
            {x: 60, y: 90, res: 'step3Circle4'},
            {x: 210, y: -70, res: 'step3Circle5'},
            {x: 290, y: 50, res: 'step3Circle6'},
            {x: 430, y: 0, res: 'step3Circle7'},
            {x: 70, y: -170, res: 'step3Circle8'},
            {x: 240, y: -200, res: 'step3Circle9'},
            {x: 390, y: -160, res: 'step3Circle10'}
        ];
        for (var i = 0, len = tags.length; i < len; i += 1) {
            tagSprite = new TagSprite(res[tags[i]['res']]);
            tagSpriteSize = tagSprite.getContentSize();
            tagBgSpriteLg = new cc.Sprite(res.step3CircleBg);
            !tagBgSpriteLgSize && (tagBgSpriteLgSize = tagBgSpriteLg.getContentSize());
            scaleXVal = (tagSpriteSize.width / tagBgSpriteLgSize.width).toFixed(2);
            scaleYVal = (tagSpriteSize.height / tagBgSpriteLgSize.height).toFixed(2);
            tagBgSpriteLg.runAction(new cc.scaleTo(0, scaleXVal, scaleYVal));
            tagBgSpriteLg.attr({
                x: 0,
                y: 0,
                anchorX: 0,
                anchorY: 0
            });
            tagBgSpriteLg.setOpacity(0);
            tagBgSpriteLg.setName('childBg');
            tagSprite.addChild(tagBgSpriteLg);

            tagSprite.attr({
                x: tagSpriteSize.width / 2 + tags[i]['x'],
                y: this.size.height / 2 - tagSpriteSize.height / 2 + tags[i]['y']
            });
            this.addChild(tagSprite);
        }
    },
    // 下一步
    nextImg: function () {

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
            y: 130
        });

        var nextDisabledListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    // 如果选中的话，则进行下一步
                    if(target.getParent().nextSprite.getOpacity() === 255){
                        cc.director.runScene(new cc.TransitionProgressRadialCCW(1,new IndexScene(),false));
                    }
                }
            }
        });
        cc.eventManager.addListener(nextDisabledListener, nextDisabledSprite);

        nextDisabledSprite.addChild(nextSprite);
        this.addChild(nextDisabledSprite);
    }


});