/**
 * Created by adin on 10/29/15
 * email: phpgege@163.com
 * 上传压缩图片
 * new cc.fileUpload(files,callback)
 */

var cc = cc || {};
cc.fileUpload = cc.Class.extend({
    maxWH: 200, // 默认宽度，高度不可以超过200
    maxSize: 100 * 1024, // 默认最大100kb
    canvasCompressImg: null,
    canvasCompressTile: null,
    canvasImg2D: null,
    canvasTile2D: null,
    ctor: function (files,url,callback,config) {
        this.canvasCompressImg = document.createElement('canvas');
        this.canvasImg2D = this.canvasCompressImg.getContext('2d');
        this.canvasCompressTile = document.createElement('canvas');
        this.canvasTile2D = this.canvasCompressTile.getContext('2d');
        config && config.maxWH && (maxWH = config.maxWH);
        config && config.maxSize && (maxSize = config.maxSize);
        this.getUploadInfo(files,url,callback);
    },
    getUploadInfo: function (files,url,callback) {
        var that = this;
        if (!files.length) return;
        var aFiles = Array.prototype.slice.call(files);
        aFiles.forEach(function (file, j) {
            if (!/\/(?:jpeg|png|gif|jpg)/i.test(file.type)) return;
            for (var i = 0, len = files.length; i < len; i += 1) {
                that.upload(files[i],url, callback);
            }
        });

    },
    upload: function (file,url, callback) {
        var that = this;
        var reader = new FileReader();
        reader.onload = function () {
            var base64Result = this.result;
            var img = new Image();
            img.src = base64Result;
            // 小于 最大的大小则直接上传，不进行压缩
            if (base64Result.length < this.maxSize) {
                that.doUpload(base64Result,url, file.type, file.name, callback);
                return;
            }

            // 压缩上传
            if (img.complete) {
                doCompress();
            } else {
                img.onload = doCompress;
            }

            function doCompress() {
                var data = that.compress(img);
                var name = file.name;
                name = name.substr(0, name.lastIndexOf('.') + 1) + 'jpg';
                that.doUpload(data,url, 'image/jpeg', name, callback);
            }
        };
        reader.readAsDataURL(file);
    },
    doUpload: function (base64Str,url, type, filename, callback) {
        var formdata = new FormData();
        formdata.append('image', base64Str);
        new cc.ajax({
            url: url,
            data: formdata,
            success: callback,
            error: callback
        });
    },
    compress: function (img) {
        var width, height, scale;

        if (img.width > this.maxWH || img.height > this.maxWH) {
            scale = img.height / img.width;
            if (scale > 1) {
                height = this.maxWH;
                width = height / scale;
            } else {
                width = this.maxWH;
                height = width * scale;
            }
        } else {
            width = img.width;
            height = img.height;
        }
        this.canvasCompressImg.width = width;
        this.canvasCompressImg.height = height;

        this.canvasImg2D.fillStyle = '#fff';
        this.canvasImg2D.fillRect(0, 0, this.canvasCompressImg.width, this.canvasCompressImg.height);

        var count, ratio = 1;
        if ((count = width * height / 1000000) > 1) {
            count = (Math.sqrt(count) + 1) | 0;
            var nw = (width / count) | 0;
            var nh = (width / count) | 0;
            this.canvasCompressTile.width = nw;
            this.canvasCompressTile.height = nh;
            for (var i = 0; i < count; i += 1) {
                for (var j = 0; j < count; j += 1) {
                    this.canvasTile2D.drawImage(img, i * nw * ratio, j * nh * radio, nh * ratio, 0, 0, nw, nh);
                    this.canvasImg2D.drawImage(this.canvasCompressTile, i * nw, j * nh, nw, nh);
                }
            }
        } else {
            this.canvasImg2D.drawImage(img, 0, 0, width, height);
        }
        var nData = this.canvasCompressImg.toDataURL('image/jpeg', .9);
        this.canvasCompressImg.width = this.canvasCompressImg.height = this.canvasCompressTile.width = this.canvasCompressTile.height = 0;
        return nData;
    }

});

cc.fileUpload.create = function (settings) {
    return new cc.fileUpload(settings);
};
