/**
 * Created by lingjianfeng on 15/1/29.
 */



var GC = GC || {};

GC.size = cc.size(640, 960);
GC.w = GC.size.width;
GC.h = GC.size.height;
GC.w2 = GC.w / 2;
GC.h2 = GC.h / 2;

// 黑白块间隔
GC.titleSpace = 1;

GC.menuItem = [
    {
        title : "经典",
        color : cc.color.WHITE,
        labelColor  : cc.color.BLACK,
        subItem : [
            "25",
            "50",
            "不连续",
            "5x5",
            "6x6"
        ]
    },{
        title : "街机",
        color : cc.color.BLACK,
        labelColor  : cc.color.WHITE,
        subItem : [
            "正常",
            "更快",
            "逆行",
            "5x5",
            "6x6"
        ]
    },{
        title : "禅",
        color : cc.color.BLACK,
        labelColor  : cc.color.WHITE,
        subItem : [
            "15''",
            "30''",
            "不连续",
            "5x5",
            "6x6"
        ]
    },{
        title : "极速",
        color : cc.color.WHITE,
        labelColor  : cc.color.BLACK,
        subItem : [
            "正常",
            "逆行",
            "不连续",
            "5x5",
            "6x6"
        ]
    },
    {
        title : "接力",
        color : cc.color.WHITE,
        labelColor  : cc.color.BLACK,
        subItem : [
            "8''",
            "10''",
            "12''",
            "5x5",
            "6x6"
        ]
    },{
        title : "街机+",
        color : cc.color.BLACK,
        labelColor  : cc.color.WHITE,
        subItem : [
            "雷电",
            "闪电",
            "双黑",
            "双层",
            "迷雾",
            "变速",
            "旋转",
            "震动",
            "多云",
            "移动",
            "梦幻"
        ]
    },{
        title : "随机",
        color : cc.color.BLACK,
        labelColor  : cc.color.WHITE,
        subItem : []
    },{
        title : "更多",
        color : cc.color.WHITE,
        labelColor  : cc.color.BLACK,
        subItem : []
    }
];
