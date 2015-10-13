/**
 * Created by liurongqing on 10/12/15.
 * email: phpgege@163.com
 */

var g_resources = [];

var g_images = {
    // images
    bg: 'res/helloBG.png',
    start_n: 'res/start_n.png',
    restart_n: 'res/restart_n.png',
    restart_s: 'res/restart_s.png',
    start_s: 'res/start_s.png',
    play: 'res/PlayBg.png',
    runner: 'res/runner.png',
    runner_plist: 'res/running.plist',
    running: 'res/running.png',
    map: 'res/map.png',
    map00_tmx: 'res/map00.tmx',
    map01_tmx: 'res/map01.tmx',
    background_png: 'res/background.png',
    background_plist: 'res/background.plist'
};

var g_fonts = [

];


for(var i in g_images){
    g_resources.push(g_images[i]);
}
for(var j in g_fonts){
    g_resources.push(g_fonts[j]);
}
