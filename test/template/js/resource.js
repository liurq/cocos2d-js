/**
 * Created by adin on 10/9/15
 * email: phpgege@163.com
 */

var g_resources = [];

//image
var s_images = {
    bg: "background.png",
    start_n: "start_n.png",
    start_s: "start_s.png",
    sushi: "sushi.png"
}

//plist
var s_plist = {
    sushi_list: "sushi.plist"
}

//fnt

//tmx

//bgm

//effect

for(var i in s_images){
    g_resources.push(s_images[i]);
}

for(var j in s_plist){
    g_resources.push(s_plist[j]);
}
