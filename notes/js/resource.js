/**
 * Created by liurongqing on 10/12/15.
 * email: phpgege@163.com
 */

var g_resources = [];

var g_images = {
    // images
    // fonts

};

var g_fonts = [
    {type: 'font',name:'ten',srcs:['res/weixin/ten.ttf']}
];


for(var i in g_images){
    g_resources.push(g_images[i]);
}
for(var j in g_fonts){
    g_resources.push(g_fonts[j]);
}
