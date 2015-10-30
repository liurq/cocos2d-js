/**
 * Created by adin on 10/29/15
 * email: phpgege@163.com
 */
var cc = cc || {};

cc.ajax = cc.Class.extend({
    url: '',
    type: 'POST',
    data: [],
    success: null,
    error: null,
    ctor: function (settings) {
        settings.url && (this.url = settings.url);
        settings.type && (this.type = settings.type);
        settings.data && (this.data = settings.data);
        settings.success && (this.success = settings.success);
        this.getAjax();
    },
    getAjax: function(){
        var that = this;
        var xhr = cc.loader.getXMLHttpRequest();
            xhr.open(this.type,this.url);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                    that.success && that.success(xhr.responseText);
                }else{
                    that.error && that.error(xhr.status);
                }
            };
            xhr.send(this.data);
    }

});

cc.ajax.create = function (settings) {
    return new cc.ajax(settings);
};
