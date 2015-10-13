/**
 * Created by adin on 10/13/15
 * email: phpgege@163.com
 */
var g_groundHeight = 57;
var g_runnerStartX = 200;
if(typeof TagOfLayer == 'undefined'){
    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.Animation = 1;
    TagOfLayer.Status = 2;
}

if(typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.runner = 0;
    SpriteTag.coin = 1;
    SpriteTag.rock = 2;
}