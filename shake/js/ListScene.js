/**
 * Created by adin on 10/23/15
 * email: phpgege@163.com
 */
var ListLayer = cc.Layer.extend({
    _checked: false,
    _lightSprite: null,
    _darkSprite: null,
    rodSprite: null,
    _index: -1,
    scrollFriend: null, // 魅友滚动层
    scrollHeart: null, // 加心滚动层
    scrollPrize: null, // 奖品滚动层
    friendLayer: null, // 魅友层
    heartLayer: null, // 加心层
    prizeLayer: null, // 奖品层
    bg: null,
    size: null,
    ctor: function () {
        this._super();
        var size = this.size = cc.winSize;
        this.bg = new cc.Sprite(res.listBg);
        this.bg.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.audio();
        this.back();
        this.menu();
        this.friendLayer();
        this.heartLayer();
        this.prizeLayer();

        //this.aa = new cc.LayerColor(cc.color(255,255,255,0));
        //this.addChild(this.aa);

        //cc.log(cc.director.setClearColor())
        //this.setColor(cc.color(255,0,0,100));
        //this.initWithBackgroundColor(cc.color(255,0,0,100));
        //this.setBackGroundColor(cc.color(255,0,0));

        //var draw = new cc.DrawNode();
        //for( var i=0; i < 1; i++) {
        //    draw.drawDot( cc.p(winSize.width/2, winSize.height/2), 100,
        //        cc.color( Math.random()*255, Math.random()*255, Math.random()*255, 255) );
        //}
        //this.addChild(draw, 10111);
        this.addChild(this.bg, -1);
    },
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
                    cc.director.runScene(new cc.TransitionMoveInL(1,new IndexScene(),false));
                }
            }
        });
        cc.eventManager.addListener(backSpriteListener, backSprite);

        this.addChild(backSprite);
    },
    menu: function () {
        var size = cc.winSize;
        var menuLayer = new cc.LayerColor(cc.color(0, 0, 0, 0), 562, 91);
        menuLayer.attr({
            x: 39,
            y: size.height - 196
        });

        var imgs = [
            {normal: 'list1Normal.png', active: 'list1Active.png', layer: 'friendLayer'},
            {normal: 'list2Normal.png', active: 'list2Active.png', layer: 'heartLayer'},
            {normal: 'list3Normal.png', active: 'list3Active.png', layer: 'prizeLayer'}
        ];
        new tabLayer(imgs, menuLayer, this);
        this.addChild(menuLayer);
        return true;
    },
    friendLayer: function () {
        var size = cc.winSize;
        var friendLayer = this.friendLayer = new cc.LayerColor(cc.color(200, 0, 0, 0), 562, 900);
        var mainSize = friendLayer.getContentSize();
        friendLayer.attr({
            x: 39,
            y: size.height - mainSize.height - 235
        });
        this.scrollFriend = new ccui.ScrollView();
        this.scrollFriend.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollFriend.setTouchEnabled(true);
        this.scrollFriend.setContentSize(cc.size(562, 900));
        this.scrollFriend.attr({
            x: 0,
            y: 0
        });

        var innerWidth = this.scrollFriend.width;
        var innerHeight = this.scrollFriend.height * 2;
        this.scrollFriend.setInnerContainerSize(cc.size(innerWidth, innerHeight));
        this.addFriendItem(this.scrollFriend.getInnerContainerSize());

        friendLayer.addChild(this.scrollFriend);
        this.addChild(friendLayer);

        /**
         * ajax返回的数据
         * [{id: 1},{id:2},{id: 3}]
         */
    },
    heartLayer: function () {
        var heartLayer = this.heartLayer = new cc.LayerColor(cc.color(255, 0, 0, 0), 562, 800);
        heartLayer.attr({
            x: 39,
            y: 100
        });
        var heartLayerSize = heartLayer.getContentSize();
        heartLayer.setVisible(false);

        this.scrollHeart = new ccui.ScrollView();
        this.scrollHeart.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollHeart.setTouchEnabled(true);
        this.scrollHeart.setContentSize(cc.size(562, 690));
        this.scrollHeart.attr({
            x: 0,
            y: 110
        });

        var innerWidth = this.scrollHeart.width;
        var innerHeight = this.scrollHeart.height * 2;
        this.scrollHeart.setInnerContainerSize(cc.size(innerWidth, innerHeight));
        heartLayer.addChild(this.scrollHeart);
        this.addheart(this.scrollHeart.getInnerContainerSize());
        this.addChild(heartLayer);
    },
    prizeLayer: function () {
        var size = cc.winSize;
        var prizeLayer = this.prizeLayer = new cc.LayerColor(cc.color(0, 255, 0, 0), 562, 900);
        var prizeLayerSize = prizeLayer.getContentSize();
        prizeLayer.attr({
            x: 39,
            y: size.height - prizeLayerSize.height - 235
        });
        prizeLayer.setVisible(false);

        this.scrollPrize = new ccui.ScrollView();
        this.scrollPrize.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollPrize.setTouchEnabled(true);
        this.scrollPrize.setContentSize(cc.size(562, 900));
        this.scrollPrize.attr({
            x: 0,
            y: 0
        });

        var innerWidth = this.scrollPrize.width;
        var innerHeight = this.scrollPrize.height + 200;
        this.scrollPrize.setInnerContainerSize(cc.size(innerWidth, innerHeight));
        prizeLayer.addChild(this.scrollPrize);
        this.addPrizeLayer(this.scrollPrize.getInnerContainerSize());
        this.addChild(prizeLayer, 1021);
    },

    // 全部隐藏，显示要的一个
    slideShow: function (layer) {
        var arr = ['friendLayer', 'heartLayer', 'prizeLayer'];
        for (var i = 0, len = arr.length; i < len; i += 1) {
            if (arr[i] == layer) {
                this[arr[i]].setVisible(true);
            } else {
                this[arr[i]].setVisible(false);
            }
        }
    },

    // 页面： 魅友
    addFriendItem: function (innerSize) {
        var that = this;
        var itemLayerArr = [], itemLayer = null, headImg = null,
            itemLayerSize, headImgSize, nameLabelSize, smLabelSize,
            nameLabel = null, mainLabel = null, smLabel = null, tagTTF = null;

        // 向后台请求魅友数据
        //new cc.ajax({url: '1.html',type:'POST',success: function (data) {
        //    cc.log(data)
        //}});

        var friends = [
            {img: 'http://10.2.70.8/game/git/shake/res/test.jpg', name: '我不是兔子1', tag: ['轻音乐', '爱旅行', '美食家']},
            {img: 'http://10.2.70.8/game/git/shake/res/test.jpg', name: '我不是兔子2', tag: ['轻音乐', '爱旅行', '美食家']},
            {img: 'http://10.2.70.8/game/git/shake/res/test.jpg', name: '我不是兔子3', tag: ['轻音乐', '爱旅行', '美食家', '天然萌']},
            {img: 'http://10.2.70.8/game/git/shake/res/test.jpg', name: '我不是兔子4', tag: ['轻音乐', '爱旅行', '美食家']},
            {img: 'http://10.2.70.8/game/git/shake/res/test.jpg', name: '我不是兔子5', tag: ['轻音乐', '爱旅行', '美食家']},
            {img: 'http://10.2.70.8/game/git/shake/res/test.jpg', name: '我不是兔子6', tag: ['轻音乐', '爱旅行', '美食家']}
        ];
        for (var i = 0, len = friends.length; i < len; i += 1) {
            itemLayer = new FriendItemSprite(res.listItemBg1);
            itemLayerArr.push(itemLayer);
            !itemLayerSize && (itemLayerSize = itemLayer.getContentSize());



            // 加载图片
            (function () {
                var j = i;
                cc.loader.loadImg(friends[j]['img'], {isCrossOrigin: false}, function (err, img) {
                    if (img) {
                        var texture = new cc.Texture2D();
                        texture.initWithElement(img);
                        texture.handleLoadedTexture();
                        headImg = new cc.Sprite(texture);
                        headImgSize = headImg.getContentSize();
                        headImg.attr({
                            x: 0,
                            y: 0
                        });
                        headImg.runAction(new cc.scaleTo(0, 100 / headImgSize.width, 100 / headImgSize.height));

                        if(!cc._renderType == cc._RENDER_TYPE_WEBGL){
                            // 裁剪个圆
                            var drawNode = new DrawNode();
                            drawNode.fillCircle(cc.p(0,0),50);

                            var clipNode = new cc.ClippingNode(drawNode);
                            clipNode.attr({
                                x: 70,
                                y: 78
                            });
                            clipNode.addChild(headImg);
                            itemLayerArr[j].addChild(clipNode);
                        }else{
                            headImg.attr({
                                x: 70,
                                y: 78
                            });
                            itemLayerArr[j].addChild(headImg);
                        }
                    }
                });
            })();
            //new cc.ClippingNode();


            // 名字
            nameLabel = new cc.LabelTTF(friends[i]['name'], '', '26');
            nameLabelSize = nameLabel.getContentSize();
            nameLabel.setColor(cc.color(0, 0, 0));
            nameLabel.attr({
                x: 210,
                y: itemLayerSize.height - nameLabelSize.height / 2 - 28
            });
            itemLayer.addChild(nameLabel);

            // 标签
            mainLabel = new cc.LayerColor(cc.color(255, 0, 0, 0), 400, 50);
            var mainLabelSize = mainLabel.getContentSize();
            mainLabel.attr({
                x: 140,
                y: itemLayerSize.height - 115
            });

            //tag
            for (var k = 0, kLen = friends[i]['tag'].length; k < kLen; k += 1) {
                smLabel = new cc.Sprite(res.labelYellow);
                !smLabelSize && (smLabelSize = smLabel.getContentSize());
                tagTTF = new cc.LabelTTF(friends[i]['tag'][k], '', 20);
                tagTTF.setColor(cc.color(0, 0, 0));
                tagTTF.attr({
                    x: smLabelSize.width / 2,
                    y: smLabelSize.height / 2
                });
                smLabel.attr({
                    x: smLabelSize.width / 2 + k * (smLabelSize.width + 5),
                    y: mainLabelSize.height / 2
                });
                smLabel.addChild(tagTTF);
                mainLabel.addChild(smLabel);
            }
            itemLayer.addChild(mainLabel);
            itemLayer.attr({
                x: innerSize.width / 2,
                y: innerSize.height - itemLayerSize.height / 2 - (itemLayerSize.height + 10) * i
            });

            this.scrollFriend.addChild(itemLayer);
        }
    },
    // 页面： 加心
    addheart: function (scrollHeartSize) {

        // 创建加心记录
        this.addHeartList(scrollHeartSize);

        var addRedHeartSprite = new cc.Sprite(res.addRedHeart);
        var addRedHeartSpriteSize = addRedHeartSprite.getContentSize();
        addRedHeartSprite.attr({
            x: scrollHeartSize.width / 2,
            y: addRedHeartSpriteSize.height / 2
        });

        this.heartLayer.addChild(addRedHeartSprite);
    },

    // 页面： 奖品
    addPrizeLayer: function (scrollPrizeSize) {
        // 卡片背景层
        var cardSprite = new cc.Sprite(res.list3CardBg);
        var cardSpriteSize = cardSprite.getContentSize();
        cardSprite.attr({
            x: scrollPrizeSize.width / 2,
            y: scrollPrizeSize.height - cardSpriteSize.height / 2
        });

        // 卡片上文字说明
        var label2 = new cc.LabelTTF('集齐卡牌即可兑换魅族手机一部', '', '20');
        var label2Size = label2.getContentSize();
        label2.setColor(cc.color(10, 10, 10));
        label2.attr({
            x: label2Size.width / 2 + 41,
            y: cardSpriteSize.height - 60 + label2Size.height / 2
        });

        cardSprite.addChild(label2);
        // 添加卡片
        this.addCardSprites(cardSprite);
        // 添加奖品列表
        this.addPrizeListSprite(scrollPrizeSize);
        // 放在奖品层中
        this.scrollPrize.addChild(cardSprite);
    },

    // 创建卡片
    addCardSprites: function (cardSpriteParent) {
        var cardSprite = null, cardSize;
        var cards = [
            {res: 'cardBack', resActive: 'cardMActive', active: true},
            {res: 'cardBack', resActive: 'cardEActive', active: true},
            {res: 'cardBack', resActive: 'cardIActive', active: true},
            {res: 'cardBack', resActive: 'cardZActive', active: true},
            {res: 'cardBack', resActive: 'cardUActive', active: true}
        ];
        for (var i = 0; i < 5; i += 1) {
            if (cards[i].active) {
                cardSprite = new CardLayerSprite(res[cards[i]['resActive']]);
            } else {
                cardSprite = new CardLayerSprite(res[cards[i]['res']]);
            }
            cardSize = cardSprite.getContentSize();
            cardSprite.attr({
                x: cardSize.width / 2 + 26 + i * (cardSize.width + 5),
                y: cardSize.height / 2 + 35
            });
            cardSpriteParent.addChild(cardSprite);
        }
    },

    // 创建奖品列表
    addPrizeListSprite: function (scrollPrizeSize) {
        var itemSprite = null, itemIcon = null, label = null, itemSpriteSize, labelSize;
        var prizeLists = [
            {
                res: 'list3ItemBg',
                resActive: 'list3ItemBgActive',
                icon: 'list3MIcon',
                iconActive: 'list3MIconActive',
                text: 'M码',
                active: true
            },
            {
                res: 'list3ItemBg',
                resActive: 'list3ItemBgActive',
                icon: 'list3FIcon',
                iconActive: 'list3FIconActive',
                text: 'Flyme消费券',
                active: true
            },
            {
                res: 'list3ItemBg',
                resActive: 'list3ItemBgActive',
                icon: 'list3PIcon',
                iconActive: 'list3PIconActive',
                text: '移动电源',
                active: true
            },
            {
                res: 'list3ItemBg',
                resActive: 'list3ItemBgActive',
                icon: 'list3GIcon',
                iconActive: 'list3GIconActive',
                text: '精美礼品套装',
                active: true
            }
        ];
        for (var i = 0; i < 4; i += 1) {
            if (prizeLists[i]['active']) {
                // 点亮
                itemSprite = new PriZeListSprite(res[prizeLists[i]['resActive']]);
                itemIcon = new cc.Sprite(res[prizeLists[i]['iconActive']])
                label = new cc.LabelTTF(prizeLists[i]['text'], '', '35');
                label.setColor(cc.color(10, 10, 10));
            } else {
                // 默认
                itemSprite = new PriZeListSprite(res[prizeLists[i]['res']]);
                itemIcon = new cc.Sprite(res[prizeLists[i]['icon']])
                label = new cc.LabelTTF(prizeLists[i]['text'], '', '35');
                label.setColor(cc.color(160, 160, 160));
            }
            labelSize = label.getContentSize();
            itemSpriteSize = itemSprite.getContentSize();
            itemSprite.attr({
                x: scrollPrizeSize.width / 2,
                y: scrollPrizeSize.height - (itemSpriteSize.height + 10) * i - 261 - itemSpriteSize.height / 2
            });

            itemIcon.attr({
                x: 90,
                y: itemSpriteSize.height / 2
            });

            label.attr({
                x: 155 + labelSize.width / 2,
                y: itemSpriteSize.height / 2
            });
            itemSprite.addChild(itemIcon);
            itemSprite.addChild(label);
            this.scrollPrize.addChild(itemSprite);
        }
        // 说明文字
        var readmeLabel = new cc.LabelTTF('奖品会在活动结束后由魅友家统一通知发放。如果你还没有关注魅友家公众号，  ', '', 25);
        //console.log(readmeLabel.getContentSize().width - 562)
        var readmeLabelSize = readmeLabel.getContentSize();
        var readmeLink = new cc.LabelTTF('点击这里 >', '', 25);
        var readmeLinkSize = readmeLink.getContentSize();
        readmeLabel.attr({
            x: scrollPrizeSize.width / 2,
            y: 140
        });

        readmeLabel.boundingWidth = 500;
        readmeLabel.height = 40;
        readmeLabel.setColor(cc.color(51, 51, 51));
        readmeLink.setColor(cc.color(0, 146, 190));
        readmeLink.attr({
            x: readmeLinkSize.width / 2 + readmeLabelSize.width - readmeLabel.boundingWidth + 20,
            y: 125
        });
        this.scrollPrize.addChild(readmeLabel);
        this.scrollPrize.addChild(readmeLink);
    },

    // 创建加心记录
    addHeartList: function (scrollHeartSize) {
        var heartSprite = null, redHeartSprite = null, heartSpriteSize;
        var hearts = [
            {name: '我是兔子1'},
            {name: '我是兔子2'},
            {name: '我是兔子3'},
            {name: '我是兔子4'},
            {name: '我是兔子5'},
            {name: '我是兔子6'},
            {name: '我是兔子7'},
            {name: '我是兔子8'},
            {name: '我是兔子9'},
            {name: '我是兔子10'},
            {name: '我是兔子11'},
            {name: '我是兔子12'}
        ];
        for (var i = 0, len = hearts.length; i < len; i += 1) {
            // 底层背景
            heartSprite = new cc.Sprite(res.list2ItemBg);
            !heartSpriteSize && (heartSpriteSize = heartSprite.getContentSize());
            heartSprite.attr({
                x: heartSpriteSize.width / 2,
                y: scrollHeartSize.height - heartSpriteSize.height / 2 - i * (heartSpriteSize.height + 10)
            });
            // 红心
            redHeartSprite = new cc.Sprite(res.redHeart);
            redHeartSprite.attr({
                x: 35,
                y: heartSpriteSize.height / 2
            });

            // 名字
            var nameLabel = new cc.LabelTTF(hearts[i]['name'], '', '30');
            nameLabel.setColor(cc.color(0, 0, 0));
            nameLabel.attr({
                x: 130,
                y: heartSpriteSize.height / 2
            });

            // 说明
            var statelabel = new cc.LabelTTF('进入活动页面为你加一颗心~', '', '23');
            statelabel.setColor(cc.color(70, 70, 70));
            statelabel.attr({
                x: 375,
                y: heartSpriteSize.height / 2
            });

            heartSprite.addChild(redHeartSprite);
            heartSprite.addChild(nameLabel);
            heartSprite.addChild(statelabel);
            this.scrollHeart.addChild(heartSprite);
        }

    }
});

var tabLayer = cc.Layer.extend({
    /**
     * 我要调用一个精灵选项卡
     * 参数： 图片 对应的层  最外的层
     * [{normal:'',active: '',layer: ''}]
     */
    tabArr: [],
    ctor: function (imgs, parentLayer, that) {
        this._super();
        this.that = that;
        var parentLayerSize = parentLayer.getContentSize();
        var len = imgs.length;
        for (var i = 0; i < len; i += 1) {
            var box = new ccui.CheckBox(imgs[i].normal, imgs[i].active);
            box.name = imgs[i].layer;

            var boxSize = box.getContentSize();
            box.attr({
                x: i * parentLayerSize.width * .5 + (boxSize.width * .5 * ( 1 - i)),
                y: parentLayerSize.height * .5
            });
            if (i == 0) {
                box.setSelected(true);
            }
            box.addEventListener(this.selectedStateEvent, this);
            this.tabArr.push(box);
            parentLayer.addChild(box);
        }
    },
    selectedStateEvent: function (sender, type) {
        for (var i = 0, len = this.tabArr.length; i < len; i += 1) {
            this.tabArr[i].setSelected(false);
        }

        this.that.slideShow(sender.name);
        sender.setSelected(true);
    }
});
var ListScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new ListLayer();
        this.addChild(layer);
    }
});