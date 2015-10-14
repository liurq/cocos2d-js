/**
 * Created by lingjianfeng on 15/1/29.
 */

var Direction = Direction || {};
Direction.UP    = cc.p( 0,  1);
Direction.LEFT  = cc.p( 1,  0);
Direction.DOWN  = cc.p( 0, -1);
Direction.RIGHT = cc.p(-1,  0);

var GameState = {};
GameState.READY     = 0;
GameState.PLAYING   = 1;
GameState.END       = 2;

var GamePlayLayer = cc.Layer.extend({
    _model          : -1,               // 模块
    _playMethod     : -1,               // 玩法
    _row            : 4,                // 行
    _cell           : 4,                // 列
    _tileSize       : cc.size(0, 0),    // 块的大小
    _tiles          : null,             // 数组[层中所有黑白块][二维]
    _tileMaxNum     : Number.MAX_VALUE, // 总块数
    _tileLayer      : null,             // 黑白块子层。用来直接move所有的黑白块。
    _moveDir        : Direction.DOWN,   // 移动方向
    _tapTileCount   : 0,                // 黑块数[踩到的]
    _time           : 0,                // 时间[花了多少]
    _timeLabel      : null,             // 标签[时间]
    _isWin          : true,             // 是否赢了
    gameState      : GameState.READY,   // 游戏状态[准备]
    _isGameBeEnd    : false,            // 游戏是否快到终点

    ctor: function (model, playMethod) {
        this._super();
        // 加载[配置]
        this.loadConfig(model, playMethod);
        // 加载[自身初始化]
        this.loadInit();
//        加载[开始标签]
        this.loadStartTitle();
        // 游戏[开始]
        this.onGameStart();
        return true;
    },
    // 加载[配置]
    loadConfig : function(model, playMethod){
        this._model = model;
        this._playMethod = playMethod;
        this._tiles = new Array();

        // 行和列[最后两项 5x5 和 6x6 行和列获取]
        var title = GC.menuItem[model].subItem[playMethod];
        if (playMethod >= GC.menuItem[model].subItem.length - 2){
            var tmpRow = parseInt(title.substring(0, 1));
            var tmpCell = parseInt(title.substring(title.length - 1, title.length));
            // TODO parseInt过来有些不是数字，故要判断
            this._row = tmpRow >= 0 ? tmpRow : 4;
            this._cell = tmpCell >= 0 ? tmpCell : 4;
        }

        // 方向[逆行]  TODO 功能待完善
        this._moveDir = (model == 1 && playMethod == 2) ? Direction.UP : Direction.DOWN;

        if (model == 0){
            if (playMethod == 0){
                this._tileMaxNum = parseInt(title);
            }else{
                this._tileMaxNum = 50;
            }
        }
        // 大小[白块]
        var width  = (GC.w - GC.titleSpace * this._cell ) / this._cell;
        var height = (GC.h - GC.titleSpace * this._row ) / this._row;
        this._tileSize = cc.size(width, height);
    },
    // 加载[自身初始化]
    loadInit : function(){
        this._tileLayer = new cc.Layer();
        this.addChild(this._tileLayer);

        this._timeLabel = new cc.LabelTTF(this._time, "Arial", 64);
        this.addChild(this._timeLabel, 10);
        this._timeLabel.setPosition(GC.w2, GC.h - this._timeLabel.height);
        this._timeLabel.setColor(cc.color.RED);

        for (var i = 0; i < this._row + 1; i++){
            this._tiles[i] = new Array();
            // 随机数
            var num = Math.floor(Math.random() * this._cell);
            for (var j = 0; j < this._cell; j++){
                var touchEnabled = true;
                var type = TileType.DONT_TOUCH;
                if (i == 0){
                    type = TileType.START_LINE;
                    touchEnabled = false;
                }
                else if (num == j){
                    type = TileType.TOUCH;
                    touchEnabled = false;
                }
                var x = j * (this._tileSize.width + GC.titleSpace) + this._tileSize.width / 2;
                var y = i * (this._tileSize.height + GC.titleSpace) + this._tileSize.height / 2;
                var node = this.createTileSprite(x, y, type);
                this._tileLayer.addChild(node);
                this._tiles[i].push(node);

                if (touchEnabled != false){
                    node.loadListener();
                }
            }
        }
    },
    createTileSprite : function(x, y, type){
        var node = new TileSprite(this._tileSize, this.onTileCallBack);
        node.setPosition(x, y);
        node.setType(type);
        return node;
    },
    loadStartTitle : function(){

        var fontSize = 64;

        if (this._cell == 5){
            fontSize = 48;
        }else if(this._cell == 6){
            fontSize = 32;
        }

        var label = new cc.LabelTTF("开始", "Arial", fontSize);
        label.setPosition(this._tileSize.width / 2, this._tileSize.height / 2);
        for (var i = 0; i < this._tiles[1].length; i++){
            var node = this._tiles[1][i];
            if (node.type == TileType.TOUCH){
                node.addChild(label);
                node.loadListener();
                return;
            }
        }
    },
    onGameStart : function(){
        this.gameState = GameState.PLAYING;
        this.scheduleUpdate();
    },
    update : function(dt){
        this._time += dt;
        // [正则表达式]获取小数点后三位
        var regex = /([0-9]+\.[0-9]{3})[0-9]*/;
        var timeStr = String(this._time);
        var finalStr = timeStr.replace(regex,"$1''");
        this._timeLabel.setString(finalStr);
    },
    onTileCallBack : function(sender, isOver){
//        var self = sender.parent.parent;
        var self = this.parent.parent;

        cc.log("sss");
//        游戏快到终点
        if (self._tapTileCount == self._tileMaxNum - self._row){
            self._isGameBeEnd = true;
        }else if(self._tapTileCount == self._tileMaxNum - 1){    // _tapTileCount是在移动后面才+1的，所以这里相等判断要-1
            self._isWin = true;
            self.transitionToGameOver();
        }

        // 游戏结束
        if (isOver == true){
            self._isWin = false;
            self.transitionToGameOver();
        }else{
            self.onTileMove();
        }
    },
    onTileMove : function(){
        var callFun = cc.callFunc(this.addTile.bind(this));
        var moveByAction = cc.moveBy(0.2, cc.p(this._moveDir.x * this._tileSize.width, this._moveDir.y * (this._tileSize.height  + GC.titleSpace)));
        var action = cc.sequence(moveByAction,callFun);
        this._tileLayer.runAction(action);
    },
    addTile : function(sender){
        for (var i = 0; i < this._tiles[0].length; i++){
            // 超出屏幕后删除
            this._tiles[0][i].removeFromParent();
        }

        // 删除第一维数组
        this._tiles.shift();

        for (var i = 0; i < this._tiles[1].length; i++){
            // 第二排开启触摸
            this._tiles[1][i].loadListener();
        }

        // 注意：这里是this._tiles.length, 而不是this._tiles.length - 1
        this._tiles[this._tiles.length] = new Array();

        var num = Math.floor(Math.random() * this._cell);

        for (var i = 0; i < this._cell; i++){

            var type = TileType.DONT_TOUCH;
            if (num == i){
                type = TileType.TOUCH;
            }

            var x = i * (this._tileSize.width + GC.titleSpace) + this._tileSize.width / 2;
            var y = GC.h + this._tileSize.height * 1.5 + GC.titleSpace + this._tapTileCount * (this._tileSize.height + GC.titleSpace);

            if (this._isGameBeEnd == true){
                type = TileType.BE_END;
                y = GC.h + this._tileSize.height * 1.5 + this._tapTileCount * (this._tileSize.height);
            }

            var node = this.createTileSprite(x, y, type);
            this._tileLayer.addChild(node);
            this._tiles[this._tiles.length - 1].push(node);
        }
        this._tapTileCount += 1;
    },

    transitionToGameOver : function(){
        // 游戏结束
        this.gameState = GameState.END;

        var data = {
            model       : this._model,
            playMethod  : this._playMethod,
            count       : this._tapTileCount,
            time        : this._time,
            isWin       : this._isWin
        };
        var scene = new cc.Scene();
        var layer = new GameOverLayer(data);
        scene.addChild(layer);
        cc.director.runScene(new cc.TransitionFadeTR(0.5, scene));
        cc.log("游戏结束");
    }
});