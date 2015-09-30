var StartLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.winSize;

        var helloLabel = new cc.LabelTTF("您好啊，又见面了。", "", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2;
        this.addChild(helloLabel);

        return true;
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});

// 无：场景管理
// 无：场景切换特效
// 无：精灵与精灵帧动画
// 无 特效：Lens, Ripple, Waves, Liquid, 等等.
// 无 动作：
// 无 普通动作：Move, Rotate, Scale, Fade, Tint, etc.
// 无 组合动作：Sequence, Spawn, Repeat, Reverse
// 无 变速动作：Exp, Sin, Cubic, Elastic, etc.
// 无 其他动作：CallFunc, OrbitCamera, Follow, Tween
// 无 资源管理器（热更新）
// 无 菜单与按钮
// 无 集成物理引擎：Chipmunk或Box2d
// 无 粒子系统
// 无 骨骼动画：支持Spine和Armature
// 无 字体：
// 无 固定或可变宽度字体快速渲染
// 无 支持.ttf字体
// 无 瓦片地图支持：正交，等距和六边形
// 无 视差滚动
// 无 运动轨迹特效
// 无 绘制到纹理
// 无 移动设备上的触摸和加速度计支持
// 无 桌面设备上的触摸，鼠标和键盘支持
// 无 声音引擎支持，基于OpenAL或WebAudio
// 无 集成慢动作，快进效果
// 无 高效压缩纹理支持：PVR压缩或未压缩纹理，ETC1压缩纹理
// 无 独立于分辨率的适配
// 无 可定制的模块化引擎
// 无 友好开源项目：适用于任何开源或闭源项目
// 无 基于OpenGL ES 2.0（移动设备）／ OpenGL 2.1（桌面设备）
// 无 完整WebGL支持和在不支持WebGL设备上自动使用Canvas